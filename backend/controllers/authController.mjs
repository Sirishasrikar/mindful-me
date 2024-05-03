// backend/controllers/authController.mjs

import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import express from 'express';
const router = express.Router();
import User from '../models/User.mjs';

// Register a new user
router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password, dob, country } = req.body;

    console.log('Received data:', { firstName, lastName, email, dob, country, password })
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log('Hashed password:', hashedPassword)
    // Create new user
    const newUser = new User({ firstName, lastName, email, dob, country, password: hashedPassword });
    try {
        await newUser.save();
        console.log('User registered successfully:', newUser);
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
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // if (!user || !(await bcryptjs.compare(password, user.password))) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }
        // Generate JWT token
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.status(200).json({ token, user });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
