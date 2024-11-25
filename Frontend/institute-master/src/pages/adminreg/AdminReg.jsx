import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/Logo.png'

function AdminReg() {
    const navigate = useNavigate();
    const[name, setName] = useState('');
    const[phoneNo, setPhoneNo] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    async function handleSubmit() {
        const data = {
            name : name,
            contactNo : phoneNo,
            username : username,
            password : password
        };

        const response = await axios.post(`http://localhost:8080/auth/register`,data)
            .then(response => {
                console.log('Customer details updated:', response.data);
            })
            .catch(error => {
                console.error("There was an error updating the customer!", error);
            });
            navigate(`/`)
      };

  return (
    <div className='flex'>
        <div className='w-full px-20'>
            <div>
            <span className='font text-3xl text-slate-600 mx-5'>Add New User</span>
            </div>
            <div className='flex m-8 shadow-2xl rounded-3xl w-full'>
                <div className='my-30'>
                    <img src={Logo}
                        sx={{ fontSize: { xs: 60, sm: 100, md: 150 } }} 
                        className='text-slate-800 px-30 py-20 mx-8 my-10 sm:mx-20 sm:my-20 md:m-20 md:my-20' 
                    />
                </div>
                <div className='p-10 w-full mx-20'>
                    <div className='w-full'>
                        <label className='flex pt-8 text-lg text-slate-800'>Name:</label>
                        <input 
                            type="text"
                            name='name'
                            onChange={(e) => setName(e.target.value)} 
                            placeholder='Enter your name' 
                            className='border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400'
                            required
                        />
                    </div>            

                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>Phone No:</label>
                            <input 
                                type="text" 
                                name='phoneNo'
                                onChange={(e) => setPhoneNo(e.target.value)}
                                placeholder='Enter your phone no' 
                                className='border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400'
                                required
                            />
                        </div>
                    </div>

                    

                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>User name:</label>
                            <input 
                                type="text" 
                                name='username'
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter your user name' 
                                className='border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400'
                                required
                            />
                        </div>

                        <div className='w-full'>
                            <label className='flex pt-8 text-lg text-slate-800'>Password:</label>
                            <input 
                                type="text" 
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password'
                                className='border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400'
                                required
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <input 
                            type="button" 
                            value="Register" 
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

export default AdminReg