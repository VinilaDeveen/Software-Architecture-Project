import React, { useState, useEffect } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import Sidebar from '../../component/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function AddDocument() {
  const { isAuthenticated, jwtToken } = useAuth();

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function handleSubmit() {
    const data = {
      title: title,
      url: url,
      description: description,
    };

    if (title !== '' || url !== '' || !description == '') {
      const response = await axios
        .post(`http://localhost:8080/api/v1/document/add`, data, config)
        .then((response) => {
          console.log('document details updated:', response.data);
          navigate(`/documenttable`);
        })
        .catch((error) => {
          console.error('There was an error updating the document!', error);
          alert('There was an error updating the document!');
        });
    }
  }

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-20">
        <div>
          <span className="font text-3xl text-slate-600 mx-5">Add New Document</span>
        </div>
        <div className="flex m-5 shadow-2xl rounded-3xl w-full">
          <div className="my-40">
            <ArticleIcon
              sx={{ fontSize: { xs: 60, sm: 100, md: 150 } }}
              className="text-slate-800 mx-4 my-10 sm:mx-20 sm:my-20 md:m-20 md:my-20"
            />
          </div>

          <div className="p-10 w-full">
            <div className="w-full">
              <label className="flex pt-8 text-lg text-slate-800">Document Title:</label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document's title"
                className="border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="w-full">
              <label className="flex pt-8 text-lg text-slate-800">Document URL:</label>
              <input
                type="text"
                name="url"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter document's url"
                className="border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="w-full">
              <label className="flex pt-8 text-lg text-slate-800">Document Description:</label>
              <input
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter document description"
                className="border-b-2 border-slate-300 w-full pt-3 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="w-full">
              <input
                type="button"
                value="Save"
                className="flex bg-slate-800 text-slate-50 mt-20 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
