import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UploadDocument() {
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // 👈 file input ref

    useEffect(() => {
        const fetchUserId = async () => {
            const username = JSON.parse(localStorage.getItem('user'));
            if (!username) return;

            try {
                const response = await axios.get(`http://localhost:8080/api/users/name/${username}`);
                setUserId(response.data.id);
            } catch (error) {
                console.error("Failed to fetch user ID", error);
            }
        };

        fetchUserId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setIsSuccess(false);

        if (!userId) {
            setStatusMessage("User ID not loaded. Try again later.");
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        tags.split(',').forEach(tag => {
            formData.append('tags', tag.trim());
        });

        try {
            await axios.post('http://localhost:8080/api/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatusMessage('Upload successful!');
            setIsSuccess(true);
            setTitle('');
            setDescription('');
            setFile(null);
            setTags('');
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // 👈 reset file input
            }
        } catch (error) {
            setStatusMessage('Upload failed. Please try again.');
            setIsSuccess(false);
            console.error(error);
        }
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Upload Course</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/uploads')}>Back</button>
            </div>

            {statusMessage && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>{statusMessage}</div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <input
                        type="description"
                        className="form-control"
                        placeholder="Course Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                        ref={fileInputRef} // 👈 attach ref
                        required
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags (comma-separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">Upload Course</button>
            </form>
        </div>
    );
}

export default UploadDocument;