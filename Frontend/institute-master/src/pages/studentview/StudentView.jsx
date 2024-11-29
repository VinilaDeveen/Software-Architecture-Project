import React, { useEffect, useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function StudentView() {
  const { isAuthenticated, jwtToken } = useAuth();
  const { studId } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    studname: '',
    contactNo: '',
  });
  const [errors, setErrors] = useState({
    studname: false,
    contactNo: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      loadStudentDetails();
    }
  }, [isAuthenticated, studId]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadStudentDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/student/${studId}`,
        config
      );
      setFormData({
        id: response.data.id,
        studname: response.data.studName,
        contactNo: response.data.phoneNo,
      });
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      studname: !formData.studname.trim(),
      contactNo: !formData.contactNo.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/student/${studId}`,
          {
            studName: formData.studname,
            phoneNo: formData.contactNo,
          },
          config
        );
        console.log('Student details updated:', response.data);
        navigate('/studenttable');
      } catch (error) {
        console.error('Error updating student:', error);
        alert('Failed to update student. Please try again later.');
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
              <span className="font-extrabold text-xl mx-5">Student Information</span>
            </div>
            <div className="px-10">
              <PersonRoundedIcon sx={{ fontSize: 100 }} />
            </div>
            <div className="info">
              <div>
                <span className="font-bold">ID: </span>
                <span>{studId}</span>
              </div>
              <div>
                <span className="font-bold">Student ID: </span>
                <span>{formData.id}</span>
              </div>
              <div>
                <span className="font-bold">Name: </span>
                <span>{formData.studname}</span>
              </div>
              <div>
                <span className="font-bold">Phone no: </span>
                <span>{formData.contactNo}</span>
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
              <label className="flex">Name</label>
              <input
                type="text"
                name="studname"
                value={formData.studname}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`border-b-2 w-full pt-2 outline-none ${
                  errors.studname ? 'border-red-500' : 'border-slate-400'
                }`}
              />
              {errors.studname && <span className="text-red-500">Name is required.</span>}
            </div>
            <div>
              <label className="flex">Phone no</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                placeholder="Enter your phone no"
                className={`border-b-2 w-full pt-2 outline-none ${
                  errors.contactNo ? 'border-red-500' : 'border-slate-400'
                }`}
              />
              {errors.contactNo && (
                <span className="text-red-500">Contact number is required.</span>
              )}
            </div>
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

export default StudentView;
