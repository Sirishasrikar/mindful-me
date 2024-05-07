// backend/controllers/goalController.mjs

import express from 'express';
const router = express.Router();
import Goal from '../models/Goal.mjs';

// Create a new goal
router.post('/setGoals', async (req, res) => {
    try {
        console.log("test");
        console.log(req.body); // Log received request body to verify data
        const { title, description, startdate, duration, status , uname} = req.body;
        const newGoal = new Goal({ title, description, startdate, duration, status, uname });
        await newGoal.save();
        res.status(201).json(newGoal);
        console.log(newGoal)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

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
    //router.get('/getGoal', async (req, res) => {
    try {
        const uuid=req.params.id
        // /const goal = await Goal.find({user: req.params.id});
        //const goal = await Goal.find({uname:'6633d90f15510329ff72c9de'});
        const goal = await Goal.find({uname: uuid});
        console.log('after the cal', goal)

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update goal by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, description, startdate, duration,status } = req.body;
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            { title, description, startdate, duration, status },
            { new: true }
        );
        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete goal by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;