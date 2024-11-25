import React, { useEffect, useState } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function StudentView() {
  const { isAuthenticated, jwtToken } = useAuth();
  const {studId} = useParams();
  const [id, setId] = useState('')
  const [studname, setStudName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated){
      loadStudentDetails();
    }
  },[isAuthenticated,studId])

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  async function loadStudentDetails() {
    const response = await axios.get(`http://localhost:8080/api/v1/student/${studId}`, config)
    .then( response => {
      setId(response.data.id);
      setStudName(response.data.studName);
      setContactNo(response.data.phoneNo);
    })
    .catch(error => {
      console.error("There was an error fetching the student details!", error);
    })
  }

  const handleSubmit = (e) => {
    const student = { studName: studname, phoneNo: contactNo };

    const response = axios.put(`http://localhost:8080/api/v1/student/${studId}`,student, config)
      .then(response => {
        navigate('/studenttable')
        console.log('Student details updated:', response.data);
    })
    .catch(error => {
        console.error("There was an error updating the student!", error);
    });
  };

  return (
    <div className='flex'>
        <div>
          <Sidebar/>
        </div>
        <div className='w-full'>
          <div className='p-10 shadow-xl rounded-lg text-slate-600 m-10'>
            <div className='flex flex-nowrap'>
              <div>
                <span className='font-extrabold text-xl mx-5'>Student Information</span>
              </div>
              <div className='px-10'>
                <PersonRoundedIcon sx={{ fontSize: 100 }}/>
              </div>
              <div className="info">

                <div>
                  <span className='font-bold'>Student ID: </span>
                  <span>{id}</span>
                </div>

                <div>
                  <span className='font-bold'>Name: </span>
                  <span>{studname}</span>
                </div>

                <div>
                  <span className='font-bold'>Phone no: </span>
                  <span>{contactNo}</span>
                </div>
              </div>
            </div>

          </div>
          <div className="p-20 shadow-xl rounded-lg text-slate-600 mx-10">
            <div className="title">
            <span className='font-extrabold text-xl'>Update Information</span>
            </div>
            <div className="flex flex-wrap grid gap-4 grid-cols-2 mt-5">
              <div>
                <label className='flex'>Name</label>
                <input 
                  type="text" 
                  name='studname'
                  value={studname}
                  onChange={(e) => setStudName(e.target.value)}
                  placeholder='Enter your name' 
                  className='border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400'
                />
              </div>

              <div>
                <label className='flex'>Phone no</label>
                <input 
                  type="text" 
                  name='contactNo'
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder='Enter your phone no' 
                  className='border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400'
                />
              </div>

              <div>
                <input 
                  type="button" 
                  value="Save" 
                  className='flex bg-slate-700 text-slate-50 mt-10 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900 cursor-pointer' 
                  onClick={handleSubmit}
                />
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default StudentView