import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FamilyCard from '../components/FamilyCard';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

function Home() {
  const [family, setFamily] = useState([]);

  const loadFamily = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/family`);
      setFamily(response.data.data);  
    } catch (e) {
      console.error("Error loading family data:", e);
    }
  };

  useEffect(() => {
    loadFamily();  
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6 mt-4">Family Records 👪</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {family.length > 0 ? (
          family.map((member, i) => (
            <FamilyCard key={i} {...member} loadFamily={loadFamily} />
          ))
        ) : (
          <p className="text-center text-gray-600">No family members found.</p>
        )}
      </div>

      <Link
        to="/add"
        className="absolute top-6 left-20 text-lg bg-purple-300 px-5 py-1 rounded-full hover:bg-purple-400"
      >
        Add➕
      </Link>
    </div>
  );
}

export default Home;
