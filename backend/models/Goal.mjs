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

    uname: {
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'User'
        type: String,
        required: true
    }
    
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
