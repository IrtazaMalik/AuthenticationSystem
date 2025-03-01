import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the new CSS file

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            localStorage.setItem('token', res.data.token);
            setMessage('Sign up successful!');
            navigate('/verify-email'); // Redirect to verify email page after signup
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Sign up failed';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
