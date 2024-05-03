// backend/models/Goal.js

import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    startdate: {
        type: Date,
        required: true
    }, // Add startDate field

    duration: {
        type: String,
        required: true
    }, // Add duration field

    status: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
