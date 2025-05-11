import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function EditDocument() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [file, setFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

   useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/documents/${id}`);
                const { title, description, tags } = response.data;

                // Extract tag names from objects
                const tagNames = tags?.map(tag => tag.name).join(', ') || '';

                setTitle(title);
                setDescription(description);
                setTags(tagNames);
            } catch (error) {
                console.error('Error fetching document', error);
            }
        };
        fetchDocument();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setIsSuccess(false);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        tags.split(',').forEach(tag => formData.append('tags', tag.trim()));
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.put(`http://localhost:8080/api/documents/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatusMessage('Update successful!');
            setIsSuccess(true);
            setTimeout(() => navigate('/uploads'), 1000);
        } catch (error) {
            setStatusMessage('Update failed. Please try again.');
            setIsSuccess(false);
            console.error(error);
        }
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Edit Course</h1>
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
                        type="text"
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
                        ref={fileInputRef}
                    />
                    <small className="text-muted">Leave blank to keep existing file.</small>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags (comma-separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Update Course</button>
            </form>
        </div>
    );
}

export default EditDocument;
