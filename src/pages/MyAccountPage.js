import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MyAccountPage.css';
import defaultProfile from '../images/user.png';

function MyAccountPage() {
    const [userData, setUserData] = useState(null);
    const username = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (username) {
        axios.get(`http://localhost:8080/api/users/name/${username}`)
            .then(res => setUserData(res.data))
            .catch(err => console.error('Failed to fetch user info:', err));
        }
    }, [username]);

    return (
        <div className="account-page-container">
            <Link to="/main" className="back-button">
                Back
            </Link>
        <div className="account-card shadow">
            <div className="account-header text-center">
            <h2>My Account</h2>
            <p className="subtitle">Personal information and details</p>
            </div>

            <div className="account-body">
            <div className="profile-image-wrapper">
                <img
                src={defaultProfile} // Replace with uploaded image path if implemented
                alt="Profile"
                className="profile-image"
                />
            </div>

            {userData && (
                <div className="account-info">
                <div className="info-field">
                    <span className="label">Name:</span>
                    <span>{userData.name}</span>
                </div>
                <div className="info-field">
                    <span className="label">Email:</span>
                    <span>{userData.email}</span>
                </div>
                <div className="info-field">
                    <span className="label">Department:</span>
                    <span>{userData.departmentType || 'Not assigned'}</span>
                </div>
                <div className="info-field">
                    <span className="label">User Type:</span>
                    <span>{userData.userType}</span>
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
    );
}

export default MyAccountPage;
