import { Router } from 'express';
import Entry from '../models/Entry.js';

const router = Router();

// Get all diary entries (newest first)
router.get('/', async (_req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
});

// Create a new diary entry
router.post('/', async (req, res) => {
  try {
    const { text, date, name, mood } = req.body;
    if (!text || !date) return res.status(400).json({ message: 'بيانات غير صالحة' });
    const entry = new Entry({ text, date, name, mood });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: 'تعذر إنشاء المذكرة' });
  }
});

export default router;
