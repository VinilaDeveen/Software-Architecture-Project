import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar/Sidebar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';

export default function DocumentView() {
  const { isAuthenticated, jwtToken } = useAuth();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadDocumentDetails();
    }
  }, [isAuthenticated, id]);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadDocumentDetails() {
    const response = await axios
      .get(`http://localhost:8080/api/v1/document/findById/${id}`, config)
      .then((response) => {
        setTitle(response.data.title);
        setUrl(response.data.url);
        setDate(response.data.date);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.error('There was an error fetching the Document details!', error);
      });
  }

  const handleSubmit = (e) => {
    const Document = { title, url, description };

    const response = axios
      .put(`http://localhost:8080/api/v1/document/updateById/${id}`, Document, config)
      .then((response) => {
        console.log('Document details uptitled:', response.data);
        window.location.reload;
      })
      .catch((error) => {
        console.error('There was an error updating the Document!', error);
      });
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="p-10 shadow-xl rounded-lg text-slate-600 m-10">
          <div className="flex flex-nowrap">
            <div>
              <span className="font-extrabold text-xl mx-5">Document Information</span>
            </div>
            <div className="px-10">
              <ArticleIcon sx={{ fontSize: 100 }} />
            </div>
            <div className="info">
              <div>
                <span className="font-bold">ID: </span>
                <span>{id}</span>
              </div>

              <div>
                <span className="font-bold">title: </span>
                <span>{title}</span>
              </div>

              <div>
                <span className="font-bold">Url: </span>
                <span>{url}</span>
              </div>

              <div>
                <span className="font-bold">Date: </span>
                <span>{date}</span>
              </div>

              <div>
                <span className="font-bold">Description: </span>
                <span>{description}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-20 shadow-xl rounded-lg text-slate-600 mx-10">
          <div className="title">
            <span className="font-extrabold text-xl">Uptitle Information</span>
          </div>
          <div className="flex flex-wrap grid gap-4 grid-cols-2 mt-5">
            <div>
              <label className="flex">title</label>
              <input
                type="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="flex">Url</label>
              <input
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder=""
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="flex">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="border-b-2 border-slate-400 w-full pt-2 outline-none placeholder:text-slate-400"
              />
            </div>

            <div></div>

            <div>
              <input
                type="button"
                value="Save"
                className="flex bg-slate-700 text-slate-50 mt-10 mb-5 px-20 py-2 rounded-xl hover:bg-slate-900 cursor-pointer"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
