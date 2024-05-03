// MoodTracker.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import { Link } from 'react-router-dom';

const MoodTracker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMood, setSelectedMood] = useState('');
    const [notes, setNotes] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleMoodChange = (e) => {
        setSelectedMood(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/MoodEntry/logMood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mood: selectedMood,
                    notes: notes,
                    date: selectedDate
                })
            });
            if (response.ok) {
                console.log('Mood saved successfully');
                // Handle success, e.g., show a success message
            } else {
                console.error('Failed to save mood:', response.statusText);
                // Handle failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Error saving mood:', error.message);
            // Handle network error
        }
    };

    return (
        <div className="mood-tracker-container">
            <h1>MindfulMe</h1>
            <h2>Mood Tracker</h2>
            <div className="content-container">
                <div className="calendar-container">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                    <p>Select date: {selectedDate.toDateString()}</p>
                </div>
                <div className="mood-selection">
                    <label htmlFor="mood-dropdown" className="bold-label">How do you feel today?</label>
                    <select id="mood-dropdown" value={selectedMood} onChange={handleMoodChange}>
                        <option value="">Select mood</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="angry">Angry</option>
                        <option value="confused">Confused</option>
                        <option value="depressed">Depressed</option>
                        <option value="calm">Calm</option>
                        <option value="anxious">Anxious</option>
                        <option value="excited">Excited</option>
                    </select>
                </div>
                <div className="notes">
                    <label htmlFor="notes-input" className="bold-label">Notes (optional):</label>
                    <textarea id="notes-input" value={notes} onChange={handleNotesChange}></textarea>
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
            <Link to="/dashboard">
                <button>Back to Dashboard</button>
            </Link>
        </div>
    );
};

export default MoodTracker;
