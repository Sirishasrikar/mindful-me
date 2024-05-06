// backend/controllers/journalController.mjs

import express from 'express';
const router = express.Router();
import JournalEntry from '../models/JournalEntry.mjs';
// import jwt from 'jsonwebtoken'; // Import jwt

// Add new journal entry (modified on 05/03)
router.post('/journal', async (req, res) => {
    try {
        const { title, content, date } = req.body;
        // const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the header
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const userEmail = decodedToken.email;

        const newJournalEntry = new JournalEntry({
            title,
            content,
            date: new Date(date), // to use the current date and time
            // user: userEmail // Associate the journal entry with the user's email
        });
        await newJournalEntry.save();
        res.status(201).json({ message: 'Journal entry saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all journal entries
router.get('/JournalEntry', async (req, res) => {
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
