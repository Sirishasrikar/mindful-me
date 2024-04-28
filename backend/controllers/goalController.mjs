// backend/controllers/goalController.mjs

import express from 'express';
const router = express.Router();
import Goal from '../models/Goal.mjs';

// Get all goals
router.get('/', async (req, res) => {
    try {
        const goals = await Goal.find({});
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get goal by ID
router.get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
