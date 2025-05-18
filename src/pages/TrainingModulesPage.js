import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TrainingModulesPage.css';
import axios from 'axios';
import hamburgerIcon from '../images/menu.png';
import { FaFilePdf, FaFileImage, FaVideo, FaFileAlt } from 'react-icons/fa';
import Chatbot from '../components/Chatbox';

function TrainingModulesPage() {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [isManager, setIsManager] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [tags, setTags] = useState([]);
    const [showAllTags, setShowAllTags] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchModules = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/documents/');
            setModules(response.data);
            if (response.data.length > 0) {
                handleModuleClick(response.data[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tags');
            setTags(response.data);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        }
    };

    const handleSearch = async () => {
        const hasTags = selectedTags.length > 0;
        const hasSearch = searchQuery.trim() !== "";

        try {
            if (!hasTags && !hasSearch) {
                // No tags, no search: GET all modules
                fetchModules();
            } else if (hasSearch) {
                // Search: GET request to search modules - this includes both tags and content
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/documents/search?keyword=${encodeURIComponent(searchQuery.trim())}`
                    );
                    setModules(response.data);
                    if (response.data.length > 0) {
                        handleModuleClick(response.data[0].id);
                    } else {
                        setSelectedModule(null); // Clear module details if no modules found
                    }
                } catch (error) {
                    alert('Search failed.');
                    console.error("Search error:", error);
                }
            } else if (hasTags) {
                // Tags only: POST request to filter modules by tags
                try {
                    const response = await axios.post(
                        'http://localhost:8080/api/documents/filter',
                        selectedTags
                    );
                    setModules(response.data);
                    if (response.data.length > 0) {
                        handleModuleClick(response.data[0].id);
                    } else {
                        setSelectedModule(null); // Clear module details if no modules found
                    }
                } catch (error) {
                    alert('Failed to filter by tags.');
                    console.error("Error filtering by tags:", error);
                }
            } 
        } catch (error) {
            alert('An unexpected error occurred.');
            console.error("Unexpected error in handleSearch:", error);
        }
    };

    const handleModuleClick = async (moduleId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/documents/${moduleId}`);
            console.log("Fetched module with tags:", response.data);
            setSelectedModule(response.data);
        } catch (error) {
            console.error("Failed to fetch module details:", error);
        }
    };

    const handleTagClick = (tagName) => {
        const newSelectedTags = selectedTags.includes(tagName)
            ? selectedTags.filter(t => t !== tagName)
            : [...selectedTags, tagName];

        setSelectedTags(newSelectedTags);
    };

    function getFileTypeIcon(fileType) {
        if (!fileType) return <FaFileAlt className="file-icon text-secondary" />;

        if (fileType.includes('pdf')) {
            return <FaFilePdf className="file-icon text-danger" />;
        } else if (fileType.includes('image')) {
            return <FaFileImage className="file-icon text-primary" />;
        } else if (fileType.includes('video/mp4')) {
            return <FaVideo className="file-icon text-info" />;
        } else if (fileType.includes('quicktime') || fileType.includes('avi')) {
            return <FaVideo className="file-icon text-warning" />;
        } else if (fileType.includes('plain')) {
            return <FaFileAlt className="file-icon text-muted" />; // .txt
        } else if (fileType.includes('msword') || fileType.includes('officedocument')) {
            return <FaFileAlt className="file-icon text-primary" />; // .doc, .docx
        } else {
            return <FaFileAlt className="file-icon text-secondary" />;
        }
    }

    useEffect(() => {
        fetchModules();
        fetchTags();

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

    useEffect(() => {
        // Call handleSearch whenever searchQuery or selectedTags changes
        handleSearch();
    }, [selectedTags, searchQuery]);

    return (
        <div className="modules-layout">
            {sidebarOpen && (
                <div className="sidebar-inner p-4">
                    <nav className="nav flex-column">
                        <Link className="nav-link" to="/main">Home</Link>
                        <Link className="nav-link" to="/organization">People & groups</Link>
                        <Link className="nav-link active" to="/modules">My courses</Link>
                        <Link className="nav-link" to="#">FAQs</Link>
                        {isManager && <Link className="nav-link" to="/uploads">My uploads</Link>}
                    </nav>
                </div>
            )}
            <Chatbot />
            <div className="modules-main-content">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <img
                            src={hamburgerIcon}
                            alt="menu"
                            className="hamburger-icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        />
                        <h4 className="ms-3">Browse Training Modules</h4>
                    </div>

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

                {/* Tag buttons */}
                <div className="d-flex flex-wrap mb-4">
                    {tags.slice(0, showAllTags ? tags.length : 8).map((tag, index) => (
                        <button
                            key={index}
                            className={`btn btn-sm me-2 mb-2 ${selectedTags.includes(tag.name) ? 'btn-primary' : 'btn-light'}`}
                            style={{ borderRadius: '20px' }}
                            onClick={() => handleTagClick(tag.name)}
                        >
                            {tag.name}
                        </button>
                    ))}
                    {tags.length > 8 && (
                        <button
                            className="btn btn-outline-secondary btn-sm mb-2"
                            style={{ borderRadius: '20px' }}
                            onClick={() => setShowAllTags(prev => !prev)}
                        >
                            {showAllTags ? 'Show Less' : 'View All'}
                        </button>
                    )}
                </div>

                <div className="modules-content-sections">
                    {/* Modules list */}
                    <div className="modules-list bg-white rounded p-4">
                        {modules.length === 0 ? (
                            <p>Sorry, no materials found!</p>
                        ) : (
                            modules.map(module => (
                                <div
                                    key={module.id}
                                    className={`card mb-3 ${selectedModule?.id === module.id ? 'border-primary' : ''}`}
                                    style={{ cursor: 'pointer', borderRadius: '12px' }}
                                    onClick={() => handleModuleClick(module.id)}
                                >
                                    <div className="row g-0">
                                        <div className="col-4">
                                            {getFileTypeIcon(module.fileType)}
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h6 className="card-title">{module.title}</h6>
                                                <p className="card-text small text-muted">{module.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Module Details */}
                    {modules.length > 0 && (
                        <div className="modules-details d-flex flex-column align-items-center p-4">
                            {selectedModule ? (
                                <>
                                     <div className="d-flex align-items-center mb-3">
                                        {getFileTypeIcon(selectedModule.fileType)}
                                        <h4 className="ms-3">{selectedModule.title}</h4>
                                    </div>
                                    <p
                                        className={`fw-bold ${isCompleted ? 'text-success' : 'text-danger'}`}
                                        style={{ fontSize: '0.9rem' }}
                                    >
                                        {isCompleted ? 'Completed' : 'In progress'}
                                    </p>
                                    <div className="d-flex justify-content-center mb-3">
                                        <span className="me-4">🕑 15m</span>
                                    </div>
                                    <div style={{ maxWidth: '500px' }}>
                                        <h5>Description</h5>
                                        <p>{selectedModule.description || 'No description available.'}</p>

                                        <h5>Course Overview</h5>
                                        <p>{selectedModule.content || 'No content available.'}</p>

                                        <h5>Tags</h5>
                                        <div className="d-flex flex-wrap mb-3">
                                            {selectedModule.tags && selectedModule.tags.length > 0 ? (
                                                selectedModule.tags.map((tag, index) => (
                                                    <button
                                                        key={index}
                                                        className="btn btn-sm me-2 mb-2 btn-light"
                                                        style={{ borderRadius: '20px', pointerEvents: 'none', opacity: 1 }}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                ))
                                            ) : (
                                                <p className="text-muted">No tags available.</p>
                                            )}
                                        </div>
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrainingModulesPage;
