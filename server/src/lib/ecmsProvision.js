// Purchase approve হলে ECMS-এ শপ চালু/নবায়ন করার ক্লায়েন্ট।
//
// ENV (Hikmah server):
//   ECMS_API_URL          — ECMS backend base URL (ecmsPlans.js-এর মতোই)
//   ECMS_INTEGRATION_KEY  — ECMS backend-এর HIKMAH_INTEGRATION_KEY-এর হুবহু একই মান (কমপক্ষে ২৪ ক্যারেক্টার)

const TIMEOUT_MS = 20000;

export function isProvisioningConfigured() {
  return !!(process.env.ECMS_API_URL && process.env.ECMS_INTEGRATION_KEY);
}

async function callEcms(path, payload) {
  if (!isProvisioningConfigured()) {
    throw new Error("ECMS_API_URL / ECMS_INTEGRATION_KEY সেট করা নেই");
  }

  const base = process.env.ECMS_API_URL.replace(/\/$/, "");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${base}/integration${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-integration-key": process.env.ECMS_INTEGRATION_KEY,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.message || `ECMS responded ${res.status}`);
    }
    return data;
  } catch (err) {
    if (err.name === "AbortError") throw new Error("ECMS সাড়া দিতে দেরি করছে (timeout)");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// passwordHash = কাস্টমারের দেওয়া পাসওয়ার্ডের bcrypt hash (plain নয়)
export function provisionEcmsShop({ externalRef, planKey, customerName, customerEmail, customerPhone, shopName, passwordHash }) {
  return callEcms("/provision-shop", { externalRef, planKey, customerName, customerEmail, customerPhone, shopName, passwordHash });
}

// অর্ডার reject হলে: নতুন শপ → সাসপেন্ড, নবায়ন/আপগ্রেড → আগের অবস্থায় ফেরানো
export function revokeEcmsShop({ externalRef }) {
  return callEcms("/revoke-shop", { externalRef });
}
