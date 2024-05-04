import React, { useState } from 'react';

const Journal = () => {
    const [selectedTitle, setSelectedTitle] = useState('');
    const [journalContent, setJournalContent] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toLocaleString() // Get current date and time
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/JournalEntry/journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: selectedTitle,
                    content: journalContent,
                    date: new Date().toLocaleString() // Assuming you want to use the current date and time
                })
            });
            if (response.ok) {
                console.log('Journal entry saved successfully');
                // Handle success, e.g., show a success message
            } else {
                console.error('Failed to save journal entry:', response.statusText);
                // Handle failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Error saving journal entry:', error.message);
            // Handle network error
        }
    };

    return (
        <div className="journal-container">
            <h2>Journal Entry</h2>
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
            <button onClick={handleSave}>Save</button>
            <button onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</button>
        </div>
    );
};

export default Journal;
