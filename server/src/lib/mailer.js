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
