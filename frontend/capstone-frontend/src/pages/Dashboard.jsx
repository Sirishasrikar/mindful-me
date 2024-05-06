import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "../App.css"

const Dashboard = () => {
    const { user } = useAuth(); // Access user object from context
    const [recentGoals, setRecentGoals] = useState([]);
    
    // Fetch recent activity on component mount
    useEffect(() => {
        fetchRecentGoals();
    }, []);

    const fetchRecentGoals = async () => {
        try {
            console.log('heeeeeeeeeeeeeeeeeeeee')
            const response = await fetch(`http://localhost:5000/Goal/${user._id}`);
            console.log('heeeeeeeeeeeeeeeeeeeee')
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
    // // Function to fetch recent activity from the backend
    // const fetchRecentActivity = async () => {
    //     try {
    //         // Fetch recent activity data from the backend API
    //         // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    //         const response = await fetch('YOUR_API_ENDPOINT/recentActivity');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // Update recent activity state with the fetched data
    //             setRecentActivity(data);
    //         } else {
    //             console.error('Failed to fetch recent activity:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching recent activity:', error);
    //     }
    // };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Your Dashboard</h2>
            <p>Hi, {user && user.firstName ? user.firstName : 'User'}!</p>
            {/* Display recent activity */}
            <div className="recent-activity">
                <h3>Recent Goals</h3>
                <ul>
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
        </div>
    );
};

export default Dashboard;
