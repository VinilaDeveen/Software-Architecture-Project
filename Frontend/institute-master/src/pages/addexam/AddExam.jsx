import React, { useState,useEffect } from 'react'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Sidebar from '../../component/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


function AddExam() {
    const{ isAuthenticated, jwtToken } = useAuth();

    const navigate = useNavigate();
    const[examTitle, setExamTitle] = useState('')

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function handleSubmit() {
        const data = {
            examTitle : examTitle
        };

        const response = await axios.post(`http://localhost:8080/api/v1/exam`,data , config )
          .then(response => {
            console.log('Exam details updated:', response.data);
        })
        .catch(error => {
            console.error("There was an error updating the exam!", error);
        });
        navigate(`/examtable`)
      };

  return (
    <div className='flex'>
        <div>
            <Sidebar/>
        </div>
        <div className='w-full px-20'>
            <div>
            <span className='font text-3xl text-slate-600 mx-5'>Add Schedule</span>
            </div>
            <div className='flex m-5 shadow-2xl rounded-3xl w-full'>
                <div className='my-40'>
                <AssignmentTurnedInIcon 
                            sx={{ fontSize: { xs: 60, sm: 100, md: 150 } }} 
                            className='text-slate-800 mx-4 my-10 sm:mx-20 sm:my-20 md:m-20 md:my-20' 
                        />
                </div>
                <div className='p-10 w-full'>
                    <div className='w-full'>
                        <label className='flex pt-8 text-lg text-slate-800'>Exam:</label>
                        <input 
                            type="text" 
                            name='examTitle'
                            onChange={(e) => setExamTitle(e.target.value)}
                            placeholder="Enter exam title" 
                            className='border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400'
                            required
                        />
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
  )
}

export default AddExam