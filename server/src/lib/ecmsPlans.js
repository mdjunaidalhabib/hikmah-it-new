// ECMS-এর পাবলিক plan catalog (ECMS backend: GET /plans) থেকে প্ল্যান এনে
// Hikmah-র Package আকারে সাজায়। দাম/ফিচারের একমাত্র উৎস ECMS সুপার-অ্যাডমিন,
// তাই Hikmah-তে ECMS প্ল্যানের জন্য আলাদা করে Package বানানো লাগে না।
//
// ENV: ECMS_API_URL — ECMS backend-এর base URL, যেমন https://api.ecms.example.com
// (শেষে স্ল্যাশ ছাড়া)। সেট না থাকলে এই ফিচার বন্ধ থাকে এবং আগের মতো
// Hikmah-র নিজস্ব Package-ই দেখায়।

const CACHE_TTL_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;

// ID prefix: Mongo ObjectId-এ কখনো underscore থাকে না, আর ECMS plan key-তেও
// থাকে না (key শুধু a-z, 0-9, -) — তাই "ecms_<key>" কখনো আসল Package id-র সাথে মিলবে না।
export const ECMS_ID_PREFIX = "ecms_";

// Hikmah-র নিজস্ব ই-কমার্স Package-এর ক্যাটাগরি নাম। ECMS প্ল্যান এই নামেই দেখায়,
// আর এই ক্যাটাগরির পুরোনো Package পাবলিক সাইটে আর দেখানো হয় না (public.js)।
export const ECOMMERCE_CATEGORY = "ই-কমার্স ওয়েবসাইট";

let cache = { at: 0, plans: null };

export function isEcmsPackageId(id) {
  return typeof id === "string" && id.startsWith(ECMS_ID_PREFIX);
}

export function ecmsKeyFromId(id) {
  return id.slice(ECMS_ID_PREFIX.length);
}

function periodLabel(days) {
  const d = Number(days) || 0;
  if (d === 30) return "/মাস";
  if (d === 90) return "/৩ মাস";
  if (d === 180) return "/৬ মাস";
  if (d === 365) return "/বছর";
  if (!d) return "";
  return `/${d.toLocaleString("bn-BD")} দিন`;
}

// ECMS plan-এর ফিচার তালিকাকে "আছে" (features) ও "নেই" (notIncluded — কার্ডে কাটা অবস্থায়
// দেখায়) এই দুই ভাগে ভাগ করে। ECMS `featureList` পাঠালে সেটাই একমাত্র উৎস, তাই চালু/বন্ধ
// ফিচার ও তাদের লেবেল সবসময় ECMS সুপার-অ্যাডমিনের সাথে মিলে থাকে।
// ⚠️ ECMS-এর নতুন বিল্ড আগে ডিপ্লয় করুন — পুরোনো ECMS `featureList` পাঠায় না, তখন শুধু
// `highlights` (চালু ফিচার) দেখায় এবং কাটা ফিচারের তালিকা খালি থাকে।
const FEATURE_LABELS = [
  { key: "fullStorefront", label: "সম্পূর্ণ স্টোরফ্রন্ট" },
  { key: "analytics", label: "ভিজিটর অ্যানালিটিক্স" },
  { key: "promo", label: "প্রোমো ও কুপন কোড" },
  { key: "payment", label: "পেমেন্ট ইন্টিগ্রেশন" },
  { key: "customDomain", label: "কাস্টম ডোমেইন" },
  { key: "landingPages", label: "ল্যান্ডিং পেজ বিল্ডার" },
  { key: "invoiceCustomization", label: "ইনভয়েস কাস্টমাইজেশন" },
];

function splitFeatures(plan) {
  if (Array.isArray(plan.featureList) && plan.featureList.length > 0) {
    return {
      features: plan.featureList.filter((item) => item.included).map((item) => item.label),
      notIncluded: plan.featureList.filter((item) => !item.included).map((item) => item.label),
    };
  }
  // পুরোনো ECMS বিল্ড (featureList/notIncluded নেই) হলেও `features` টগল থেকে নিজেই
  // "নেই" ফিচার বের করি, যাতে ECMS রিডিপ্লয়ের অপেক্ষা না করেই কাটা ফিচার দেখায়।
  const toggles = plan.features && typeof plan.features === "object" ? plan.features : null;
  const derivedOff = toggles
    ? FEATURE_LABELS.filter(({ key }) => !toggles[key]).map(({ label }) => label)
    : [];
  return {
    features: plan.highlights || [],
    notIncluded: Array.isArray(plan.notIncluded) && plan.notIncluded.length > 0 ? plan.notIncluded : derivedOff,
  };
}

export function toPackageShape(plan) {
  const isFree = !plan.price && plan.ctaType !== "contact";
  const { features, notIncluded } = splitFeatures(plan);
  return {
    _id: `${ECMS_ID_PREFIX}${plan.key}`,
    source: "ecms",
    ecmsPlanKey: plan.key,
    category: ECOMMERCE_CATEGORY,
    name: `ECMS ${plan.name}`,
    priceAmount: plan.price || 0,
    originalPriceAmount: plan.originalPrice || 0,
    priceLabel: plan.ctaType === "contact" ? "আলোচনা সাপেক্ষে" : isFree ? "বিনামূল্যে" : "",
    periodLabel: plan.price ? periodLabel(plan.billingDays) : "",
    renewalText: "",
    text: plan.tagline || "",
    limits: [],
    features,
    notIncluded,
    highlighted: !!plan.isPopular,
    ctaType: plan.ctaType || "buy",
    sortOrder: plan.order ?? 0,
  };
}

async function fetchRaw() {
  const base = (process.env.ECMS_API_URL || "").replace(/\/$/, "");
  if (!base) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${base}/plans`, { signal: controller.signal });
    if (!res.ok) throw new Error(`ECMS /plans responded ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } finally {
    clearTimeout(timer);
  }
}

// ECMS বন্ধ থাকলে পুরোনো cache (stale) ফেরত দেয়, না থাকলে খালি তালিকা — সাইট কখনো ভাঙে না।
export async function getEcmsPlans() {
  if (cache.plans && Date.now() - cache.at < CACHE_TTL_MS) return cache.plans;
  try {
    const raw = await fetchRaw();
    if (raw === null) return [];
    cache = { at: Date.now(), plans: raw.map(toPackageShape) };
    return cache.plans;
  } catch (err) {
    console.error("[ecmsPlans] fetch failed:", err.message);
    return cache.plans || [];
  }
}

export async function getEcmsPlanById(id) {
  const plans = await getEcmsPlans();
  return plans.find((p) => p._id === id) || null;
}
