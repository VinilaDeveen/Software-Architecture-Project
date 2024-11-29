import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';

export default function DocumentView() {
    const { isAuthenticated, jwtToken } = useAuth();
    const { id } = useParams();
    const [date, setDate] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: '',
    });
    const [errors, setErrors] = useState({
        title: false,
        url: false,
        description: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            loadDocumentDetails();
        }
    }, [isAuthenticated, id]);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    const loadDocumentDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/document/findById/${id}`, config);
            setFormData({
                title: response.data.title || '',
                url: response.data.url || '',
                description: response.data.description || '',
            });
            setDate(response.data.date);
        } catch (error) {
            console.error('Error fetching the document details!', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: false,
        });
    };

    const validateForm = () => {
        const newErrors = {
            title: !formData.title.trim(),
            url: !formData.url.trim(),
            description: !formData.description.trim(),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await axios.put(
                    `http://localhost:8080/api/v1/document/updateById/${id}`,
                    formData,
                    config
                );
                console.log('Document updated successfully:', response.data);
                navigate('/documenttable');
            } catch (error) {
                console.error('Error updating the document:', error.response || error.message);
                alert('Failed to update the document. Please try again later.');
            }
        }
    };

    return (
        <div className="flex">
            <div>
                <Sidebar />
            </div>
            <div className="w-full">
                <div className="p-10 shadow-xl rounded-lg text-slate-600 m-10">
                    <div className="flex flex-nowrap">
                        <div>
                            <span className="font-extrabold text-xl mx-5">Document Information</span>
                        </div>
                        <div className="px-10">
                            <ArticleIcon sx={{ fontSize: 100 }} />
                        </div>
                        <div className="info">
                          <div>
                            <span className="font-bold">ID: </span>
                            <span>{id}</span>
                          </div>

                          <div>
                            <span className="font-bold">title: </span>
                            <span>{formData.title}</span>
                          </div>

                          <div>
                            <span className="font-bold">Url: </span>
                            <span>{formData.url}</span>
                          </div>

                          <div>
                            <span className="font-bold">Date: </span>
                            <span>{date}</span>
                          </div>

                          <div>
                            <span className="font-bold">Description: </span>
                            <span>{formData.description}</span>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="p-20 shadow-xl rounded-lg text-slate-600 mx-10">
                    <div className="title">
                        <span className="font-extrabold text-xl">Update Information</span>
                    </div>
                    <div className="flex flex-wrap grid gap-4 grid-cols-2 mt-5">
                        <div>
                            <label className="flex">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter title"
                                className={`border-b-2 w-full pt-2 outline-none placeholder:text-slate-400 ${
                                    errors.title ? 'border-red-500' : 'border-slate-400'
                                }`}
                            />
                            {errors.title && <span className="text-red-500">Title is required.</span>}
                        </div>

                        <div>
                            <label className="flex">URL</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                placeholder="Enter URL"
                                className={`border-b-2 w-full pt-2 outline-none placeholder:text-slate-400 ${
                                    errors.url ? 'border-red-500' : 'border-slate-400'
                                }`}
                            />
                            {errors.url && <span className="text-red-500">URL is required.</span>}
                        </div>

                        <div>
                            <label className="flex">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter description"
                                className={`border-b-2 w-full pt-2 outline-none placeholder:text-slate-400 ${
                                    errors.description ? 'border-red-500' : 'border-slate-400'
                                }`}
                            />
                            {errors.description && <span className="text-red-500">Description is required.</span>}
                        </div>

                        <div></div>

                        <div>
                            <input
                                type="button"
                                value="Save"
                                className="flex bg-slate-700 text-slate-50 mt-10 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900 cursor-pointer"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
