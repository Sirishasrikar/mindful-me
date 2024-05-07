import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom'
import "../App.css"

const linkStyle = {
    fontSize: '30px',
    color: 'yellow'
  };

const Journal = () => {
    const { user } = useAuth();
    const [journalEntry, setJournalEntry] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toLocaleString(), // Get current date and time
        uname: user ? user._id : ''
    });

    useEffect(() => {
        fetchJournal();
    }, []);

    // Function to fetch goals from the backend
    const fetchJournal = async () => {
        try {
            const response = await fetch(`http://localhost:5000/JournalEntry/${user._id}`);
            if (response.ok) {
                const data = await response.json();
                // Sort the journalentries by creation date in descending order
                const sortedJournals = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Select the last 5 journal entries
                const last5Journal = sortedJournals.slice(0, 5);
                setJournalEntry(last5Journal);
            } else {
                console.error('Failed to fetch journal entries:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmSave = window.confirm('Are you sure you want to save this journal entry?');
        console.log('FormData:', formData); // Debugging statement
        if (confirmSave) {
            try {
                const response = await fetch('http://localhost:5000/JournalEntry/journal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                    // body: JSON.stringify({
                    //     title: selectedTitle,
                    //     content: journalContent,
                    //     date: new Date().toLocaleString() // Assuming you want to use the current date and time
                    // })
                });
                if (response.ok) {
                    console.log('Journal entry saved successfully');
                    fetchJournal();
                    setRecentActivity([...recentActivity, formData.title]);
                    // Limit recent activity to show only the last 5 entries
                    setRecentActivity(recentActivity.slice(-5));
                    // Reset form data
                    setFormData({
                        title: '',
                        content: '',
                        date: new Date().toLocaleString(), // Get current date and time
                        uname: user ? user._id : ''
                    });

                } else {
                    console.error('Failed to save journal entry:', response.statusText);
                    // Handle failure, e.g., show an error message
                }
            } catch (error) {
                console.error('Error saving journal entry:', error.message);
                // Handle network error
            }
        }
    };

    return (
        <div className="journal-container">
            <h2>Journal Entry</h2>
            <p className="user-greeting">Hi, {user && user.firstName ? user.firstName : 'User'}!</p>
            <form onSubmit={handleSubmit}> </form>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Title</option>
                    {/* Add options for journal entry titles */}
                    <option value="Reflections on Today">Reflections on Today</option>
                    <option value="Gratitude Journal">Gratitude Journal</option>
                    <option value="Creative Musings">Creative Musings</option>
                    <option value="Mindful Moments">Mindful Moments</option>
                    <option value="Inner Journey">Inner Journey</option>
                    <option value="Daily Dose of Positivity">Daily Dose of Positivity</option>
                    <option value="Moments of Clarity">Moments of Clarity</option>
                    <option value="Self-Discovery Chronicles">Self-Discovery Chronicles</option>
                    <option value="Dreams and Aspirations">Dreams and Aspirations</option>
                    <option value="Emotional Landscape">Emotional Landscape</option>
                    <option value="Moments of Stillness">Moments of Stillness</option>
                    <option value="Inspirational Insights">Inspirational Insights</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    maxLength={500} // Limit content to 500 characters
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date and Time:</label>
                <input
                    id="date"
                    name="date"
                    type="text"
                    value={formData.date}
                    readOnly // Make the input field read-only
                />
            </div>
            <div className="form-group">
                <label htmlFor="uname"></label>
                <input
                    type="hidden"
                    id="uname"
                    name="uname"
                    value={formData.uname}
                    //value='srikar77'
                    onChange={handleChange}
                    required
                    readOnly
                    className="form-input"
                />
            </div>

            <ul className="journal-list">
                {journalEntry.map((journal) => {
                    return (
                        <li key={journal._id}>
                            <div>Title: {journal.title}</div>
                            <div>Content: {journal.content}</div>
                            <div>Date: {journal.date}</div>
                        </li>
                    )
                }
            )}
            </ul>

            <button onClick={handleSubmit}>Save</button>
            <p style={{ fontSize: '30px'}}>
            <Link to="/dashboard" style={linkStyle}>Back to Dashboard</Link>
            </p>
        </div>
    );
};

export default Journal;
