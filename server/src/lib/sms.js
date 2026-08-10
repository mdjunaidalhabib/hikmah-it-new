import NotificationLog from "../models/NotificationLog.js";

async function logSms(to, purpose, status, errorMessage = "") {
  try {
    await NotificationLog.create({ channel: "sms", to, purpose, status, errorMessage });
  } catch (err) {
    console.error("[sms] Failed to write notification log:", err);
  }
}

// RT Com (rtcom.xyz) "One to Many" SMS API adapter.
// Docs: https://portal.rtcom.xyz/utility/apiDocumentation
// The gateway always responds HTTP 200 — success/failure is reported inside the JSON body
// via response.code (200 = success, anything else = failure), so that must be checked
// instead of res.ok.
function toBangladeshiE164(mobile) {
  const digits = mobile.trim().replace(/^0/, "");
  return `+880${digits}`;
}

export async function sendSms(to, message, purpose) {
  if (!process.env.SMS_API_URL || !process.env.SMS_API_KEY || !process.env.SMS_ACCOUNT_CODE) {
    console.warn(`[sms] SMS_API_URL/SMS_API_KEY/SMS_ACCOUNT_CODE not set — skipped sending SMS to ${to}.`);
    await logSms(to, purpose, "skipped_not_configured");
    return;
  }

  try {
    const res = await fetch(process.env.SMS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        acode: process.env.SMS_ACCOUNT_CODE,
        api_key: process.env.SMS_API_KEY,
        senderid: process.env.SMS_SENDER_ID || "",
        type: "text",
        msg: message,
        contacts: toBangladeshiE164(to),
        transactionType: "T",
        contentID: "",
      }),
      signal: AbortSignal.timeout(10000),
    });

    const data = await res.json().catch(() => null);
    const code = data?.response?.code;

    if (!res.ok || code !== 200) {
      throw new Error(data?.response?.message || `SMS gateway responded with ${res.status}`);
    }

    await logSms(to, purpose, "sent");
  } catch (err) {
    await logSms(to, purpose, "failed", err.message);
    throw err;
  }
}

export async function sendMobileOtp(to, otp) {
  await sendSms(to, `Your Hikmah IT verification code is ${otp}. It expires in 5 minutes.`, "verify-mobile");
}
