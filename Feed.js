import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Feed.css'; // Import the CSS file for styling

const Feed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const tempToken = localStorage.getItem('tempToken');

            if (!token && !tempToken) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You need to sign in to access this page.',
                }).then(() => {
                    navigate('/signin');
                });
                return;
            }

            if (tempToken) {
                Swal.fire({
                    icon: 'info',
                    title: 'OTP Verification Required',
                    text: 'Please verify your login with the OTP sent to your email.',
                }).then(() => {
                    navigate('/verify-otp');
                    localStorage.removeItem('tempToken');
                });
                return;
            }

            try {
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.data.is_verified) {
                    localStorage.removeItem('token');
                    Swal.fire({
                        icon: 'error',
                        title: 'Access Denied',
                        text: 'Please verify your account to access this page.',
                    }).then(() => {
                        navigate('/signin');
                    });
                }
            } catch (err) {
                localStorage.removeItem('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Session Expired',
                    text: 'Your session has expired. Please sign in again.',
                }).then(() => {
                    navigate('/signin');
                });
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div className="feed-container">
            <h2>Welcome to your Feed</h2>
            {/* Add your feed content here */}
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
        </div>
    );
};

export default Feed;
