import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginBackground from "../../images/login.png";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // reset error

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/main');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Invalid email or password. Please try again.');
            } else {
                setErrorMessage('Incorrect credentials. Please try again.');
            }
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: '#FFFFFF'
            }}
        >
            <div className="position-absolute top-0 w-100 text-center mt-3">
                <h6 style={{ color: '#a569ff', fontWeight: 'bold', letterSpacing: '2px' }}>I KNOW IT ALL</h6>
            </div>

            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
                <h3 className="text-center mb-2">Login</h3>
                <p className="text-center mb-4 text-muted">Enter your credentials</p>

                {/* Error message */}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Email"
                            style={{ backgroundColor: '#c97bff', border: 'none', color: 'white' }}
                            required
                        />
                    </div>

                    <div className="mb-4">
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

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: '#e2ccff', color: 'black' }}
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <a href="/register" style={{ color: '#a569ff', fontWeight: 'bold', textDecoration: 'none' }}>
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
