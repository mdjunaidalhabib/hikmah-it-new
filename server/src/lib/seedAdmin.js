import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existing = await AdminUser.findOne();

  if (existing) {
    if (email && existing.email !== email.toLowerCase().trim()) {
      existing.email = email.toLowerCase().trim();
      await existing.save();
      console.log(`[seedAdmin] Synced admin email from server/.env to ${existing.email}`);
    }
    return;
  }

  if (!email || !password) {
    console.warn(
      "[seedAdmin] No admin account exists yet and ADMIN_EMAIL/ADMIN_PASSWORD are not set in server/.env — " +
        "admin login will not work until you set them and restart the server."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await AdminUser.create({ email: email.toLowerCase().trim(), passwordHash });
  console.log(`[seedAdmin] Created initial admin account for ${email}`);
}
