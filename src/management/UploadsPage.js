import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UploadsPage.css';
import axios from 'axios';
import hamburgerIcon from '../images/menu.png';

function UploadsPage() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const fetchCourses = async () => {
        const username = JSON.parse(localStorage.getItem('user'));
        if (!username) return;

        try {
        const userResponse = await axios.get(`http://localhost:8080/api/users/name/${username}`);
        const userId = userResponse.data.id;

        const coursesResponse = await axios.get(`http://localhost:8080/api/documents/user/${userId}`);
        setCourses(coursesResponse.data);
        } catch (error) {
        console.error("Failed to fetch courses", error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
        fetchCourses();
        return;
        }
        try {
        const response = await axios.get(`http://localhost:8080/api/documents/search?keyword=${encodeURIComponent(searchQuery)}`);
        setCourses(response.data);
        } catch (error) {
        alert('Search failed. Please try again.');
        console.error("Search error:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-document/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
        try {
            await axios.delete(`http://localhost:8080/api/documents/${id}`);
            fetchCourses();
        } catch (error) {
            alert('Failed to delete the course. Please try again.');
            console.error("Delete error:", error);
        }
        }
    };

    const handleAddCourse = () => {
        navigate('/add-document');
    };

    return (
        <div className="uploads-layout">
        {/* Sidebar */}
        {sidebarOpen && (
            <div className="sidebar-inner p-4">
            <nav className="nav flex-column">
                <Link className="nav-link sidebar-link" to="/main">Home</Link>
                <Link className="nav-link sidebar-link" to="#">People & groups</Link>
                <Link className="nav-link sidebar-link" to="/modules">My courses</Link>
                <Link className="nav-link sidebar-link" to="#">FAQs</Link>
                <Link className="nav-link sidebar-link active-link" to="/uploads">My uploads</Link>
            </nav>
            </div>
        )}

        {/* Main content */}
        <div className="uploads-main-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
                <img
                src={hamburgerIcon}
                alt="menu"
                className="hamburger-icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                />
                <h3 className="mb-0 ms-3">My Uploaded Courses</h3>
            </div>

            <div className="d-flex w-50">
                <input
                type="text"
                className="form-control me-2"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                />
                <button className="btn btn-light btn-sm me-2" style={{ borderRadius: '20px' }} onClick={handleSearch}>Search</button>
                <button className="btn btn-primary" onClick={handleAddCourse}>Add Course</button>
            </div>
            </div>

            {courses.map(course => (
            <div key={course.id} className="card mb-3 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title mb-1">{course.title}</h5>
                    <p className="card-text text-muted mb-1">{course.description}</p>
                </div>
                <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(course.id)}>
                    Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(course.id)}>
                    Delete
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default UploadsPage;
