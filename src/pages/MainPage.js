import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/MainPage.css';
import profilePicture from "../images/profile.png";
import axios from "axios";

function MainPage() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const [isManager, setIsManager] = useState(false);

    const handleLogout = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (user) {
            // Make API call to check user type
            axios.get(`http://localhost:8080/api/users/name/${user}`)
                .then(response => {
                    if (response.data.userType === 'MANAGER') {
                        setIsManager(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    return (
        <div className="container-fluid p-0" style={{ minHeight: '100vh', backgroundColor: '#f2efff' }}>
            <div className="row no-gutters">
                {/* Sidebar */}
                <div className="col-md-2 d-flex flex-column align-items-start p-4" style={{ backgroundColor: '#ffffff', minHeight: '100vh', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <nav className="nav flex-column w-100">
                        <Link className="nav-link active sidebar-link" to="#">Home</Link>
                        <Link className="nav-link sidebar-link" to="#">Me</Link>
                        <Link className="nav-link sidebar-link" to="#">People & groups</Link>
                        <Link className="nav-link sidebar-link active-link" to="/modules">My courses</Link> {/* Highlight Workspaces */}
                        <Link className="nav-link sidebar-link" to="#">FAQs</Link>
                        {isManager && (
                            <Link className="nav-link sidebar-link" to="/uploads">
                                My uploads
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Main content */}
                <div className="col-md-10 p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>I Know It All</h4>
                        <div className="d-flex align-items-center">
                            <button onClick={handleLogout} className="btn btn-danger ms-2">
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Center panel */}
                    <div className="row">
                        <div className="col-md-8">
                            <div className="text-center mb-4">
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="rounded-circle mb-3"
                                    width="100"
                                    height="100"
                                />
                                <h2>Welcome back, {user}!</h2>
                                <p>Access your onboarding courses here</p>
                            </div>

                            <div className="d-flex justify-content-around mb-4">
                                <div className="text-center">
                                    <h5>3</h5>
                                    <p>My Friends</p>
                                </div>
                                <div className="text-center">
                                    <h5>3</h5>
                                    <p>Courses in progress</p>
                                </div>
                            </div>

                            <h5>My Progress Overview</h5>
                            <div className="d-flex justify-content-around mt-3">
                                <div className="text-center p-3 rounded shadow-sm" style={{ backgroundColor: '#f5f5f5', width: '30%' }}>
                                    <p>✅ Successfully completed</p>
                                    <h5>5</h5>
                                </div>
                                <div className="text-center p-3 rounded shadow-sm" style={{ backgroundColor: '#f5f5f5', width: '30%' }}>
                                    <p>❌ Not completed</p>
                                    <h5>3</h5>
                                </div>
                                <div className="text-center p-3 rounded shadow-sm" style={{ backgroundColor: '#f5f5f5', width: '30%' }}>
                                    <p>🏆 Skills mastered</p>
                                    <h5>7</h5>
                                </div>
                            </div>
                        </div>

                        {/* Right panel */}
                        <div className="col-md-4">
                            <div className="mb-4">
                                <h6>Friends</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-2 d-flex justify-content-between">
                                        Alin Pop <button className="btn btn-sm btn-outline-primary">Message</button>
                                    </li>
                                    <li className="mb-2 d-flex justify-content-between">
                                        David Pap <button className="btn btn-sm btn-outline-primary">Message</button>
                                    </li>
                                    <li className="mb-2 d-flex justify-content-between">
                                        Ion <button className="btn btn-sm btn-outline-primary">Message</button>
                                    </li>
                                </ul>
                                <button className="btn btn-primary w-100">Invite Colleagues</button>
                            </div>

                            <div>
                                <h6>Courses in Progress</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-3">
                                        <strong>Code of Conduct</strong> <br />
                                        <small>Progress: 45%</small>
                                    </li>
                                    <li className="mb-3">
                                        <strong>Workplace Safety</strong> <br />
                                        <small>Progress: 60%</small>
                                    </li>
                                    <li className="mb-3">
                                        <strong>Team Collaboration</strong> <br />
                                        <small>Progress: 35%</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;