// create a component to verify OTP
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VerifyOtp.css';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tempToken = localStorage.getItem('tempToken');
            if (!tempToken) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Temporary token not found',
                });
                throw new Error('Temporary token not found');
            }

            try {
                const res = await axios.post(
                    'http://localhost:5000/api/auth/verify-otp',
                    { otp },
                    { headers: { Authorization: `Bearer ${tempToken}` } }
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'OTP verified successfully',
                });

                localStorage.setItem('token', res.data.token);
                localStorage.removeItem('tempToken');

                const origin = localStorage.getItem('origin');
                if (origin === 'signin') {
                    localStorage.removeItem('origin');
                    navigate('/feed');
                } else {
                    navigate('/signin');
                }
            } catch (err) {
                console.error(err);
                setMessage(err.response.data.msg);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.msg,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="verify-otp-container">
            <div className="verify-otp-form">
                <h2>Verify OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="signup-btn">
                            Verify
                        </button>
                    </div>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
