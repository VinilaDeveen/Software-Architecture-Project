import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function FeeCardTable() {
    const { isAuthenticated, jwtToken } = useAuth();
    const [isEditing, setIsEditing] = React.useState(false);
    const { studId } = useParams();
    const [cardId, setCardId] = React.useState();
    const [feecards, setFeeCard] = React.useState([]);
    const [formData, setFormData] = React.useState({
        year: '',
        month: ''
    });
    const [errors, setErrors] = React.useState({
        year: false,
        month: false
    });

    const months = [
        { month: "January" },
        { month: "February" },
        { month: "March" },
        { month: "April" },
        { month: "May" },
        { month: "June" },
        { month: "July" },
        { month: "August" },
        { month: "September" },
        { month: "October" },
        { month: "November" },
        { month: "December" },
    ];

    React.useEffect(() => {
        if (isAuthenticated) {
            loadCards();
        }
    }, [isAuthenticated]);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    async function loadCards() {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/monthlyFeeCards/student/${studId}`, config);
            const cards = response.data.map((card) => ({
                cardId: card.cardId,
                id: card.student.id,
                studName: card.student.studName,
                Year: card.year,
                Month: card.month,
            }));
            setFeeCard(cards);
        } catch (error) {
            console.error('There was an error fetching the fee cards!', error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const validateForm = () => {
        const newErrors = {
            year: !formData.year,
            month: !formData.month
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    async function handleSubmit() {
        if (validateForm()) {
            const data = {
                studentId: studId,
                year: formData.year,
                month: formData.month,
                issued: true
            };

            try {
                if (isEditing) {
                    await axios.put(`http://localhost:8080/api/v1/monthlyFeeCards/${cardId}`, data, config);
                    console.log("Fee card updated successfully");
                } else {
                    await axios.post(`http://localhost:8080/api/v1/monthlyFeeCards`, data, config);
                    console.log("Fee card created successfully");
                }
                loadCards();
                clearFields();
                setIsEditing(false);
            } catch (error) {
                console.error("Error creating/updating fee card:", error);
            }
        }
    }

    const clearFields = () => {
        setFormData({
            year: '',
            month: ''
        });
    };

    const handleEditCard = (card) => {
        setFormData({
            year: card.Year,
            month: card.Month
        });
        setCardId(card.cardId);
        setIsEditing(true);
    };

    async function handleDeleteCard(cardId) {
        if (window.confirm('Are you sure you want to delete this card?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/monthlyFeeCards/${cardId}`, config);
                console.log("Fee card deleted successfully");
                loadCards();
            } catch (error) {
                console.error("Error deleting fee card:", error);
            }
        }
    }

    const columns = [
        { field: 'cardId', headerName: 'ID', width: 90 },
        { field: 'id', headerName: 'Student ID', width: 150 },
        { field: 'studName', headerName: 'Name', width: 250 },
        { field: 'Year', headerName: 'Year', width: 100 },
        { field: 'Month', headerName: 'Month', width: 100 },
    ];

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 370,
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <div
                        className='bg-cover mt-2 px-2 h-[35px] bg-green-700 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-green-900 cursor-pointer'
                        onClick={() => handleEditCard(params.row)}
                    >
                        <RemoveRedEyeRoundedIcon className='mr-2' />
                        Update
                    </div>
                    <Link to={`/markAttendance/${params.row.cardId}`}>
                        <div className='bg-cover mt-2 px-2 h-[35px] bg-blue-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-blue-900'>
                            <AddIcon className='mr-2' />
                            Add Attendance
                        </div>
                    </Link>
                    <div
                        className='bg-cover mt-2 px-2 h-[35px] bg-red-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-red-900 cursor-pointer'
                        onClick={() => handleDeleteCard(params.row.cardId)}
                    >
                        <DeleteRoundedIcon className='mr-2' />
                        Delete
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <div className='container py-10 pl-2 pr-2 lg:px-10'>
                    <Grid container justifyContent='space-between' alignItems='center' className='mb-5'>
                        <Grid item>
                            <span className='text-xl text-slate-600'>Fee Card Management</span>
                        </Grid>
                    </Grid>
                    <div className='flex gap-20'>
                        <div className='w-[500px]'>
                            <label className='flex pt-8 text-lg text-slate-800'>Year:</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                placeholder="Enter year"
                                className={`border-b-2 w-full pt-3 ${
                                    errors.year ? 'border-red-500' : 'border-slate-300'
                                }`}
                            />
                            {errors.year && <span className="text-red-500">Year is required.</span>}
                        </div>
                        <div className='w-[500px]'>
                            <label className='flex pt-8 text-lg text-slate-800'>Month:</label>
                            <select
                                name="month"
                                value={formData.month}
                                onChange={handleInputChange}
                                className={`border-b-2 w-full pt-3 ${
                                    errors.month ? 'border-red-500' : 'border-slate-300'
                                }`}
                            >
                                <option value="">--Select Month--</option>
                                {months.map((monthObj) => (
                                    <option key={monthObj.month} value={monthObj.month}>
                                        {monthObj.month}
                                    </option>
                                ))}
                            </select>
                            {errors.month && <span className="text-red-500">Month is required.</span>}
                        </div>
                        <div>
                            <input
                                type="button"
                                value={isEditing ? "Update" : "Add"}
                                className='bg-slate-800 text-slate-50 mt-[50px] px-20 py-2 rounded-xl hover:bg-slate-900'
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                    <Box className='pt-5'>
                        <DataGrid
                            rows={feecards}
                            columns={columns.concat(actionColumn)}
                            getRowId={(row) => row.cardId}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 7 },
                                },
                            }}
                            pageSizeOptions={[7]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            autoHeight
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default FeeCardTable;
