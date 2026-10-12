import { Router } from "express";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import { provisionEcmsShop, revokeEcmsShop, isProvisioningConfigured } from "../lib/ecmsProvision.js";
import { getEcmsPlans } from "../lib/ecmsPlans.js";
import { sendEcmsShopReadyEmail, sendEcmsShopRevokedEmail } from "../lib/mailer.js";

const router = Router();

// একই purchase-এর জন্য একসাথে দুইবার প্রভিশন/revoke চলা আটকায় (দুইবার ক্লিক/রেস)।
// "pending" অবস্থায় ২ মিনিটের বেশি আটকে থাকলে (সার্ভার ক্র্যাশ) আবার চেষ্টা করা যাবে।
const STALE_PENDING_MS = 2 * 60 * 1000;
const NOT_CONFIGURED = "ECMS_API_URL / ECMS_INTEGRATION_KEY সেট করা নেই";

const staleBefore = () => new Date(Date.now() - STALE_PENDING_MS);

// approve → ECMS চালু। 'revoked' মানে আগে reject হয়েছিল, এখন আবার approve (re-approve)।
function claimProvisioning(purchaseId) {
  return Purchase.findOneAndUpdate(
    {
      _id: purchaseId,
      status: "approved",
      ecmsPlanKey: { $ne: "" },
      $or: [
        { provisionStatus: { $in: ["none", "failed", "revoked"] } },
        { provisionStatus: "pending", provisionStartedAt: { $lt: staleBefore() } },
      ],
    },
    { provisionStatus: "pending", provisionStartedAt: new Date(), provisionError: "" },
    { new: true }
  );
}

// reject → ECMS বন্ধ/ফেরানো
function claimRevoke(purchaseId) {
  return Purchase.findOneAndUpdate(
    {
      _id: purchaseId,
      status: { $ne: "approved" },
      ecmsPlanKey: { $ne: "" },
      $or: [
        { provisionStatus: { $in: ["done", "failed", "revoke_failed"] } },
        { provisionStatus: "pending", provisionStartedAt: { $lt: staleBefore() } },
      ],
    },
    { provisionStatus: "pending", provisionStartedAt: new Date(), provisionError: "" },
    { new: true }
  );
}

async function resolveCustomerEmail(purchase) {
  if (purchase.customerEmail) return purchase.customerEmail;
  const buyer = purchase.userId ? await User.findById(purchase.userId).select("email") : null;
  return buyer?.email || "";
}

async function planNameOf(purchase) {
  const plans = await getEcmsPlans();
  return plans.find((p) => p.ecmsPlanKey === purchase.ecmsPlanKey)?.name || purchase.packageNameSnapshot;
}

// approve-এর পর ECMS-এ শপ চালু/নবায়ন। approve নিজে কখনো এখানে ব্যর্থ হয়ে ফিরে যায় না —
// ব্যর্থ হলে provisionStatus="failed" থাকে, অ্যাডমিন "Retry" চাপতে পারে।
async function runProvisioning(purchase) {
  try {
    const customerEmail = await resolveCustomerEmail(purchase);
    if (!customerEmail) throw new Error("কাস্টমারের ইমেইল নেই — ECMS অ্যাকাউন্ট খোলা যাবে না");

    // hash select:false, তাই আলাদা করে চেয়ে আনা
    const withHash = await Purchase.findById(purchase._id).select("+ecmsPasswordHash");

    const data = await provisionEcmsShop({
      externalRef: String(purchase._id),
      planKey: purchase.ecmsPlanKey,
      customerName: purchase.customerName,
      customerEmail,
      customerPhone: purchase.customerPhone,
      shopName: purchase.shopName || undefined,
      passwordHash: withHash?.ecmsPasswordHash || undefined,
    });

    const planName = await planNameOf(purchase);
    const passwordMode = data.admin?.passwordMode || "existing";

    let emailStatus = "skipped";
    if (data.result !== "already_processed") {
      emailStatus = await sendEcmsShopReadyEmail(customerEmail, {
        result: data.result,
        planName,
        shopName: data.shop?.name,
        expiresAt: data.shop?.planExpiresAt,
        storeUrl: data.storeUrl,
        adminUrl: data.adminUrl,
        adminEmail: data.admin?.email || customerEmail,
        passwordMode,
      });
    }

    const saved = await Purchase.findByIdAndUpdate(
      purchase._id,
      {
        $set: {
          provisionStatus: "done",
          provisionError: "",
          provisionedAt: new Date(),
          provisionRevokedAt: null,
          ecmsRevokeNote: "",
          ecmsResult: data.result,
          ecmsShopId: data.shop?.id || "",
          ecmsShopSlug: data.shop?.slug || "",
          ecmsStoreUrl: data.storeUrl || "",
          ecmsAdminUrl: data.adminUrl || "",
        },
        // প্রভিশন হয়ে গেছে — hash আর রাখার দরকার নেই
        $unset: { ecmsPasswordHash: "" },
      },
      { new: true }
    );

    return {
      purchase: saved,
      provision: {
        ok: true,
        result: data.result,
        notes: data.notes || [],
        emailStatus,
        adminEmail: data.admin?.email || customerEmail,
      },
    };
  } catch (err) {
    console.error("[ecms-provision] failed for purchase", String(purchase._id), err.message);
    const saved = await Purchase.findByIdAndUpdate(
      purchase._id,
      { provisionStatus: "failed", provisionError: String(err.message || err).slice(0, 500) },
      { new: true }
    );
    return { purchase: saved, provision: { ok: false, error: err.message } };
  }
}

