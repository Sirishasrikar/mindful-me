import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import '../App.css'

const Navigation = () => {
    return (
        <AppBar position="sticky" className="navbar">
            <Toolbar className="navbar-container">
            <div className="navbar-items">  
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/knowmore">Know More</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button> {/* Add the Signup link */}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
