import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

function Edit() {
  const [member, setMember] = useState({ id: '', name: '', dob: '', email: '', mobile: '' });
  const { id } = useParams();

  useEffect(() => {
    const loadMember = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/family/${id}`);
        setMember(response.data.data);
      } catch (e) {
        toast.error(e.response?.data?.message || 'Failed to fetch data');
      }
    };

    if (id) loadMember();
  }, [id]);

  const editMember = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/family/${id}`, {
        name: member.name,
        dob: member.dob,
        email: member.email,
        mobile: member.mobile
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6 mt-4">Edit Family Member ✏️</h1>
      <div className="flex flex-col items-center gap-5 bg-white p-6 rounded-xl shadow-md w-fit mx-auto">
        <input type="text" value={member.id} disabled className='w-72 px-5 py-2.5 border bg-blue-50 text-blue-800 rounded-lg' />
        {['name', 'dob', 'email', 'mobile'].map((field, index) => (
          <input
            key={index}
            type='text'
            placeholder={`Enter ${field.toUpperCase()}`}
            value={member[field]}
            onChange={(e) => setMember({ ...member, [field]: e.target.value })}
            className='w-72 px-5 py-2.5 border bg-blue-50 text-blue-800 rounded-lg focus:outline-none'
          />
        ))}
        <button className="mt-3 w-72 bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700" onClick={editMember}>Update</button>
      </div>
      <Link to='/' className='absolute top-6 left-20 text-lg bg-purple-300 px-5 py-1 rounded-full hover:bg-purple-400'>Back👈</Link>
      <Toaster />
    </div>
  );
}

export default Edit;
