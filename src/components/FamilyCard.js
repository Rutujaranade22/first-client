import React from 'react';
import TrashIcon from './../assets/delete.png';
import EditIcon from './../assets/edit.png';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FamilyCard({ id, name, relation, loadFamily }) {
    const deleteMember = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/family/${id}`);
        if (response.data.success) {
            toast.success(response.data.message);
            loadFamily();
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 m-4 w-80 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-yellow-900">{id} : {name}</h2>
            <p className="mt-3 text-sm font-medium text-yellow-700 uppercase">{relation}</p>

            <div className="flex items-center justify-around mt-6">
                <img src={TrashIcon} alt="Delete" className='h-[30px] cursor-pointer' onClick={deleteMember} />
               <Link to={`/edit/${id}`}>
  <img src={EditIcon} alt="Edit" className='h-[30px] cursor-pointer' />
</Link>

            </div>

            <Toaster />
        </div>
    );
}

export default FamilyCard;