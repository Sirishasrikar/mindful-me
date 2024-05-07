import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "../App.css"

const Dashboard = () => {
    const { user, logout } = useAuth(); // Access user object from context
    const [recentGoals, setRecentGoals] = useState([]);
    const navigate = useNavigate(); // Access the navigate function
    
    // Fetch recent activity on component mount
    useEffect(() => {
        fetchRecentGoals();
    }, []);

    const fetchRecentGoals = async () => {
        try {
            const response = await fetch(`http://localhost:5000/Goal/${user._id}`);
            if (response.ok) {
                const data = await response.json();
                setRecentGoals(data.slice(-3)); // Get the last 3 goals
            } else {
                console.error('Failed to fetch recent goals:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching recent goals:', error.message);
        }
    };
 
    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the Home page after logout
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Your Dashboard</h2>
            <p>Hi, {user && user.firstName ? user.firstName : 'User'}!</p>
            {/* Display recent activity */}
            <div className="section-heading">
                <h3 >Recent Goals</h3><br/>
                <ul><br />
                    {recentGoals.map((goal) => (
                        <div key={goal._id} className="goal-item">
                            <p>{goal.title}</p>
                            <p>{goal.description}</p>
                            <p>Status: {goal.status}</p>
                            </div>
                    ))}
                </ul>
            </div>
            {/* Links to pages */}
            <div className="page-links">
            <Link to="/start-meditation" >Start Meditation Session</Link><br/>
            <Link to="/log-mood">Log Mood</Link><br/>
            <Link to="/set-goals">Set Goals</Link><br/>
            <Link to="/write-journal">Write Journal Entry</Link><br/>
            </div>
            {/* Logout button */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
