import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(res.data.name);
                setBio(res.data.bio);
                if (res.data.profilePic) {
                    setProfilePicPreview(`http://localhost:5000/uploads/${res.data.profilePic}`);
                }
            } catch (err) {
                setError('Error loading profile. Please try again later.');
            }
        };
        fetchUserProfile();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        if (profilePic) formData.append('displayPic', profilePic);

        try {
            const res = await axios.post('http://localhost:5000/api/users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Profile updated successfully!');
            setError(null);
            localStorage.setItem('userName', res.data.name);
            navigate('/feed');
        } catch (err) {
            setError('Error updating profile. Please try again later.');
            setSuccess(null);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            const reader = new FileReader();
            reader.onloadend = () => setProfilePicPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="profile-picture-container">
                    <label className="upload-button">
                        {profilePicPreview ? (
                            <img 
                                src={profilePicPreview} 
                                alt="Profile Preview" 
                                className="profile-picture-preview"
                            />
                        ) : (
                            <span>Upload Photo</span>
                        )}
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            accept="image/*"
                        />
                    </label>
                </div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>
                <label>
                    Bio:
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="input-field"
                    />
                </label>
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
