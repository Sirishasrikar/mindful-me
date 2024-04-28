// backend/models/MoodEntry.js

import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema({
    mood: { type: String, enum: ['happy', 'sad', 'angry', 'calm', 'anxious', 'excited'], required: true },
    date: { type: Date, required: true },
    notes: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);

export default MoodEntry;
