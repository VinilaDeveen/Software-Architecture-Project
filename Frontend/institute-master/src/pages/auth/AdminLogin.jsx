import React, { useState } from 'react'
import Logo from '../../assets/Logo.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function AdminLogin() {
    const { login } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(event) {
        event.preventDefault(); //disable default form submission

        if (username === "" || password === "") { //validate user inputs
            setError("Username and password are required")
        }

        const data = {
            username: username,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/login", data);
            login(response.data);
            navigate("/studenttable");
        } catch (error) {
            setError("There was an error logging in");
        }
    }
  return (
    <div className="min-h-screen flex flex-raw justify-center items-center gap-20">
        <div>
            <img src={Logo} className='w-[200px] sm:w-[250px] lg:w-[300px]' alt="Logo" />
        </div>

        <div className='bg-white shadow-lg rounded-lg p-8 w-[400px] sm:w-[300px] lg:w-[600px]'>
            <div className="text-center mb-5">
                <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <form onSubmit={submit}>
                <div className="mb-4">
                    <label className="block mb-1 text-left">Username</label>
                    <input 
                        type="text" 
                        onChange={(event) => {
                            setUsername(event.target.value);
                            setError("");
                        }} 
                        className="block w-full p-2 border border-gray-200 rounded-lg" 
                        placeholder="Enter your username" 
                    />
                </div>
                        
                <div className="mb-4">
                    <label className="block mb-1 text-left">Password</label>
                    <input 
                        type="password" 
                        onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                        }} 
                        className="block w-full p-2 border border-gray-200 rounded-lg" 
                        placeholder="Enter your password" 
                    />
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}

                <div className="mt-8">
                    <button 
                        type="submit" 
                        className="block w-full bg-gray-800 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-900">
                        Login
                    </button>
                </div>
            </form>
            <div className='pt-5 flex text-center justify-center gap-2'>
                    <span className='text-slate-600'>New to Institue MASTER? </span>
                    <Link to='/register' className='text-blue-800'> Register </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin