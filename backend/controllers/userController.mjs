// backend/controllers/userController.mjs

import express from 'express';
// import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
const router = express.Router();
import User from '../models/User.mjs';
import db from "../config/conn.mjs"


// Register a new user
router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, dob, country } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({ firstName, lastName, email, dob, country, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add a console log to see the email and password received in the request
        console.log("Received email:", email);
        console.log("Received password:", password);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Password incorrect or user not found");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Add a console log to see the user object
        console.log("User logged in successfully:", user);
        
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// INDEX - Get all users
router.get('/', async (req, res) => {
    try {
        const foundUsers = await User.find({});
        res.status(200).json(foundUsers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// NEW - Render new user form
router.get('/new', (req, res) => {
    res.render('users/New');
});

// DELETE - Delete user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE - Update user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// SHOW - Get single user
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
