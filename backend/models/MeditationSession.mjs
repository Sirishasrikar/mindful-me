// backend/models/MeditationSession.js

import mongoose from 'mongoose';

const meditationSessionSchema = new mongoose.Schema({
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    feedback: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const MeditationSession = mongoose.model('MeditationSession', meditationSessionSchema);

export default MeditationSession;
