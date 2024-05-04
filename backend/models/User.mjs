// backend/models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures email is unique and acts as the unique identifier
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String
    }
    }, {
        timestamps: true // Adds createdAt and updatedAt fields

});

const User = mongoose.model('User', userSchema);

export default User;
