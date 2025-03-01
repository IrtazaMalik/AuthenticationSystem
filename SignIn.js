import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Import the updated CSS file

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
            localStorage.setItem('tempToken', res.data.token);
            localStorage.setItem('userName', res.data.userName); // Store the name in local storage
            localStorage.setItem('origin', 'signin');
            setMessage('Sign in successful!');
            navigate('/verify-otp'); // Redirect to feed page on success
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Sign in failed';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-container">
                <h2 className="signin-title">Welcome Back</h2>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="signin-btn">
                        Sign In
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default SignIn;
