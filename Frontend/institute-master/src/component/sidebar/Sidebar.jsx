import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArticleIcon from '@mui/icons-material/Article';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png'
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className='bg-slate-300 w-full w-full h-screen'>
            <div className='py-2 px-2 sm:px-[50px]'>
                <img src={Logo} className='w-[150px]'/>
            </div>
            <hr/>
            <div className='flex flex-col text-xl sm:text-2xl text-slate-600'>
               <ul>
                    <Link to="/studenttable">
                        <li className='flex items-center px-5 sm:px-14 py-3 hover:bg-slate-50'>
                            <PersonRoundedIcon sx={{fontSize:30}}/>
                            <span className='ml-2'>Student</span>
                        </li>
                    </Link>

                    <Link to="/examtable" style={{textDecoration:"none"}}>
                        <li className='flex items-center px-5 sm:px-14 py-3 hover:bg-slate-50'>
                            <ReceiptLongIcon sx={{fontSize:30}}/>
                            <span className='ml-2'>Exams</span>
                        </li>
                    </Link>

                    <Link to="/scheduletable" style={{textDecoration:"none"}}>
                        <li className='flex items-center px-5 sm:px-14 py-3 hover:bg-slate-50'>
                            <CalendarMonthIcon sx={{fontSize:30}}/>
                            <span className='ml-2'>Schedule</span>
                        </li>
                    </Link>

                    <Link to="/documenttable" style={{textDecoration:"none"}}>
                        <li className='flex items-center px-5 sm:px-14 py-3 hover:bg-slate-50'>
                            <ArticleIcon sx={{fontSize:30}}/>
                            <span className='ml-2'>Documents</span>
                        </li>
                    </Link>               
                    
                    <li className='absolute bottom-0 left-0 flex items-center px-5 sm:px-14 py-3 hover:bg-slate-50 hover:w-full cursor-pointer' onClick={logout}>
                        <LogoutRoundedIcon className='mr-4'/>
                        <span>Log-out</span>
                    </li>   
                </ul>   
            </div>
        </div>
    );
};

export default Sidebar;
