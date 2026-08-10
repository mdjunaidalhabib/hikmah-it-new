import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function requireUserAuth(req, res, next) {
  const token = req.cookies?.user_token;
  if (!token) {
    return res.status(401).json({ message: "আপনি লগইন করেননি" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("suspended deletedAt");
    if (!user || user.deletedAt) {
      res.clearCookie("user_token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
      return res.status(401).json({ message: "সেশন মেয়াদোত্তীর্ণ হয়েছে, আবার লগইন করুন" });
    }
    if (user.suspended) {
      res.clearCookie("user_token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
      return res.status(403).json({ message: "আপনার অ্যাকাউন্ট সাসপেন্ড করা হয়েছে। সাপোর্টে যোগাযোগ করুন।" });
    }
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "সেশন মেয়াদোত্তীর্ণ হয়েছে, আবার লগইন করুন" });
  }
}
