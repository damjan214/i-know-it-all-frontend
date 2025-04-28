import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import '../App.css'; // Import styles

function MainPage() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/projects')
    //         .then(response => {
    //             setProjects(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching projects:', error);
    //         });
    // }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="main-page-container">
            {/* Jumbotron */}
            <div className="jumbotron custom-jumbotron mb-5 p-5 rounded">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="jumbotron-title">All Projects</h1>
                    <div className="d-flex align-items-center mt-3 mt-md-0">
                        <input
                            type="text"
                            className="form-control me-2 search-bar"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <a href="/login" className="btn btn-login">Login</a>
                    </div>
                </div>
            </div>

            {/* Projects */}
            <div className="row justify-content-center">
                {filteredProjects.map(project => (
                    <div key={project.id} className="col-md-4 mb-4 d-flex">
                        <div className="card project-card shadow-sm w-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title project-card-title">{project.name}</h5>
                                <p className="card-text project-card-text">{project.description}</p>
                                <a href={`/projects/${project.id}`} className="btn view-project-button">View Project</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
