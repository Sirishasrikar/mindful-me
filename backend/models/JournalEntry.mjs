// backend/models/JournalEntry.js

import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' },
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

export default JournalEntry;
