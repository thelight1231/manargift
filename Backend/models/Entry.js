import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
  name: { type: String, default: 'زوجتي' },
  mood: { type: String, default: 'fa-heart' }
}, { timestamps: true });

export default mongoose.model('Entry', entrySchema);
