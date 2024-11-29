import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Studenttable() {
    const { isAuthenticated, jwtToken } = useAuth();
    const [students, setStudents] = React.useState([]);

    React.useEffect(() => {
      if (isAuthenticated) {
        loadStudents();
      }
    }, [isAuthenticated]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  async function loadStudents() {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/student`, config);
      setStudents(response.data);
    } catch (error) {
      console.error('There was an error fetching the item list!', error);
    }
  }

  const handleDelete = (studId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`http://localhost:8080/api/v1/student/${studId}`,config)
        .then(response => {
          loadStudents();
        })
        .catch(error => {
          console.error("There was an error deleting the student!", error);
        });
    }
  };

  const columns = [
    { field: 'studId', headerName: 'ID', width: 90 },
    {field: 'id', headerName: 'Student ID', width: 120},
    { field: 'studName', headerName: 'Name', width: 250 },
    { field: 'phoneNo', headerName: 'Contact No', width: 200 }
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 310,
      renderCell: (params) => {
        return (
          <div className='flex gap-2'>
            <Link to={`/studenttable/${params.row.studId}`}>
              <div className='bg-cover mt-2 px-2 h-[35px] bg-blue-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-blue-900'>
                <RemoveRedEyeRoundedIcon className='mr-2' />
                View
              </div>
            </Link>

            <Link to={`/feecardtable/${params.row.studId}`}>
              <div className='bg-cover mt-2 px-4 h-[35px] bg-green-700 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-green-900'>
                <AttachMoneyIcon className='mr-2' />
                Fee
              </div>
            </Link>
            
            <div
              className='bg-cover mt-2 px-2 h-[35px] bg-red-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-red-900 cursor-pointer'
              onClick={() => handleDelete(params.row.studId)}
            >
              <DeleteRoundedIcon className='mr-2' />
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='container py-10 px-3 lg:px-10'>
          <Grid container justifyContent='space-between' alignItems='center' className='mb-5'>
            <Grid item>
              <span className='text-xl text-slate-600'>Student List</span>
            </Grid>
            <Grid item>
              <Link to='/addStudent' style={{ textDecoration: 'none' }}>
                <span className='p-2 border-solid border-2 border-green-700 rounded-lg text-green-700 hover:border-slate-900 hover:text-slate-900'>
                  <AddCircleRoundedIcon className='mr-2 hover:text-slate-900' />
                  Add New
                </span>
              </Link>
            </Grid>
          </Grid>
          <Box className='pt-5'>
            <DataGrid
              rows={students}
              columns={columns.concat(actionColumn)}
              getRowId={(row) => row.studId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 9,
                  },
                },
              }}
              pageSizeOptions={[9]}
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

export default Studenttable