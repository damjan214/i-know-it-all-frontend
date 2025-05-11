import React, { useState } from 'react';
import axios from 'axios';
import registerBackground from "../../images/login.png";
import {useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: '',
        departmentType: '',
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const userTypeOptions = ['EMPLOYEE', 'MANAGER'];
    const departmentTypeOptions = [
        'HR', 'RECRUITMENT', 'FINANCE', 'SALES', 'SOFTWARE',
        'DEVOPS', 'IT', 'OPS', 'ANALYSIS', 'PRODUCT', 'SECURITY'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);

            if (response.status === 200) {
                setIsSuccess(true);
                setStatusMessage('Registration successful!');
                setFormData({ name: '', email: '', password: '', userType: '', departmentType: '' });
                setTimeout(() => navigate('/login'), 1000);
            }
        } catch (error) {
            setIsSuccess(false);
            if (error.response && error.response.status === 400) {
                setStatusMessage('Registration failed. Please check your data.');
            } else {
                setStatusMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(${registerBackground})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: '#FFFFFF'
            }}
        >
            {/* Back button */}
            <div className="position-absolute top-0 start-0 p-3 mt-4">
                <a
                    href="/login"
                    className="btn btn-light"
                    style={{ backgroundColor: '#e2ccff', color: 'black', border: 'none', borderRadius: '10px' }}
                >
                    Back
                </a>
            </div>

            {/* Title */}
            <div className="position-absolute top-0 w-100 text-center mt-3">
                <h6 style={{ color: '#a569ff', fontWeight: 'bold', letterSpacing: '2px' }}>I KNOW IT ALL</h6>
            </div>

            {/* Card */}
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
                <h3 className="text-center mb-2">Create account</h3>
                <p className="text-center mb-4 text-muted">Enter your details</p>

                {/* Success/Error message */}
                {statusMessage && (
                    <div
                        className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}
                        role="alert"
                    >
                        {statusMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Name"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Email"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Password"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                            required
                        />
                    </div>

                    {/* Dropdown for User Type */}
                    <div className="mb-3">
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className="form-control"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                            required
                        >
                            <option value="">Select User Type</option>
                            {userTypeOptions.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dropdown for Department Type */}
                    <div className="mb-4">
                        <select
                            name="departmentType"
                            value={formData.departmentType}
                            onChange={handleChange}
                            className="form-control"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                            required
                        >
                            <option value="">Select Department</option>
                            {departmentTypeOptions.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: '#e2ccff', color: 'black' }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;