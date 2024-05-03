// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import KnowMore from './pages/KnowMore';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import Goals from './pages/Goals';
import CommunityResources from './pages/CommunityResources';
import './App.css'


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navigation />
      <Routes>
        {<Route path="/" element={<Home />} />}
        {<Route path="/login" element={<Login />} />}
        <Route path="/signup" element={<Signup />} />
        {<Route path="/dashboard" element={<Dashboard />} />}
        {<Route path="/log-mood" element={<MoodTracker />} />}
        {<Route path="/knowmore" element={<KnowMore />} />}
        {<Route path="/set-goals" element={<Goals />} />}
        {<Route path="/community-resources" element={<CommunityResources />} />}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

