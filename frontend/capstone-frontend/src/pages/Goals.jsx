import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "../App.css"

const linkStyle = {
    fontSize: '30px',
    color: 'yellow'
};

const Goals = () => {

    const { user } = useAuth();
    const [goals, setGoals] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [updateMessage, setUpdateMessage] = useState(''); // Declare update message state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startdate: '',
        duration: '',
        status: '',
        uname: user ? user._id : ''
    });


    const [confirmUpdate, setConfirmUpdate] = useState(false); // State to track confirmation
    const [selectedGoalId, setSelectedGoalId] = useState(null); // State to store selected goal ID

    useEffect(() => {
        fetchGoals();
    }, []);

    // Function to fetch goals from the backend
    const fetchGoals = async () => {
        try {
            const response = await fetch(`http://localhost:5000/Goal/${user._id}`);
            if (response.ok) {
                const data = await response.json();
                // Sort the goals by creation date in descending order
                const sortedGoals = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Select the last 3 goals
                const last3Goals = sortedGoals.slice(0, 3);
                setGoals(last3Goals);
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
            console.log(JSON.stringify(formData)); // Log form data to verify before sending request
            const response = await fetch('http://localhost:5000/Goal/setGoals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // console.log({user:user.email})
                // Goal added successfully, fetch goals again to update the list
                fetchGoals();
                setRecentActivity([...recentActivity, formData.title]);
                // Limit recent activity to show only the last 3 entries
                setRecentActivity(recentActivity.slice(-3));
                // Reset form data
                setFormData({
                    title: '',
                    description: '',
                    startdate: '',
                    duration: '',
                    status: '',
                    //uname: ''
                    uname: user ? user._id : ''
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
                    //uname: data.uname || ''
                    uname: user ? user._id : '' || ''
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
                    setUpdateMessage(<span style={{ fontSize: '20px', color: 'rgba(242, 242, 5, 0.986)' }}>Goal updated successfully.</span>);
                    // Reset form data
                    setFormData({
                        title: '',
                        description: '',
                        startdate: '',
                        duration: '',
                        status: '',
                        uname: user ? user._id : ''
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
                        status: '',
                        uname: user ? user._id : ''
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
            <h2 className="page-heading">Goals</h2>
            <p className="user-greeting">Hi, {user && user.firstName ? user.firstName : 'User'}!</p>
            <form onSubmit={handleSubmit} className="goal-form">
                <div className="form-group">
                    <label htmlFor="title" className="field-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="field-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="form-input"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="startdate" className="field-label">Start Date:</label>
                    <input
                        type="date"
                        id="startdate"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration" className="field-label">Estimated Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status" className="field-label">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="uname" ></label>
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
                        <li key={goal._id} className="goals-item">
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
            <p style={{ fontSize: '30px' }}>
                <Link to="/dashboard" style={linkStyle}>Back to Dashboard</Link>
            </p>
        </div>
    );
};

export default Goals;