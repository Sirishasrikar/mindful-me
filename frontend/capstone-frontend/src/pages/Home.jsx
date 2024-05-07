import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Access the navigate function

    const handleKnowMoreClick = () => {
        navigate('/knowmore'); // Navigate to the Knowmore page
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the Login page
    };

    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to the Signup page
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Welcome to Mindful Me</h1>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Explore mindfulness and well-being with us.</p>
            {/* Buttons for Knowmore, Login, and Signup */}
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleKnowMoreClick}>Knowmore</button>
            </div>
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleLoginClick}>Login</button>
            </div>
            <div style={{ margin: '10px 0' }}>
                <button onClick={handleSignupClick}>Signup</button>
            </div>
        </div>
    );
};

export default Home;

