import jwt from "jsonwebtoken";
import crypto from "crypto";

export function signAdminToken(adminId) {
  return jwt.sign({ sub: adminId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function signUserToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export function generateOtp() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, "0");
}

export function generateResetToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  return { rawToken, tokenHash };
}

export function hashToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}
