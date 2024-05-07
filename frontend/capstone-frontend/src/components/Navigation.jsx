import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import '../App.css'

const Navigation = () => {
    return (
        <AppBar position="sticky" className="navbar">
            <Toolbar className="navbar-container">
            <div className="navbar-items">  
                <Button color="inherit" component={Link} to="/" className="nav-button">Home</Button>
                <Button color="inherit" component={Link} to="/login" className="nav-button">Login</Button>
                <Button color="inherit" component={Link} to="/knowmore" className="nav-button">Know More</Button>
                <Button color="inherit" component={Link} to="/signup" className="nav-button">Signup</Button> {/* Add the Signup link */}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
