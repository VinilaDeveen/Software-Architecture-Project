import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Examtable() {
  const { isAuthenticated, jwtToken } = useAuth();
  const [exams, setExams] = React.useState([]);

  React.useEffect(() => {
    if (isAuthenticated) {
      loadExams();
    }
  }, [isAuthenticated]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  async function loadExams() {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/exam`, config);
      setExams(response.data);
    } catch (error) {
      console.error('There was an error fetching the exam list!', error);
    }
  }

  const columns = [
    { field: 'examId', headerName: 'ID', width: 90 },
    { field: 'examTitle', headerName: 'Name', width: 350 }
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='flex gap-2'>
            <Link to={`/examtable/${params.row.examId}`}>
              <div className='bg-cover mt-2 px-2 h-[35px] bg-green-700 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-blue-900'>
                <AddIcon className='mr-2' />
                Add Marks
              </div>
            </Link>
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
              <span className='text-xl text-slate-600'>Exam List</span>
            </Grid>
            <Grid item>
              <Link to='/examtable/addExam' style={{ textDecoration: 'none' }}>
                <span className='p-2 border-solid border-2 border-green-700 rounded-lg text-green-700 hover:border-slate-900 hover:text-slate-900'>
                  <AddCircleRoundedIcon className='mr-2 hover:text-slate-900' />
                  Add New
                </span>
              </Link>
            </Grid>
          </Grid>
          <Box className='pt-5'>
            <DataGrid
              rows={exams}
              columns={columns.concat(actionColumn)}
              getRowId={(row) => row.examId}
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

export default Examtable