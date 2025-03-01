import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css'; // Import the CSS file
import VerifyOtp from './components/VerifyOtp';
import VerifyEmail from './components/VerifyEmail'; // Import the new component
import EmailVerified from './components/EmailVerified'; // Import the new component
import Feed from './components/Feed'; // Import the new component

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (res.data.is_verified) {
                        navigate('/feed');
                    }
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="home-page">
                        <div className="welcome-message">Welcome to the Twitter Clone</div>
                        <div className="button-container">
                            <Link to="/signup" className="btn">
                                Sign Up
                            </Link>
                            <Link to="/signin" className="btn">
                                Sign In
                            </Link>
                        </div>
                    </div>
                }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
