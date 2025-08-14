import mongoose from 'mongoose'

const MoodSchema = new mongoose.Schema({
  date: { type: String, required: true },
  feeling: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true })

const Mood = mongoose.model('Mood', MoodSchema);
export default Mood;
