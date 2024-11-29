import React, { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function ScheduleView() {
  const { isAuthenticated, jwtToken } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    time_from: '',
    time_to: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    date: false,
    time_from: false,
    time_to: false,
    description: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      loadScheduleDetails();
    }
  }, [isAuthenticated, id]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadScheduleDetails() {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/schedule/${id}`, config);
      setFormData({
        date: response.data.date,
        time_from: response.data.time_from,
        time_to: response.data.time_to,
        description: response.data.description,
      });
    } catch (error) {
      console.error('Error fetching schedule details:', error);
    }
  }

  const validateForm = () => {
    const newErrors = {
      date: !formData.date,
      time_from: !formData.time_from,
      time_to: !formData.time_to,
      description: !formData.description,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/schedule/${id}`,
          formData,
          config
        );
        console.log('Schedule updated successfully:', response.data);
        navigate('/scheduletable');
      } catch (error) {
        console.error('Error updating schedule:', error);
        alert('Failed to update the schedule. Please try again.');
      }
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
      [name]: false, // Reset error for the specific field
    });
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
              <span className="font-extrabold text-xl mx-5">Schedule Information</span>
            </div>
            <div className="px-10">
              <CalendarMonthIcon sx={{ fontSize: 100 }} />
            </div>
            <div className="info">
                <div>
                  <span className='font-bold'>ID: </span>
                  <span>{id}</span>
                </div>

                <div>
                  <span className='font-bold'>Date: </span>
                  <span>{formData.date}</span>
                </div>

                <div>
                  <span className='font-bold'>Time from: </span>
                  <span>{formData.time_from}</span>
                </div>

                <div>
                  <span className='font-bold'>Time to: </span>
                  <span>{formData.time_to}</span>
                </div>

                <div>
                  <span className='font-bold'>Description: </span>
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
            {['date', 'time_from', 'time_to', 'description'].map((field) => (
              <div key={field}>
                <label className="flex capitalize">{field.replace('_', ' ')}</label>
                <input
                  type={field.includes('time') ? 'time' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={`border-b-2 w-full pt-2 outline-none ${
                    errors[field] ? 'border-red-500' : 'border-slate-400'
                  }`}
                />
                {errors[field] && (
                  <span className="text-red-500">{field.replace('_', ' ')} is required.</span>
                )}
              </div>
            ))}
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

export default ScheduleView;
