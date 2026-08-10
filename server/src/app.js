import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import adminAuthRouter from "./routes/adminAuth.js";
import adminPackagesRouter from "./routes/adminPackages.js";
import adminPurchasesRouter from "./routes/adminPurchases.js";
import adminPartnersRouter from "./routes/adminPartners.js";
import adminContactRouter from "./routes/adminContact.js";
import adminPortfolioRouter from "./routes/adminPortfolio.js";
import adminServicesRouter from "./routes/adminServices.js";
import adminTestimonialsRouter from "./routes/adminTestimonials.js";
import adminSettingsRouter from "./routes/adminSettings.js";
import adminUploadRouter from "./routes/upload.js";
import adminUsersRouter from "./routes/adminUsers.js";
import adminNotificationsRouter from "./routes/adminNotifications.js";
import adminTrashRouter from "./routes/adminTrash.js";
import publicRouter from "./routes/public.js";
import userAuthRouter from "./routes/userAuth.js";
import requireAdminAuth from "./middleware/requireAdminAuth.js";
import { uploadsDir } from "./middleware/upload.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/admin", adminAuthRouter);
app.use("/api/admin/packages", requireAdminAuth, adminPackagesRouter);
app.use("/api/admin/purchases", requireAdminAuth, adminPurchasesRouter);
app.use("/api/admin/partners", requireAdminAuth, adminPartnersRouter);
app.use("/api/admin/contact", requireAdminAuth, adminContactRouter);
app.use("/api/admin/portfolio", requireAdminAuth, adminPortfolioRouter);
app.use("/api/admin/services", requireAdminAuth, adminServicesRouter);
app.use("/api/admin/testimonials", requireAdminAuth, adminTestimonialsRouter);
app.use("/api/admin/settings", requireAdminAuth, adminSettingsRouter);
app.use("/api/admin/upload", requireAdminAuth, adminUploadRouter);
app.use("/api/admin/users", requireAdminAuth, adminUsersRouter);
app.use("/api/admin/notifications", requireAdminAuth, adminNotificationsRouter);
app.use("/api/admin/trash", requireAdminAuth, adminTrashRouter);

app.use("/api/user", userAuthRouter);
app.use("/api/public", publicRouter);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "..", "dist");

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
