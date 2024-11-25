import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';

export default function CardView() {
  const { isAuthenticated, jwtToken } = useAuth();
  const { id } = useParams();
  const [cardId, setCardId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadCardDetails();
    }
  }, [isAuthenticated, id, studentId]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadCardDetails() {
    const response = await axios
      .get(`http://localhost:8080/api/v1/card/${id}`, config)
      .then((response) => {
        setCardId(response.data.id);
        setStudentId(response.data.stu_id);
        setStudentName(response.data.stu_name);
        setDate(response.data.cardCreateDate);
      })
      .catch((error) => {
        console.error('There was an error fetching the Card details!', error);
      });
  }

  const handleSubmit = (e) => {
    const Card = {
      id: cardId,
      stu_id: studentId,
      stu_name: studentName,
      cardCreateDate: date,
    };
    setCard(Card);
    const response = axios
      .put(`http://localhost:8080/api/v1/card`, Card, config)
      .then((response) => {
        console.log('Card details upstudentIdd:', response.data);
        window.location.reload;
      })
      .catch((error) => {
        console.error('There was an error updating the Card!', error);
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
              <span className="font-extrabold text-xl mx-5">Card Information</span>
            </div>
            <div className="px-10">
              <ArticleIcon sx={{ fontSize: 100 }} />
            </div>
            <div className="info">
              <div>
                <span className="font-bold">Student ID: </span>
                <span>{id}</span>
              </div>

              <div>
                <span className="font-bold">Student Name: </span>
                <span>{studentName}</span>
              </div>

              <div>
                <span className="font-bold">Date: </span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-20 shadow-xl rounded-lg text-slate-600 mx-10">
          <div className="studentId">
            <span className="font-extrabold text-xl">UpstudentId Information</span>
          </div>
          <div className="flex flex-wrap grid gap-4 grid-cols-2 mt-5">
            <div>
              <label className="flex">student Id</label>
              <input
                type="studentId"
                name="studentId"
                value={id}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student id"
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="flex">student Name</label>
              <input
                type="text"
                name="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student name"
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="flex">studen tName</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Student name"
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
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
