import React, { useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function ScheduleView() {
  const { isAuthenticated, jwtToken } = useAuth();
  const {id} = useParams();
  const [date, setDate] = useState('');
  const [time_from, setTime_from] = useState('')
  const [time_to, setTime_to] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated){
      loadScheduleDetails();
    }
  },[isAuthenticated,id])

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  async function loadScheduleDetails() {
    const response = await axios.get(`http://localhost:8080/api/v1/schedule/${id}`, config)
    .then( response => {
      setDate(response.data.date);
      setTime_from(response.data.time_from);
      setTime_to(response.data.time_to);
      setDescription(response.data.description)
    })
    .catch(error => {
      console.error("There was an error fetching the schedule details!", error);
    })
  }

  const handleSubmit = (e) => {
    const schedule = {date, time_from, time_to, description};

    const response = axios.put(`http://localhost:8080/api/v1/schedule/${id}`,schedule, config)
      .then(response => {
        console.log('Schedule details updated:', response.data);
        navigate('/scheduletable')
    })
    .catch(error => {
        console.error("There was an error updating the schedule!", error);
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
                <span className='font-extrabold text-xl mx-5'>Schedule Information</span>
              </div>
              <div className='px-10'>
                <CalendarMonthIcon sx={{ fontSize: 100 }}/>
              </div>
              <div className="info">
                <div>
                  <span className='font-bold'>ID: </span>
                  <span>{id}</span>
                </div>

                <div>
                  <span className='font-bold'>Date: </span>
                  <span>{date}</span>
                </div>

                <div>
                  <span className='font-bold'>Time from: </span>
                  <span>{time_from}</span>
                </div>

                <div>
                  <span className='font-bold'>Time to: </span>
                  <span>{time_to}</span>
                </div>

                <div>
                  <span className='font-bold'>Description: </span>
                  <span>{description}</span>
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
                <label className='flex'>Date</label>
                <input 
                  type="date" 
                  name='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder='DD/MM/YYYY' 
                  className='border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400'
                />
              </div>

              <div>
                <label className='flex'>Time From</label>
                <input 
                  type="time" 
                  name='time_from'
                  value={time_from}
                  onChange={(e) => setTime_from(e.target.value)}
                  placeholder='' 
                  className='border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400'
                />
              </div>

              <div>
                <label className='flex'>Time To</label>
                <input 
                  type="time" 
                  name='time_to'
                  value={time_to}
                  onChange={(e) => setTime_to(e.target.value)}
                  placeholder='' 
                  className='border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400'
                />
              </div>

              <div>
                <label className='flex'>Description</label>
                <input 
                  type="text" 
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Enter description' 
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

export default ScheduleView