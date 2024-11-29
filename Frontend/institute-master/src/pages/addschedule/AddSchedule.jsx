import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Sidebar from '../../component/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function AddSchedule() {
    const navigate = useNavigate();
    const { jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    const [formData, setFormData] = useState({
        date: "",
        time_from: "",
        time_to: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        date: false,
        time_from: false,
        time_to: false,
        description: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: false, // Reset error for the specific field
        });
    };

    const validateForm = () => {
        const newErrors = {
            date: !formData.date,
            time_from: !formData.time_from,
            time_to: !formData.time_to,
            description: !formData.description,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error); // Return false if any field has an error
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const data = {
                    date: formData.date,
                    time_from: formData.time_from,
                    time_to: formData.time_to,
                    description: formData.description
                };

                const response = await axios.post(
                    `http://localhost:8080/api/v1/schedule`,
                    data,
                    config
                );

                console.log('Schedule created successfully:', response.data);
                navigate(`/scheduletable`);
            } catch (error) {
                console.error("Error creating the schedule:", error.response || error.message);
                alert("Failed to add schedule. Please try again later.");
            }
        }
    };

    return (
        <div className='flex'>
            <div>
                <Sidebar />
            </div>
            <div className='w-full px-20'>
                <div>
                    <span className='font text-3xl text-slate-600 mx-5'>Add Schedule</span>
                </div>
                <div className='flex m-5 shadow-2xl rounded-3xl w-full'>
                    <div className='my-40'>
                        <CalendarMonthIcon
                            sx={{ fontSize: { xs: 60, sm: 100, md: 150 } }}
                            className='text-slate-800 mx-4 my-10 sm:mx-20 sm:my-20 md:m-20 md:my-20'
                        />
                    </div>
                    <div className='p-10 w-full'>
                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>Date:</label>
                            <input
                                type="date"
                                name='date'
                                onChange={handleInputChange}
                                placeholder="DD/MM/YYYY"
                                className={`border-b-2 w-full pt-3 outline-none ${errors.date ? 'border-red-500' : 'border-slate-300'}`}
                            />
                            {errors.date && <span className='text-red-500'>Date is required.</span>}
                        </div>

                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>Time From:</label>
                            <input
                                type="time"
                                name='time_from'
                                onChange={handleInputChange}
                                placeholder="HH:MM"
                                className={`border-b-2 w-full pt-3 outline-none ${errors.time_from ? 'border-red-500' : 'border-slate-300'}`}
                            />
                            {errors.time_from && <span className='text-red-500'>Time from is required.</span>}
                        </div>

                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>Time To:</label>
                            <input
                                type="time"
                                name='time_to'
                                onChange={handleInputChange}
                                placeholder="HH:MM"
                                className={`border-b-2 w-full pt-3 outline-none ${errors.time_to ? 'border-red-500' : 'border-slate-300'}`}
                            />
                            {errors.time_to && <span className='text-red-500'>Time to is required.</span>}
                        </div>

                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>Description:</label>
                            <input
                                type="text"
                                name='description'
                                onChange={handleInputChange}
                                placeholder="Enter description"
                                className={`border-b-2 w-full pt-3 outline-none ${errors.description ? 'border-red-500' : 'border-slate-300'}`}
                            />
                            {errors.description && <span className='text-red-500'>Description is required.</span>}
                        </div>

                        <div className='w-full'>
                            <input
                                type="button"
                                value="Save"
                                className='flex bg-slate-800 text-slate-50 mt-20 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900'
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSchedule;
