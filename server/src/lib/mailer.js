import { Resend } from "resend";
import NotificationLog from "../models/NotificationLog.js";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function logEmail(to, purpose, status, errorMessage = "") {
  try {
    await NotificationLog.create({ channel: "email", to, purpose, status, errorMessage });
  } catch (err) {
    console.error("[mailer] Failed to write notification log:", err);
  }
}

async function send({ to, subject, html, purpose, consoleFallbackLabel }) {
  if (!resend) {
    console.warn(`[mailer] RESEND_API_KEY not set — skipped sending "${consoleFallbackLabel}" to ${to}.`);
    await logEmail(to, purpose, "skipped_not_configured");
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Hikmah IT <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    await logEmail(to, purpose, "sent");
  } catch (err) {
    await logEmail(to, purpose, "failed", err.message);
    throw err;
  }
}

export async function sendPasswordResetEmail(to, resetUrl) {
  await send({
    to,
    subject: "Reset your Hikmah IT admin password",
    html: `
      <p>You requested a password reset for your Hikmah IT admin account.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a> (valid for 30 minutes).</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
    purpose: "admin-password-reset",
    consoleFallbackLabel: "admin password reset link",
  });
}

export async function sendNewOrderEmail(to, purchase) {
  const subject = `New order: ${purchase.packageNameSnapshot}`;
  const html = `
    <h2>New order received</h2>
    <p><strong>Package:</strong> ${purchase.packageNameSnapshot} (${purchase.priceSnapshot})</p>
    <p><strong>Customer:</strong> ${purchase.customerName} — ${purchase.customerPhone}${purchase.customerEmail ? ` — ${purchase.customerEmail}` : ""}</p>
    <p><strong>Payment:</strong> ${purchase.paymentMethod} from ${purchase.senderNumber}, Transaction ID: ${purchase.transactionId}</p>
    ${purchase.referralCode ? `<p><strong>Referral Code:</strong> ${purchase.referralCode}</p>` : ""}
  `;

  await send({ to, subject, html, purpose: "new-order-notification", consoleFallbackLabel: "new-order notification" });
}

export async function sendVerificationEmailOtp(to, otp) {
  await send({
    to,
    subject: "Your Hikmah IT email verification code",
    html: `
      <p>Your email verification code is:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:4px;">${otp}</p>
      <p>This code expires in 5 minutes. If you did not request this, you can safely ignore this email.</p>
    `,
    purpose: "verify-email",
    consoleFallbackLabel: "email verification OTP",
  });
}

export async function sendPasswordResetOtp(to, otp) {
  await send({
    to,
    subject: "Your Hikmah IT password reset code",
    html: `
      <p>Your password reset code is:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:4px;">${otp}</p>
      <p>This code expires in 5 minutes. If you did not request this, you can safely ignore this email.</p>
    `,
    purpose: "password-reset",
    consoleFallbackLabel: "password reset OTP",
  });
}

const escapeHtml = (v = "") =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ECMS শপ চালু/নবায়নের পর কাস্টমারকে ইমেইল। নতুন শপে লগইন পাসওয়ার্ড থাকে (শুধু এই একবারই)।
// ফেরত মান: "sent" | "skipped" | "failed" — Resend না থাকলে send() চুপচাপ skip করে, তাই আলাদা করে চেক।
export async function sendEcmsShopReadyEmail(to, d) {
  if (!resend) {
    await send({ to, subject: "", html: "", purpose: "ecms-shop-ready", consoleFallbackLabel: "ECMS shop ready email" });
    return "skipped";
  }

  const renewed = d.result === "renewed";
  const subject = renewed
    ? `আপনার ECMS প্ল্যান আপডেট হয়েছে — ${d.planName}`
    : `আপনার ECMS শপ তৈরি হয়েছে — ${d.planName}`;

  const expiry = d.expiresAt ? new Date(d.expiresAt).toLocaleDateString("bn-BD") : "সীমাহীন";
  // passwordMode: customer = চেকআউটে নিজের দেওয়া | existing = আগের অ্যাকাউন্ট (পাসওয়ার্ড কখনো ইমেইলে যায় না)
  let credentials;
  if (d.passwordMode === "customer") {
    credentials = `<p><strong>অ্যাডমিন ইমেইল:</strong> ${escapeHtml(d.adminEmail)}<br/>পাসওয়ার্ড: অর্ডার করার সময় আপনি যেটা দিয়েছিলেন সেটাই। (নিরাপত্তার জন্য ইমেইলে পাসওয়ার্ড পাঠানো হয় না।)</p>`;
  } else {
    credentials = `<p><strong>অ্যাডমিন ইমেইল:</strong> ${escapeHtml(d.adminEmail)} (আপনার আগের পাসওয়ার্ডই চলবে)</p>`;
  }

  const html = `
    <h2>${renewed ? "প্ল্যান আপডেট সম্পন্ন" : "স্বাগতম! আপনার শপ প্রস্তুত"}</h2>
    <p>${d.shopName ? `<strong>শপ:</strong> ${escapeHtml(d.shopName)}<br/>` : ""}<strong>প্ল্যান:</strong> ${escapeHtml(d.planName)}<br/><strong>মেয়াদ শেষ:</strong> ${escapeHtml(expiry)}</p>
    ${d.storeUrl ? `<p><strong>আপনার শপ:</strong> <a href="${escapeHtml(d.storeUrl)}">${escapeHtml(d.storeUrl)}</a></p>` : ""}
    ${d.adminUrl ? `<p><strong>অ্যাডমিন প্যানেল:</strong> <a href="${escapeHtml(d.adminUrl)}">${escapeHtml(d.adminUrl)}</a></p>` : ""}
    ${credentials}
    <p>সাহায্য লাগলে এই ইমেইলের উত্তর দিন।</p>
  `;

  try {
    await send({ to, subject, html, purpose: "ecms-shop-ready", consoleFallbackLabel: "ECMS shop ready email" });
    return "sent";
  } catch {
    return "failed";
  }
}

// অর্ডার পরে reject হলে কাস্টমারকে জানানো। ফেরত মান: "sent" | "skipped" | "failed"
export async function sendEcmsShopRevokedEmail(to, d) {
  if (!resend) return "skipped";

  const suspended = d.result === "suspended";
  const subject = suspended ? `আপনার ECMS শপ সাময়িকভাবে বন্ধ — ${d.planName}` : `আপনার ECMS অর্ডার বাতিল হয়েছে — ${d.planName}`;
  const html = `
    <h2>${suspended ? "আপনার শপ সাময়িকভাবে বন্ধ করা হয়েছে" : "অর্ডার বাতিল হয়েছে"}</h2>
    <p>আপনার <strong>${escapeHtml(d.planName)}</strong> অর্ডারটি আমরা বাতিল করেছি (পেমেন্ট যাচাই সম্পন্ন হয়নি)।</p>
    <p>${suspended ? "আপনার শপের কোনো ডেটা মোছা হয়নি, তবে পেমেন্ট নিশ্চিত না হওয়া পর্যন্ত শপটি বন্ধ থাকবে।" : "আপনার শপ আগের প্ল্যানেই চলবে।"}</p>
    <p>ভুল হয়েছে মনে হলে সঠিক Transaction ID দিয়ে আমাদের সাথে যোগাযোগ করুন — যাচাই হলে শপ আবার চালু করা হবে।</p>
  `;
  try {
    await send({ to, subject, html, purpose: "ecms-shop-revoked", consoleFallbackLabel: "ECMS shop revoked email" });
    return "sent";
  } catch {
    return "failed";
  }
}
