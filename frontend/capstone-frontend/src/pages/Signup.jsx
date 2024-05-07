import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    const [signedUp, setSignedUp] = useState(false); // State to track sign up status
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

        // Validation checks
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.dob.trim()) {
            errors.dob = 'Date of Birth is required';
        } else if (!isValidDate(formData.dob)) {
            errors.dob = 'Invalid date format';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.country.trim()) {
            errors.country = 'Country/Region is required';
        }

        // Set errors and prevent form submission if there are validation errors
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        try {
            // Send form data to backend API for user registration
            const response = await fetch('http://localhost:5000/User/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            }); console.log(formData)
            if (response.ok) {
                // Set user's first name in local storage
                localStorage.setItem('firstName', formData.firstName);
                // Set sign up status to true
                setSignedUp(true);
                // // User registration successful, redirect to dashboard
                // navigate('/dashboard');
            } else {
                // Handle server errors or invalid responses
                console.error('Failed to register user:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error('Error registering user:', error.message);
        }
    };

    if (signedUp) {
        return (
            <div className="signup-container">
                <p>Welcome, {formData.firstName}! You have successfully signed up.</p>
                <p style={{ fontSize: '30px', color: 'blue' }}>
                    <Link to="/login">Go to Login</Link>
                </p>
            </div>
        );
    }


    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate date format (YYYY-MM-DD)
    const isValidDate = (date) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date);
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
