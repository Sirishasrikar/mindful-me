// backend/controllers/moodController.mjs

import express from 'express';
const router = express.Router();
import MoodEntry from '../models/MoodEntry.mjs';
import jwt from 'jsonwebtoken'; // Import jwt

// Add new mood entry (modified on 05/03)
router.post('/logMood', async (req, res) => {
    try {
        const { mood, notes, date } = req.body;
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the header
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        const newMoodEntry = new MoodEntry({
            mood,
            date: new Date(), // Assuming you want to use the current date and time
            notes,
            user: userEmail // Associate the mood entry with the user's email
        });
        await newMoodEntry.save();
        res.status(201).json({ message: 'Mood entry logged successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get mood entry by ID
router.get('/:id', async (req, res) => {
    try {
        const entry = await MoodEntry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: 'Mood entry not found' });
        }
        res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