// অর্ডার reject হলে ECMS শপ বন্ধ (নতুন শপ) বা আগের অবস্থায় ফেরানো (নবায়ন/আপগ্রেড)।
// reject নিজে কখনো আটকায় না — ব্যর্থ হলে provisionStatus="revoke_failed", অ্যাডমিন Retry করতে পারবে।
async function runRevoke(purchase) {
  try {
    const data = await revokeEcmsShop({ externalRef: String(purchase._id) });
    const applied = ["suspended", "reverted", "already_revoked"].includes(data.result);

    const saved = await Purchase.findByIdAndUpdate(
      purchase._id,
      {
        $set: {
          provisionStatus: applied ? "revoked" : "none",
          provisionError: "",
          provisionRevokedAt: applied ? new Date() : null,
          ecmsRevokeNote: (data.notes || []).join(" · "),
        },
        $unset: { ecmsPasswordHash: "" },
      },
      { new: true }
    );

    // শুধু সত্যিকারের বদল হলেই কাস্টমারকে জানানো (already_revoked/not_applied-এ নয়)
    let emailStatus = "skipped";
    if (data.result === "suspended" || data.result === "reverted") {
      const to = await resolveCustomerEmail(purchase);
      if (to) {
        emailStatus = await sendEcmsShopRevokedEmail(to, { result: data.result, planName: await planNameOf(purchase) });
      }
    }

    return {
      purchase: saved,
      provision: { ok: true, revoke: true, result: data.result, notes: data.notes || [], emailStatus },
    };
  } catch (err) {
    console.error("[ecms-revoke] failed for purchase", String(purchase._id), err.message);
    const saved = await Purchase.findByIdAndUpdate(
      purchase._id,
      { provisionStatus: "revoke_failed", provisionError: String(err.message || err).slice(0, 500) },
      { new: true }
    );
    return { purchase: saved, provision: { ok: false, revoke: true, error: err.message } };
  }
}

router.get("/", async (req, res) => {
  const { status } = req.query;
  const filter = { deletedAt: null };
  if (status) filter.status = status;
  const purchases = await Purchase.find(filter).sort({ createdAt: -1 });
  res.json(purchases);
});

