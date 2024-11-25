import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function Marktable() {
    const { isAuthenticated, jwtToken } = useAuth();
    const [marks, setMarks] = React.useState([]);
    const [id, setId] = useState('');
    const [mark, setMark] = useState();
    const { examId } = useParams();
    const [ examMarkId, setMarkId ] = useState();
    const [isEditing, setIsEditing] = useState(false);

    React.useEffect(() => {
        if (isAuthenticated) {
          console.log("Exam ID:", examId); 
          loadMarks();
        }
    }, [isAuthenticated,examId]);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    async function loadMarks() {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/exam/${examId}`, config);
            const formattedMarks = response.data.marks.map((mark) => ({
                examMarkId: mark.examMarkId,
                id: mark.student.id,
                studName: mark.student.studName,
                mark: mark.mark,
            }));
            setMarks(formattedMarks);
        } catch (error) {
            console.error("Error fetching marks:", error);
        }
    }
    

    async function handleSubmit() {
      if (isEditing) {
        const updatemark = {
            id: id ,
            mark: mark,
            examId: examId,
        };
  
        const response = await axios.put(`http://localhost:8080/api/v1/examMark/${examMarkId}`,updatemark, config)
          .then(response => {
            loadMarks();
            console.log('Mark details updated:', response.data);
        })
        .catch(error => {
            console.error("There was an error updating the mark!", error);
        });
      } else {
        const data = {
          id: id,
          mark: mark,
          examId: examId, 
        };
  
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/examMark`, data, config);
            console.log('Mark details updated:', response.data);
            loadMarks(); 
        } catch (error) {
            console.error("There was an error updating the mark!", error);
        }
      }
    }

    const handleEditStudent = (student) => {
        setId(student.id);
        setMark(student.mark); 
        setIsEditing(true);
        setMarkId(student.examMarkId)
        console.log("ExamMarkId:", student.examMarkId)
    };
    

    const handleDelete = (examMarkId) => {
        if (window.confirm("Are you sure you want to delete this mark?")) {
          axios.delete(`http://localhost:8080/api/v1/examMark/${examMarkId}`,config)
            .then(response => {
              loadMarks();
            })
            .catch(error => {
              console.error("There was an error deleting the mark!", error);
            });
        }
      };
  

  const columns = [
    { field: 'examMarkId', headerName: 'ID', width: 90 },
    { field: 'id', headerName: 'Student ID', width: 150 },
    { field: 'studName', headerName: 'Name', width: 250 },
    { field: 'mark', headerName: 'Mark', width: 100 },
  ];

    const actionColumn = [
      {
          field: 'action',
          headerName: 'Action',
          width: 350,
          renderCell: (params) => (
              <div className='flex gap-2'>
                  <div
                      className='bg-cover mt-2 px-2 h-[35px] bg-green-700 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-green-900 cursor-pointer'
                      onClick={() => handleEditStudent(params.row)}
                  >
                      <RemoveRedEyeRoundedIcon className='mr-2' />
                      Update
                  </div>
                  <div
                      className='bg-cover mt-2 px-2 h-[35px] bg-red-500 text-slate-50 rounded-3xl flex items-center justify-center hover:bg-red-900 cursor-pointer'
                      onClick={() => handleDelete(params.row.examMarkId)}
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
            <div>
                <Sidebar />
            </div>
            <div className='flex-1'>
                <div className='container py-10 px-3 lg:px-10'>
                    <Grid container justifyContent='space-between' alignItems='center' className='mb-5'>
                        <Grid item>
                            <span className='text-xl text-slate-600'>Add Marks</span>
                        </Grid>
                    </Grid>
                    <div className=''>
                        <div className='w-full flex gap-20'>
                            <div className='w-[500px]'>
                                <label className='flex pt-8 text-lg text-slate-800'>Student ID:</label>
                                <input
                                    type="text"
                                    name='id'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    placeholder="Enter student's ID"
                                    className='border-b-2 border-slate-300 w-full pt-3 placeholder:text-slate-400'
                                />
                            </div>
                            <div className='w-[500px]'>
                                <label className='flex pt-8 text-lg text-slate-800'>Mark:</label>
                                <input
                                    type="number"
                                    name='mark'
                                    value={mark}
                                    onChange={(e) => setMark(e.target.value)}
                                    placeholder="Enter mark"
                                    className='border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400'
                                />
                            </div>
                            <div className='w-full'>
                                <input
                                    type="button"
                                    value={isEditing ? "Update" : "Add"}
                                    className='flex bg-slate-800 text-slate-50 mt-[50px] mb-5 px-20 py-2 rounded-xl hover:bg-slate-900'
                                    onClick={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                    <Box className='pt-5'>
                        <DataGrid
                            rows={marks}
                            columns={columns.concat(actionColumn)}
                            getRowId={(row) => row.examMarkId}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 7,
                                    },
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

export default Marktable;
