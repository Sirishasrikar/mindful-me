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
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'yellow' }}>Welcome to Mindful Me</h1>
            <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'yellow' }}>Explore mindfulness and well-being with us.</p>
            <p style={{ fontSize: '2em', marginBottom: '5px', color: 'yellow' }}>Want to explore more? 
            <span style={{ fontWeight: 'bold', color: 'blue', cursor: 'pointer' }} onClick={handleKnowMoreClick}>Know More</span></p>
            <p style={{ fontSize: '2em', marginBottom: '5px', color: 'yellow' }}>Already a user? 
            <span style={{ fontWeight: 'bold', color: 'blue', cursor: 'pointer' }} onClick={handleLoginClick}>Login</span></p><br/>
            <p style={{ fontSize: '2em', marginTop: '5px', color: 'yellow' }}>New here? 
            <span style={{ fontWeight: 'bold', color: 'blue', cursor: 'pointer' }} onClick={handleSignupClick}>Sign up</span></p>
        </div>
    );
};

export default Home;

