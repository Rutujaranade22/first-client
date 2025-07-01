import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL = process.env.REACT_APP_API_URL;

function Add() {
  const [member, setMember] = useState({
    id: '',
    name: '',
    dob: '',
    email: '',
    mobile: ''
  });

  const addMember = async () => {
    const { id, name, dob, email, mobile } = member;

    if (!id || !name || !dob || !email || !mobile) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/family`, member);
      if (response.data.success) {
        setMember({ id: '', name: '', dob: '', email: '', mobile: '' });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6 mt-4">
        Add Family Member 👨‍👩‍👧‍👦
      </h1>
      <div className="flex flex-col items-center gap-5 bg-white p-6 rounded-xl shadow-md w-fit mx-auto">
        {['id', 'name', 'dob', 'email', 'mobile'].map((field, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Enter ${field.toUpperCase()}`}
            value={member[field]}
            onChange={(e) => setMember({ ...member, [field]: e.target.value })}
            className="w-72 px-5 py-2.5 border bg-blue-50 text-blue-800 rounded-lg focus:outline-none"
          />
        ))}
        <button
          className="mt-3 w-72 bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700"
          onClick={addMember}
        >
          Add Member
        </button>
      </div>

      <Link
        to="/"
        className="absolute top-6 left-20 text-lg bg-purple-300 px-5 py-1 rounded-full hover:bg-purple-400"
      >
        Back👈
      </Link>

      <Toaster />
    </div>
  );
}

export default Add;
