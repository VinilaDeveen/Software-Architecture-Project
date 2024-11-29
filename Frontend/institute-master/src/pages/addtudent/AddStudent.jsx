import React, { useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Sidebar from '../../component/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function AddStudent() {
    const { jwtToken } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        studname: '',
        contactno: ''
    });

    const [errors, setErrors] = useState({
        id: false,
        studname: false,
        contactno: false
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
            id: !formData.id,
            studname: !formData.studname,
            contactno: !formData.contactno
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error); 
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const data = {
                    id: formData.id,
                    studName: formData.studname,
                    phoneNo: formData.contactno
                };

                const response = await axios.post(
                    `http://localhost:8080/api/v1/student`,
                    data,
                    config
                );

                console.log('Student added successfully:', response.data);
                navigate(`/studenttable`);
            } catch (error) {
                console.error('Error adding the student:', error.response || error.message);
                alert('Failed to add student. Please try again later.');
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
                    <span className="font text-3xl text-slate-600 mx-5">Add New Student</span>
                </div>
                <div className="flex m-5 shadow-2xl rounded-3xl w-full">
                    <div className="my-40">
                        <PersonRoundedIcon
                            sx={{ fontSize: { xs: 60, sm: 100, md: 150 } }}
                            className="text-slate-800 mx-4 my-10 sm:mx-20 sm:my-20 md:m-20 md:my-20"
                        />
                    </div>
                    <div className="p-10 w-full">
                        <div className="w-full">
                            <label className="flex pt-8 text-lg text-slate-800">Student ID:</label>
                            <input
                                type="text"
                                name="id"
                                onChange={handleInputChange}
                                placeholder="Enter student's ID"
                                className={`border-b-2 w-full pt-3 outline-none ${
                                    errors.id ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.id && <span className="text-red-500">Student ID is required.</span>}
                        </div>

                        <div className="w-full">
                            <label className="flex pt-8 text-lg text-slate-800">Student Name:</label>
                            <input
                                type="text"
                                name="studname"
                                onChange={handleInputChange}
                                placeholder="Enter student's name"
                                className={`border-b-2 w-full pt-3 outline-none ${
                                    errors.studname ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.studname && <span className="text-red-500">Student name is required.</span>}
                        </div>

                        <div className="w-full">
                            <label className="flex pt-8 text-lg text-slate-800">Contact No:</label>
                            <input
                                type="text"
                                name="contactno"
                                onChange={handleInputChange}
                                placeholder="Enter student's phone number"
                                className={`border-b-2 w-full pt-3 outline-none ${
                                    errors.contactno ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.contactno && <span className="text-red-500">Contact number is required.</span>}
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

export default AddStudent;
