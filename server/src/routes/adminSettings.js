import { Router } from "express";
import SiteSettings from "../models/SiteSettings.js";

const router = Router();

router.get("/", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  res.json(settings);
});

router.put("/", async (req, res) => {
  const settings = await SiteSettings.getSingleton();
  const body = { ...req.body };
  if (body.sectionVisibility) {
    body.sectionVisibility = { ...settings.sectionVisibility.toObject(), ...body.sectionVisibility };
  }
  if (body.founder) {
    body.founder = { ...settings.founder.toObject(), ...body.founder };
  }
  Object.assign(settings, body);
  await settings.save();
  res.json(settings);
});

export default router;
