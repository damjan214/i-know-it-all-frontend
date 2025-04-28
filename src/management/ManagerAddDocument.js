import React, { useState } from 'react';
// import axios from 'axios';
import '../App.css'; // Assuming styling is here

function ManagerAddDocument() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [materials, setMaterials] = useState([{ type: 'text', content: '' }]);

    const handleMaterialChange = (index, field, value) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index][field] = value;
        setMaterials(updatedMaterials);
    };

    const addMaterial = (type) => {
        setMaterials([...materials, { type: type, content: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCourse = {
            name: title,
            description: description,
            materials: materials
        };

        // axios.post('http://localhost:5000/api/projects', newCourse)
        //     .then(response => {
        //         alert('Course added successfully!');
        //         setTitle('');
        //         setDescription('');
        //         setMaterials([{ type: 'text', content: '' }]);
        //     })
        //     .catch(error => {
        //         console.error('Error adding course:', error);
        //     });
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Add New Course</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Course Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <h4 className="mt-4 mb-3">Course Materials</h4>

                {materials.map((material, index) => (
                    <div key={index} className="mb-3">
                        <select
                            className="form-select mb-2"
                            value={material.type}
                            onChange={(e) => handleMaterialChange(index, 'type', e.target.value)}
                        >
                            <option value="text">Text</option>
                            <option value="image">Image URL</option>
                            <option value="video">Video URL</option>
                        </select>
                        {material.type === 'text' ? (
                            <textarea
                                className="form-control"
                                placeholder="Enter text content..."
                                value={material.content}
                                onChange={(e) => handleMaterialChange(index, 'content', e.target.value)}
                                rows="3"
                                required
                            ></textarea>
                        ) : (
                            <input
                                type="url"
                                className="form-control"
                                placeholder={`Enter ${material.type} URL...`}
                                value={material.content}
                                onChange={(e) => handleMaterialChange(index, 'content', e.target.value)}
                                required
                            />
                        )}
                    </div>
                ))}

                <div className="d-flex justify-content-start gap-2 mb-4">
                    <button type="button" className="btn btn-secondary" onClick={() => addMaterial('text')}>Add Text</button>
                    <button type="button" className="btn btn-secondary" onClick={() => addMaterial('image')}>Add Image</button>
                    <button type="button" className="btn btn-secondary" onClick={() => addMaterial('video')}>Add Video</button>
                </div>

                <button type="submit" className="btn btn-success w-100">Create Course</button>
            </form>
        </div>
    );
}

export default ManagerAddDocument;
