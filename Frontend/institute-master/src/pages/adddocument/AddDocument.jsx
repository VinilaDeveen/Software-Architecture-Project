import React, { useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import Sidebar from '../../component/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function AddDocument() {
    const { jwtToken } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        title: false,
        url: false,
        description: false
    });

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const validateForm = () => {
        const newErrors = {
            title: !formData.title.trim(),
            url: !formData.url.trim(),
            description: !formData.description.trim()
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/api/v1/document/add`,
                    formData,
                    config
                );

                console.log('Document added successfully:', response.data);
                navigate(`/documenttable`);
            } catch (error) {
                console.error('Error adding the document:', error.response || error.message);
                alert('Failed to add document. Please try again later.');
            }
        }
    };

    return (
        <div className="flex">
            <div>
                <Sidebar />
            </div>
            <div className="w-full px-20">
                <div>
                    <span className="font text-3xl text-slate-600 mx-5">Add New Document</span>
                </div>
                <div className="flex m-5 shadow-2xl rounded-3xl w-full">
                    <div className="my-40">
                        <ArticleIcon
                            sx={{ fontSize: { xs: 60, sm: 100, md: 150 } }}
                            className="text-slate-800 mx-4 my-10 sm:mx-20 sm:my-20 md:m-20 md:my-20"
                        />
                    </div>

                    <div className="p-10 w-full">
                        <div className="w-full">
                            <label className="flex pt-8 text-lg text-slate-800">Document Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter document's title"
                                className={`border-b-2 w-full pt-3 outline-none ${
                                    errors.title ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.title && <span className="text-red-500">Document title is required.</span>}
                        </div>

                        <div className="w-full">
                            <label className="flex pt-8 text-lg text-slate-800">Document URL:</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                placeholder="Enter document's URL"
                                className={`border-b-2 w-full pt-3 outline-none ${
                                    errors.url ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.url && <span className="text-red-500">Document URL is required.</span>}
                        </div>

                        <div className="w-full">
                            <label className="flex pt-8 text-lg text-slate-800">Document Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter document description"
                                className={`border-b-2 w-full pt-3 outline-none ${
                                    errors.description ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.description && <span className="text-red-500">Document description is required.</span>}
                        </div>

                        <div className="w-full">
                            <input
                                type="button"
                                value="Save"
                                className="flex bg-slate-800 text-slate-50 mt-20 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
