import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrganizationPage.css';
import hamburgerIcon from '../images/menu.png';
import userIcon from '../images/user.png';
import Chatbot from '../components/Chatbox';

function OrganizationPage() {
    const [usersByDepartment, setUsersByDepartment] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedDept, setSelectedDept] = useState('');
    const [expandedManagers, setExpandedManagers] = useState({});
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const [isManager, setIsManager] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleLogout = () => {
        navigate('/login');
    };


    const toggleManager = (id) => {
        setExpandedManagers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        
        if (user) {
            axios.get(`http://localhost:8080/api/users/name/${user}`)
                .then(res => {
                    if (res.data.userType === 'MANAGER') setIsManager(true);
                    setUserId(res.data.id);
                })
                .catch(err => console.error('User type fetch error:', err));
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                const users = response.data;
                const grouped = {};

                users.forEach(user => {
                    const dept = user.departmentType || "Unassigned";
                    if (!grouped[dept]) grouped[dept] = [];
                    grouped[dept].push(user);
                });

                setUsersByDepartment(grouped);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const departments = Object.keys(usersByDepartment).sort();

    return (
        <div className="main-layout">
            <Chatbot />
            {/* Sidebar */}
            {sidebarOpen && (
                <div className="sidebar-inner p-4">
                    <nav className="nav flex-column">
                        <Link className="nav-link" to="/main">Home</Link>
                        <Link className="nav-link active" to="/organization">People & groups</Link>
                        <Link className="nav-link" to="/modules">My courses</Link>
                        <Link className="nav-link" to="/faq">FAQs</Link>
                        {isManager && <Link className="nav-link" to="/uploads">My uploads</Link>}
                    </nav>
                </div>
            )}

            {/* Main content */}
            <div className="main-content">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <img
                            src={hamburgerIcon}
                            alt="menu"
                            className="hamburger-icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        />
                        <h4>I Know It All</h4>
                    </div>
                    <div className="user-dropdown-wrapper" onClick={() => setShowDropdown(prev => !prev)}>
                        <img src={userIcon} alt="User" className="user-icon" />
                        {showDropdown && (
                            <div className="dropdown-menu-user">
                                <Link to="/account" className="dropdown-item">My Account</Link>
                                <div className="dropdown-item logout-item" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Organization View */}
                <div className="container py-4">
                    <h2 className="mb-4">📊 Organization Overview</h2>

                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        <>
                            {/* Department Selector */}
                            <div className="mb-4">
                                <label htmlFor="departmentSelect" className="form-label department-label">Select Department:</label>
                                <select
                                    id="departmentSelect"
                                    className="form-select department-select"
                                    value={selectedDept}
                                    onChange={e => setSelectedDept(e.target.value)}
                                >
                                    <option value="">-- All Departments --</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>


                            {/* Hierarchical View */}
                            {departments
                                .filter(dept => !selectedDept || dept === selectedDept)
                                .map(dept => {
                                    const users = usersByDepartment[dept];
                                    const managers = users.filter(u => u.userType === 'MANAGER');
                                    const employees = users.filter(u => u.userType !== 'MANAGER');

                                    return (
                                        <div key={dept} className="mb-5">
                                            <h4 className="mb-3" style={{ color: '#6b4eff' }}>{dept} Department</h4>

                                            {/* Managers */}
                                            {managers.length === 0 ? (
                                                <p><em>No managers in this department.</em></p>
                                            ) : (
                                                managers.map(manager => (
                                                    <div key={manager.id} className="mb-4">
                                                        <div
                                                            className="card border-info shadow-sm clickable"
                                                            onClick={() => toggleManager(manager.id)}
                                                        >
                                                            <div className="card-body bg-info text-black d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <h5 className="card-title mb-0">{manager.name}</h5>
                                                                    <small>Manager</small>
                                                                </div>
                                                                <span style={{ fontSize: '1.2rem' }}>
                                                                    {expandedManagers[manager.id] ? '▲' : '▼'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {expandedManagers[manager.id] && (
                                                            <div className="ms-4 mt-2">
                                                                <h6 className="text-muted">Employees under {manager.name}:</h6>
                                                                <div className="row g-2">
                                                                    {employees.length === 0 ? (
                                                                        <p className="ms-3">No employees assigned.</p>
                                                                    ) : (
                                                                        employees.map(employee => (
                                                                            <div className="col-md-4" key={employee.id}>
                                                                                <div className="card h-100 shadow-sm">
                                                                                    <div className="card-body">
                                                                                        <h6 className="card-title mb-1">{employee.name}</h6>
                                                                                        <small className="text-secondary">Employee</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            )}

                                            {/* Employees shown if no managers */}
                                            {managers.length === 0 && employees.length > 0 && (
                                                <div className="ms-4 mt-2">
                                                    <h6 className="text-muted">Employees:</h6>
                                                    <div className="row g-2">
                                                        {employees.map(employee => (
                                                            <div className="col-md-4" key={employee.id}>
                                                                <div className="card h-100 shadow-sm">
                                                                    <div className="card-body">
                                                                        <h6 className="card-title mb-1">{employee.name}</h6>
                                                                        <small className="text-secondary">Employee</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrganizationPage;
