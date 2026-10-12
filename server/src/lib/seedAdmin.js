import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";

const BCRYPT_ROUNDS = 10;

const normalizeEmail = (value) => (value ? String(value).toLowerCase().trim() : "");

/**
 * Keeps the admin account in sync with ADMIN_EMAIL / ADMIN_PASSWORD from server/.env.
 *
 *  - No admin yet            -> create one from .env.
 *  - .env value changed      -> apply the new value to the admin account.
 *  - .env value NOT changed  -> do nothing (a password changed later through the
 *                               reset-password flow is left untouched).
 *
 * "Changed" is detected by remembering what was last applied from .env
 * (`envEmail`, and `envPasswordHash` — a salted bcrypt hash, never the plain text).
 */
export async function seedAdmin() {
  const email = normalizeEmail(process.env.ADMIN_EMAIL);
  const password = process.env.ADMIN_PASSWORD || "";

  const admin = await AdminUser.findOne().select("+envEmail +envPasswordHash");

  // ---- First run: create the initial admin ----
  if (!admin) {
    if (!email || !password) {
      console.warn(
        "[seedAdmin] No admin account exists yet and ADMIN_EMAIL/ADMIN_PASSWORD are not set in server/.env — " +
          "admin login will not work until you set them and restart the server."
      );
      return;
    }
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await AdminUser.create({ email, passwordHash, envEmail: email, envPasswordHash: passwordHash });
    console.log(`[seedAdmin] Created initial admin account for ${email}`);
    return;
  }

  const changes = [];

  // ---- Email ----
  if (email && email !== admin.envEmail) {
    if (email !== admin.email) {
      admin.email = email;
      changes.push("email");
    }
    admin.envEmail = email; // remember the applied value (also covers legacy records)
  }

  // ---- Password ----
  if (password) {
    // Compare against the last password applied from .env. Legacy records have no
    // record yet, so fall back to the current hash to avoid a pointless rewrite.
    const reference = admin.envPasswordHash || admin.passwordHash;
    const unchanged = await bcrypt.compare(password, reference);

    if (!unchanged) {
      const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
      admin.passwordHash = passwordHash;
      admin.envPasswordHash = passwordHash;
      // Invalidate any password-reset link issued before the change.
      admin.resetTokenHash = null;
      admin.resetTokenExpires = null;
      changes.push("password");
    } else if (!admin.envPasswordHash) {
      admin.envPasswordHash = admin.passwordHash; // start tracking, no change
    }
  }

  if (admin.isModified()) {
    await admin.save();
  }

  if (changes.length) {
    console.log(`[seedAdmin] Updated admin ${changes.join(" & ")} from server/.env (${admin.email})`);
  }
}
