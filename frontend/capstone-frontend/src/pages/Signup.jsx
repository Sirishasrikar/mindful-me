import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    });
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]); // State to store country data
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch country data from the API
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                // Extract country names from the response
                const countryNames = data.map(country => country.name.common);
                // Set the country names in the state
                setCountries(countryNames);
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        
        if (Object.keys(errors).length === 0) {
            try {
                // Send form data to backend API for user registration
                const response = await fetch('http://localhost:5000/User', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                    
                });console.log(formData)
                if (response.ok) {
                     // Set user's first name in local storage
                    localStorage.setItem('firstName', formData.firstName);
                    // User registration successful, redirect to dashboard
                    navigate('/dashboard');
                } else {
                    // Handle server errors or invalid responses
                    console.error('Failed to register user:', response.statusText);
                }
            } catch (error) {
                // Handle network errors or exceptions
                console.error('Error registering user:', error.message);
            }
        } else {
            setErrors(errors);
        }
    };
return (
    <div className="signup-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                {errors.dob && <span className="error-message">{errors.dob}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="country">Country/Region:</label>
                <div>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="">Select Country/Region</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
            <button type="submit">Signup</button>
        </form>
    </div>
);
        };

export default Signup;