router.patch("/:id", async (req, res) => {
  const { status, adminNote } = req.body;
  if (status && !["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const before = await Purchase.findById(req.params.id);
  if (!before) return res.status(404).json({ message: "Purchase not found" });

  // ECMS প্রভিশন চলাকালীন স্ট্যাটাস বদলালে দুই কাজ ধাক্কা খেত — একটু অপেক্ষা করতে বলা হয়
  if (
    status &&
    status !== before.status &&
    before.ecmsPlanKey &&
    before.provisionStatus === "pending" &&
    before.provisionStartedAt &&
    before.provisionStartedAt > staleBefore()
  ) {
    return res.status(409).json({ message: "ECMS প্রভিশনিং এখন চলছে — কয়েক সেকেন্ড পরে আবার চেষ্টা করুন" });
  }

  const update = {};
  if (status) update.status = status;
  if (adminNote !== undefined) update.adminNote = adminNote;

  const purchase = await Purchase.findByIdAndUpdate(req.params.id, update, { new: true });

  if (purchase.ecmsPlanKey && status) {
    // ── approve: ECMS-এ শপ চালু/নবায়ন (আগে 'done' হয়ে থাকলে আবার চলে না) ──
    if (status === "approved") {
      // reject-এর সময় ECMS বন্ধ করা যায়নি, এখন আবার approve → ECMS-এ কিছুই বদলায়নি, শুধু অবস্থা ঠিক করা
      if (purchase.provisionStatus === "revoke_failed") {
        const saved = await Purchase.findByIdAndUpdate(purchase._id, { provisionStatus: "done", provisionError: "" }, { new: true });
        return res.json(saved);
      }

      if (purchase.provisionStatus !== "done") {
        if (!isProvisioningConfigured()) {
          const saved = await Purchase.findByIdAndUpdate(
            purchase._id,
            { provisionStatus: "failed", provisionError: NOT_CONFIGURED },
            { new: true }
          );
          return res.json({ ...saved.toObject(), provision: { ok: false, error: NOT_CONFIGURED } });
        }
        const claimed = await claimProvisioning(purchase._id);
        if (claimed) {
          const out = await runProvisioning(claimed);
          return res.json({ ...out.purchase.toObject(), provision: out.provision });
        }
      }
    }

    // ── reject / pending-এ ফেরানো: ECMS-এ প্রয়োগ হয়ে থাকলে বন্ধ বা ফেরানো ──
    if (status !== "approved") {
      const needsRevoke = ["done", "revoke_failed", "failed", "pending"].includes(purchase.provisionStatus);
      if (needsRevoke) {
        if (!isProvisioningConfigured()) {
          // 'done' থাকলে ECMS শপ চালু আছে অথচ বন্ধ করা যাচ্ছে না — অ্যাডমিনকে স্পষ্ট জানানো জরুরি
          if (["done", "revoke_failed"].includes(purchase.provisionStatus)) {
            const saved = await Purchase.findByIdAndUpdate(
              purchase._id,
              { provisionStatus: "revoke_failed", provisionError: NOT_CONFIGURED },
              { new: true }
            );
            return res.json({ ...saved.toObject(), provision: { ok: false, revoke: true, error: NOT_CONFIGURED } });
          }
        } else {
          const claimed = await claimRevoke(purchase._id);
          if (claimed) {
            const out = await runRevoke(claimed);
            return res.json({ ...out.purchase.toObject(), provision: out.provision });
          }
        }
      }
    }
  }

  res.json(purchase);
});

// ব্যর্থ হলে (বা ECMS_* env পরে সেট করলে) হাতে আবার চালানো
router.post("/:id/provision", async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).catch(() => null);
  if (!purchase) return res.status(404).json({ message: "Purchase not found" });
  if (!purchase.ecmsPlanKey) return res.status(400).json({ message: "এটা ECMS প্ল্যানের অর্ডার না" });
  if (purchase.status !== "approved") return res.status(400).json({ message: "আগে অর্ডার approve করুন" });
  if (purchase.provisionStatus === "done") return res.status(400).json({ message: "ইতিমধ্যে ECMS-এ চালু হয়ে গেছে" });
  if (!isProvisioningConfigured()) return res.status(503).json({ message: NOT_CONFIGURED });

  const claimed = await claimProvisioning(purchase._id);
  if (!claimed) return res.status(409).json({ message: "প্রভিশনিং এখন চলছে — একটু পরে দেখুন" });

  const out = await runProvisioning(claimed);
  res.json({ ...out.purchase.toObject(), provision: out.provision });
});

// reject করা অর্ডারে ECMS বন্ধ করা ব্যর্থ হলে হাতে আবার চালানো
router.post("/:id/revoke", async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).catch(() => null);
  if (!purchase) return res.status(404).json({ message: "Purchase not found" });
  if (!purchase.ecmsPlanKey) return res.status(400).json({ message: "এটা ECMS প্ল্যানের অর্ডার না" });
  if (purchase.status === "approved") return res.status(400).json({ message: "অর্ডার approved — আগে reject করুন" });
  if (purchase.provisionStatus !== "revoke_failed") {
    return res.status(400).json({ message: "এই অর্ডারে ECMS বন্ধ করার কিছু বাকি নেই" });
  }
  if (!isProvisioningConfigured()) return res.status(503).json({ message: NOT_CONFIGURED });

  const claimed = await claimRevoke(purchase._id);
  if (!claimed) return res.status(409).json({ message: "কাজ এখন চলছে — একটু পরে দেখুন" });

  const out = await runRevoke(claimed);
  res.json({ ...out.purchase.toObject(), provision: out.provision });
});

router.delete("/:id", async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).catch(() => null);
  if (!purchase) return res.status(404).json({ message: "Purchase not found" });

  purchase.deletedAt = new Date();
  await purchase.save();
  res.json({ message: "Moved to trash" });
});

export default router;
