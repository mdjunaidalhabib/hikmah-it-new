import { Router } from "express";
import NotificationLog from "../models/NotificationLog.js";

const router = Router();

router.get("/", async (req, res) => {
  const { channel, status, page = 1, limit = 25 } = req.query;
  const filter = {};
  if (channel) filter.channel = channel;
  if (status) filter.status = status;

  const pageNum = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 25));

  const [logs, total, counts] = await Promise.all([
    NotificationLog.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize),
    NotificationLog.countDocuments(filter),
    NotificationLog.aggregate([{ $group: { _id: { channel: "$channel", status: "$status" }, count: { $sum: 1 } } }]),
  ]);

  const summary = { email: { sent: 0, failed: 0, skipped_not_configured: 0 }, sms: { sent: 0, failed: 0, skipped_not_configured: 0 } };
  for (const row of counts) {
    if (summary[row._id.channel]) {
      summary[row._id.channel][row._id.status] = row.count;
    }
  }

  res.json({ logs, total, page: pageNum, limit: pageSize, summary });
});

router.delete("/", async (req, res) => {
  const result = await NotificationLog.deleteMany({});
  res.json({ message: "History cleared", deletedCount: result.deletedCount });
});

export default router;
