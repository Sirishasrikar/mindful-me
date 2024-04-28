// backend/controllers/moodController.mjs

import express from 'express';
const router = express.Router();
import MoodEntry from '../models/MoodEntry.mjs';

// Get all mood entries
router.get('/', async (req, res) => {
    try {
        const entries = await MoodEntry.find({});
        res.status(200).json(entries);
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

// Add more route handlers as needed

export default router;
