// backend/controllers/journalController.mjs

import express from 'express';
const router = express.Router();
import JournalEntry from '../models/JournalEntry.mjs';

// Get all journal entries
router.get('/', async (req, res) => {
    try {
        const entries = await JournalEntry.find({});
        res.status(200).json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get journal entry by ID
router.get('/:id', async (req, res) => {
    try {
        const entry = await JournalEntry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }
        res.status(200).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
