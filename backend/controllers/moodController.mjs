// backend/controllers/moodController.mjs

import express from 'express';
const router = express.Router();
import MoodEntry from '../models/MoodEntry.mjs';

// Add new mood entry
router.post('/logMood', async (req, res) => {
    try {
        const { mood, notes, date } = req.body;
        const newMoodEntry = new MoodEntry({
            mood,
            date: new Date(),
            notes
            // user: req.user // Assuming you have middleware to extract the user from the token
        });
        await newMoodEntry.save();
        res.status(201).json({ message: 'Mood entry logged successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// // Get all mood entries
// router.get('/', async (req, res) => {
//     try {
//         const entries = await MoodEntry.find({});
//         res.status(200).json(entries);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Get mood entry by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const entry = await MoodEntry.findById(req.params.id);
//         if (!entry) {
//             return res.status(404).json({ message: 'Mood entry not found' });
//         }
//         res.status(200).json(entry);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Add more route handlers as needed

export default router;
