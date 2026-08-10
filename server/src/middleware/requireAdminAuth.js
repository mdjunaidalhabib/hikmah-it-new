import jwt from "jsonwebtoken";

export default function requireAdminAuth(req, res, next) {
  const token = req.cookies?.admin_token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}
