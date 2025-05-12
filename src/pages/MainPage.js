import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/MainPage.css';
import profilePicture from "../images/user.png";
import hamburgerIcon from '../images/menu.png';
import userIcon from '../images/user.png';
import axios from "axios";

function MainPage() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isManager, setIsManager] = useState(false);
    
    const [userData, setUserData] = useState(null);
    const [colleagues, setColleagues] = useState([]);

    const [documents, setDocuments] = useState([]);
    const [completedDocIds, setCompletedDocIds] = useState(new Set());
    const [tagStats, setTagStats] = useState({});
    const [loadingTags, setLoadingTags] = useState(true);

    const handleLogout = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (user) {
        axios.get(`http://localhost:8080/api/users/name/${user}`)
            .then(response => {
                const currentUser = response.data;
                setUserData(currentUser);

                if (response.data.userType === 'MANAGER') {
                    setIsManager(true);
                }

                axios.get(`http://localhost:8080/api/users`)
                .then(res => {
                    const sameDepartmentUsers = res.data.filter(u =>
                        u.departmentType === currentUser.departmentType &&
                        u.id !== currentUser.id // exclude self
                    );
                    setColleagues(sameDepartmentUsers);
                })
                .catch(err => {
                    console.error("Error fetching all users:", err);
                });

                // Fetch all documents
                axios.get('http://localhost:8080/api/documents/')
                .then(docRes => {
                    const allDocs = docRes.data;
                    setDocuments(allDocs);

                    // Fetch completed documents for current user
                    const completionChecks = allDocs.map(doc =>
                        axios.get(`http://localhost:8080/api/completed/isCompleted?userId=${currentUser.id}&documentId=${doc.id}`)
                            .then(res => ({ docId: doc.id, completed: res.data }))
                    );

                    Promise.all(completionChecks).then(results => {
                        const completedSet = new Set(
                            results.filter(r => r.completed).map(r => r.docId)
                        );
                        setCompletedDocIds(completedSet);

                        // Build tag stats
                        const stats = {};
                        allDocs.forEach(doc => {
                            doc.tags.forEach(tag => {
                                if (!stats[tag.name]) {
                                    stats[tag.name] = { total: 0, completed: 0 };
                                }
                                stats[tag.name].total += 1;
                                if (completedSet.has(doc.id)) {
                                    stats[tag.name].completed += 1;
                                }
                            });
                        });
                        setTagStats(stats);
                        setLoadingTags(false);
                    });
                })
                .catch(err => {
                    console.error("Error fetching documents:", err);
                });
            })
            .catch(error => {
            console.error('Error fetching user data:', error);
            });
        }
    }, [user]);

    return (
        <div className="main-layout">
        {/* Sidebar */}
        {sidebarOpen && (
            <div className="sidebar-inner">
            <nav className="nav flex-column w-100 p-4">
                <Link className="nav-link active sidebar-link" to="#">Home</Link>
                <Link className="nav-link sidebar-link" to="/organization">People & groups</Link>
                <Link className="nav-link sidebar-link active-link" to="/modules">My courses</Link>
                <Link className="nav-link sidebar-link" to="#">FAQs</Link>
                {isManager && (
                <Link className="nav-link sidebar-link" to="/uploads">My uploads</Link>
                )}
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

            {/* Center + Right Panel */}
            <div className="content-sections">
            {/* Left panel */}
            <div className="content-left">
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

                <br/>
                <h5>My Progress Overview</h5>
                <div className="d-flex justify-content-around mt-3 flex-wrap gap-3">
                <div className="text-center p-3 rounded shadow-sm" style={{ backgroundColor: '#f5f5f5', width: '45%' }}>
                    <p>✅ Successfully completed</p>
                    <h5>{completedDocIds.size}</h5>
                </div>
                <div className="text-center p-3 rounded shadow-sm" style={{ backgroundColor: '#f5f5f5', width: '45%' }}>
                    <p>❌ Not completed</p>
                    <h5>{documents.length - completedDocIds.size}</h5>
                </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="content-right">
                <div className="mb-4">
                <h5>
                    Colleagues from {
                        userData && userData.departmentType
                            ? userData.departmentType
                            : "your"
                    } department
                </h5>
                {colleagues.length === 0 ? (
                    <p>No colleagues in your department at the moment.</p>
                ) : ( 
                    <ul className="list-unstyled">
                        {colleagues.map(colleague => (
                            <li key={colleague.id} className="mb-2 d-flex justify-content-between">
                                {colleague.name} {colleague.userType === 'MANAGER' && <span className="badge bg-info text-dark">Manager</span>}
                            </li>
                        ))}
                    </ul>
                )}
                </div>
                <div>
                <br/>    
                <h5>Learning Topics Overview</h5>
                {loadingTags ? (
                    <p>Loading tag stats...</p>
                ) : (
                    <ul className="list-unstyled">
                        {Object.entries(tagStats).map(([tag, { total, completed }]) => {
                            const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
                            return (
                                <li key={tag} className="mb-2">
                                    <strong>{tag}</strong>: {completed}/{total} completed ({percentage}%)
                                </li>
                            );
                        })}
                    </ul>
                )}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default MainPage;