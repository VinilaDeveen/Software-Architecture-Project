import React, { useState, useEffect } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import Sidebar from '../../component/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function AddCard() {
  const { isAuthenticated, jwtToken } = useAuth();

  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function handleSubmit() {
    const data = {
      stu_id: studentId,
      stu_name: studentName,
      cardCreateDate: date,
    };

    if (studentId !== '' || studentName !== '' || !date == '') {
      const response = await axios
        .post(`http://localhost:8080/api/v1/card`, data, config)
        .then((response) => {
          console.log('document details updated:', response.data);
          navigate(`/cardtable`);
        })
        .catch((error) => {
          console.error('There was an error updating the document!', error);
          alert('There was an error updating the document!');
        });
    }
  }

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-20">
        <div>
          <span className="font text-3xl text-slate-600 mx-5">Add New Card</span>
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
              <label className="flex pt-8 text-lg text-slate-800">Student Id:</label>
              <input
                type="text"
                name="studentId"
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student's id"
                className="border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="w-full">
              <label className="flex pt-8 text-lg text-slate-800">Student Name:</label>
              <input
                type="text"
                name="studentName"
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student's Name"
                className="border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="w-full">
              <label className="flex pt-8 text-lg text-slate-800">Document date:</label>
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter document date"
                className="border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400"
              />
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
