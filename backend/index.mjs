// backend/index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./config/conn.mjs";
import userRoutes from "./controllers/userController.mjs"
import goalRoutes from "./controllers/goalController.mjs"
import journalRoutes from "./controllers/journalController.mjs"
import meditationRoutes from "./controllers/meditationController.mjs"
import moodRoutes from "./controllers/moodController.mjs"
import authRoutes from "./controllers/authController.mjs"

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use("/User",userRoutes);
app.use("/Auth", authRoutes);
app.use("/Goal",goalRoutes);
app.use("/JournalEntry",journalRoutes);
app.use("/MeditationSession",meditationRoutes);
app.use("/MoodEntry",moodRoutes);

app.get("/", (req, res)=>{
    res.send(
        `<div>this is the backend</div>`
    );
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
