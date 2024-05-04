import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
    const { user } = useAuth(); // Access user object from context
    // const [firstName, setFirstName] = useState('User'); // State to store the username
    const [recentActivity, setRecentActivity] = useState([]); // State to store recent activity

    // useEffect(() => {
    //     if (user && user.firstName) {
    //         setFirstName(user.firstName); // Set username if available in user object
    //     }
    // }, [user]);



    // Function to fetch recent activity from the backend
    const fetchRecentActivity = async () => {
        try {
            // Fetch recent activity from the backend for Log Mood
            const logMoodResponse = await fetch('http://localhost:5000/MoodEntry/logMood');
            const logMoodData = await logMoodResponse.json();
            console.log('Log Mood Data:', logMoodData);

            // Fetch recent activity from the backend for Set Goals
            const setGoalsResponse = await fetch('http://localhost:5000/Goal/setGoals');
            const setGoalsData = await setGoalsResponse.json();

            // Fetch recent activity from the backend for Journal Entry
            const journalEntryResponse = await fetch('http://localhost:5000/JournalEntry/journal');
            const journalEntryData = await journalEntryResponse.json();

            // Combine all recent activities into one array
            const combinedRecentActivity = [...logMoodData.slice(-3), ...setGoalsData.slice(-3), ...journalEntryData.slice(-3)];
            console.log('Combined Recent Activity:', combinedRecentActivity)

            // Set the combined recent activity to state
            setRecentActivity(combinedRecentActivity);
        } catch (error) {
            console.error('Error fetching recent activity:', error);
        }
    };

    // useEffect hook to fetch recent activity when the component mounts
    useEffect(() => {
        fetchRecentActivity();
    }, [user]);


    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>MindfulMe</h1>
                <p>Welcome, {user && user.firstName ? user.firstName : 'User'}!</p>
            </div>
            <div className="recent-activity">
                <h2>Recent Activity:</h2>
                <ul>
                    {recentActivity.map((activity, index) => (
                        <li key={index}>{activity.activityName}</li>
                    ))}
                </ul>
            </div>
            <div className="actions">
                <Link to="/start-meditation" className="action-link">Start Meditation Session</Link>
                <Link to="/log-mood" className="action-link">Log Mood</Link>
                <Link to="/write-journal" className="action-link">Write Journal Entry</Link>
                <Link to="/set-goals" className="action-link">Set Wellness Goals</Link>
            </div>
        </div>
    );
};

export default Dashboard;
