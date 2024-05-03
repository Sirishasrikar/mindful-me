import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Goals = () => {
    const { user } = useAuth();
    const [goals, setGoals] = useState([]);
    const [updateMessage, setUpdateMessage] = useState(''); // Declare update message state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startdate: '',
        duration: '',
        status: ''
    });
    const [confirmUpdate, setConfirmUpdate] = useState(false); // State to track confirmation
    const [selectedGoalId, setSelectedGoalId] = useState(null); // State to store selected goal ID

    useEffect(() => {
        fetchGoals();
    }, []);

    // Function to fetch goals from the backend
    const fetchGoals = async () => {
        try {
            const response = await fetch('http://localhost:5000/Goal');
            if (response.ok) {
                const data = await response.json();
                // Sort the goals by creation date in descending order
                const sortedGoals = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                // Select the last 5 goals
                const last5Goals = sortedGoals.slice(0, 5);
                setGoals(last5Goals);
            } else {
                console.error('Failed to fetch goals:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
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
        try {
            const response = await fetch('http://localhost:5000/Goal/setGoals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Goal added successfully, fetch goals again to update the list
                fetchGoals();
                // Reset form data
                setFormData({
                    title: '',
                    description: '',
                    startdate: '',
                    duration: '',
                    status: ''
                });
            } else {
                console.error('Failed to add goal');
            }
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/Goal/${id}`);
            if (response.ok) {
                const data = await response.json();
                // Populate form fields with the data for the selected goal
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    startdate: data.startdate || '',
                    duration: data.duration || '',
                    status: data.status || '',
                });
                // Set selected goal ID
                setSelectedGoalId(id);
                // Set confirmation state to true
                setConfirmUpdate(true);
            } else {
                console.error('Failed to fetch goal for update:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching goal for update:', error);
        }
    };

    const handleConfirmUpdate = async () => {
        const confirm = window.confirm('Do you want to update the goal with these changes?');
        if (confirm) {
            try {
                const response = await fetch(`http://localhost:5000/Goal/${selectedGoalId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    // Goal updated successfully, fetch goals again to update the list
                    fetchGoals();
                    // Show update message
                    setUpdateMessage('Goal updated successfully.');
                    // Reset form data
                    setFormData({
                        title: '',
                        description: '',
                        startdate: '',
                        duration: '',
                        status: ''
                    });
                    // Set confirmation state back to false
                    setConfirmUpdate(false);
                } else {
                    console.error('Failed to update goal');
                }
            } catch (error) {
                console.error('Error updating goal:', error);
            }
        } else {
            // If user cancels update, set confirmation state back to false
            setConfirmUpdate(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Do you really want to delete the goal?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/Goal/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    // Goal deleted successfully, fetch goals again to update the list
                    fetchGoals();
                    // Reset form data
                    setFormData({
                        title: '',
                        description: '',
                        startdate: '',
                        duration: '',
                        status: ''
                    });
                } else {
                    console.error('Failed to delete goal');
                }
            } catch (error) {
                console.error('Error deleting goal:', error);
            }
        }
    };


    return (
        <div className="goals-container">
            <h2>Goals</h2>
            <form onSubmit={handleSubmit} className="goal-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="startdate">Start Date:</label>
                    <input
                        type="date"
                        id="startdate"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Estimated Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                {/* Display either Update or Confirm Update button based on confirmation state */}
                {confirmUpdate ? (
                    <button type="button" onClick={handleConfirmUpdate}>Confirm Update</button>
                ) : (
                    <button type="submit">Add Goal</button>
                )}
            </form>
            {/* Display goals */}
            <ul>
                {goals.map((goal) => {

                    return (
                        <li key={goal._id}>
                            {/* Render goal details */}
                            <div>Title: {goal.title}</div>
                            <div>Description: {goal.description}</div>
                            <div>Start Date: {goal.startdate}</div>
                            <div>Duration: {goal.duration}</div>
                            <div>Status: {goal.status}</div>
                            {/* Add update and delete buttons */}
                            <button onClick={() => handleUpdate(goal._id)}>Update</button>
                            <button onClick={() => handleDelete(goal._id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
            {/* Update message */}
            {updateMessage && <p>{updateMessage}</p>}
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default Goals;
