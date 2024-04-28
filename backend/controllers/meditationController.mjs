// backend/controllers/meditationController.mjs

import express from 'express';
const router = express.Router();
import MeditationSession from '../models/MeditationSession.mjs';

// Get all meditation sessions
router.get('/', async (req, res) => {
    try {
        const sessions = await MeditationSession.find({});
        res.status(200).json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get meditation session by ID
router.get('/:id', async (req, res) => {
    try {
        const session = await MeditationSession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Meditation session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add more route handlers as needed

export default router;
