
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EmailVerified.css'; // Import the CSS file for styling

const EmailVerified = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');

    const handleRedirect = () => {
        navigate('/signin');
    };

    return (
        <div className="email-verified-container">
            <div className="email-verified-form">
                {success ? (
                    <>
                        <h2>Email Verified Successfully</h2>
                        <p>Your email has been verified. You can now sign in to your account.</p>
                        <button onClick={handleRedirect} className="redirect-btn">
                            Go to Sign In
                        </button>
                    </>
                ) : (
                    <>
                        <h2>Invalid URL</h2>
                        <p>The URL looks broken or something went wrong. Please try again.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmailVerified;