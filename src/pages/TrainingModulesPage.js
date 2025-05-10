import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TrainingModulesPage.css';
import axios from 'axios';

function TrainingModulesPage() {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [isManager, setIsManager] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const fetchModules = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/documents/');
            setModules(response.data);
            setSelectedModule(response.data[0] || null);
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchModules();
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/documents/search?keyword=${encodeURIComponent(searchQuery)}`);
            setModules(response.data);
            setSelectedModule(response.data[0] || null);
        } catch (error) {
            alert('Search failed.');
            console.error("Search error:", error);
        }
    };

    useEffect(() => {
        fetchModules();
        if (user) {
            axios.get(`http://localhost:8080/api/users/name/${user}`)
                .then(res => {
                    if (res.data.userType === 'MANAGER') setIsManager(true);
                    setUserId(res.data.id);
                })
                .catch(err => console.error('User type fetch error:', err));
        }
    }, []);

    // Check if selected module is completed by this user
    useEffect(() => {
        if (selectedModule?.id && userId) {
            axios.get(`http://localhost:8080/api/completed/isCompleted`, {
                params: {
                    userId: userId,
                    documentId: selectedModule.id
                }
            })
            .then(res => {
                setIsCompleted(res.data);
            })
            .catch(err => {
                console.error("Check completion error:", err);
            });
        }
    }, [selectedModule, userId]);

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f2efff', minHeight: '100vh' }}>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2">
                    <nav className="nav flex-column">
                        <Link className="nav-link" to="/main">Home</Link>
                        <Link className="nav-link" to="#">Me</Link>
                        <Link className="nav-link" to="#">People & groups</Link>
                        <Link className="nav-link active" to="/modules">My courses</Link>
                        <Link className="nav-link" to="#">FAQs</Link>
                        {isManager && (
                            <Link className="nav-link" to="/uploads">My uploads</Link>
                        )}
                    </nav>
                </div>

                {/* Modules list */}
                <div className="col-md-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Browse Training Modules</h4>
                        <div className="d-flex w-50">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-light btn-sm" style={{ borderRadius: '20px' }} onClick={handleSearch}>Search</button>
                        </div>
                    </div>

                    {modules.map(module => (
                        <div
                            key={module.id}
                            className={`card mb-3 ${selectedModule?.id === module.id ? 'border-primary' : ''}`}
                            style={{ cursor: 'pointer', borderRadius: '12px' }}
                            onClick={() => setSelectedModule(module)}
                        >
                            <div className="row g-0">
                                <div className="col-4">
                                    <img src="/images/placeholder.png" alt="Preview" className="img-fluid rounded-start" />
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h6 className="card-title">{module.title}</h6>
                                        <p className="card-text small text-muted">{module.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Module Details */}
                <div className="col-md-5 d-flex flex-column align-items-center p-4">
                    {selectedModule ? (
                        <>
                            <img
                                src="/images/placeholder.png"
                                alt={selectedModule.title}
                                className="img-fluid rounded mb-4"
                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                            />
                            <h4>{selectedModule.title}</h4>
                            <p className="text-danger">In progress</p>
                            <div className="d-flex justify-content-center mb-3">
                                <span className="me-4">🕑 15m</span>
                            </div>
                            <div style={{ maxWidth: '500px' }}>
                                <h5>Course Overview</h5>
                                <p>{selectedModule.content || 'No content available.'}</p>
                            </div>

                            <button
                                className="btn btn-dark w-50 mt-3"
                                style={{ borderRadius: '20px' }}
                                onClick={() => {
                                    if (selectedModule?.id) {
                                        const downloadUrl = `http://localhost:8080/api/documents/download/${selectedModule.id}`;
                                        window.open(downloadUrl, '_blank');
                                    } else {
                                        alert("No module selected.");
                                    }
                                }}
                            >
                                Download course
                            </button>

                            <button
                                className="btn btn-dark w-50 mt-3"
                                style={{ borderRadius: '20px' }}
                                disabled={isCompleted}
                                onClick={() => {
                                    if (!userId || !selectedModule?.id) return;

                                    axios.post(`http://localhost:8080/api/completed/mark`, null, {
                                        params: {
                                            userId: userId,
                                            documentId: selectedModule.id
                                        }
                                    }).then(() => {
                                        setIsCompleted(true);
                                    }).catch(err => {
                                        console.error("Mark completed error:", err);
                                    });
                                }}
                            >
                                {isCompleted ? "Completed" : "Mark as completed"}
                            </button>
                        </>
                    ) : (
                        <p>No module selected</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrainingModulesPage;