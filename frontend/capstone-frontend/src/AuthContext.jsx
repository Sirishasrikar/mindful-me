// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        
            // Fetch user data using token from backend
            fetch('http://localhost:5000/User', {
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        
    }, []);

    const signup = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/User/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                // Handle successful registration
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            console.log(data);
            console.log(response.ok)

            if (response.ok) {
                // localStorage.setItem('token', data.token);
                // setUser(data.user);
                setUser(data);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };