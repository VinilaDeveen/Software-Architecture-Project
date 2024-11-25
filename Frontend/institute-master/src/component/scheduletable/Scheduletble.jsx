import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Scheduletble() {
    const { isAuthenticated, jwtToken } = useAuth();
    const [schedules, setSchedules] = React.useState([]);

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
    }

    React.useEffect(() => {
        if (isAuthenticated) {
          loadSchedule();
        }
    }, [isAuthenticated]);

    async function loadSchedule () {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/schedule`, config);
          setSchedules(response.data);
        } catch (error) {
          console.error('There was an error fetching the schedule list!', error);
        }
    }

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this schedule?")) {
        axios.delete(`http://localhost:8080/api/v1/schedule/${id}`,config)
          .then(response => {
            loadSchedule();
          })
          .catch(error => {
            console.error("There was an error deleting the schedule!", error);
          });
      }
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'time_from', headerName: 'Time from', width: 200 },
        { field: 'time_to', headerName: 'Time to', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 }
      ];
    
      const actionColumn = [
        {
          field: 'action',
          headerName: 'Action',
          width: 310,
          renderCell: (params) => {
            return (
              <div className='flex gap-2'>
                <Link to={`/scheduletable/${params.row.id}`}>
                  <div className='bg-cover mt-2 px-2 h-[35px] bg-blue-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-blue-900'>
                    <RemoveRedEyeRoundedIcon className='mr-2' />
                    View
                  </div>
                </Link>
                <div
                  className='bg-cover mt-2 px-2 h-[35px] bg-red-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-red-900 cursor-pointer'
                  onClick={() => handleDelete(params.row.id)}
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
              <span className='text-xl text-slate-600'>Schedule List</span>
            </Grid>
            <Grid item>
              <Link to='/scheduletable/addschedule' style={{ textDecoration: 'none' }}>
                <span className='p-2 border-solid border-2 border-green-700 rounded-lg text-green-700 hover:border-slate-900 hover:text-slate-900'>
                  <AddCircleRoundedIcon className='mr-2 hover:text-slate-900' />
                  Add New
                </span>
              </Link>
            </Grid>
          </Grid>
          <Box className='pt-5'>
            <DataGrid
              rows={schedules}
              columns={columns.concat(actionColumn)}
              getRowId={(row) => row.id}
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
  )
}

export default Scheduletble