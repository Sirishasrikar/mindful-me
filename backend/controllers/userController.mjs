// backend/controllers/userController.mjs

import express from 'express';
const router = express.Router();
import User from '../models/User.mjs';
import db from "../config/conn.mjs"

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

// CREATE - Add new user
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        // // Check if required fields are present in the request body
        // const { username, email, password } = req.body;
        // if (!username || !email || !password) {
        //     return res.status(400).json({ message: 'Username, email, and password are required' });
        // }

        // Create new user
        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
});

// EDIT - Render edit user form
router.get('/:id/edit', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.status(200).json(foundUser);
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
