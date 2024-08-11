import React from 'react';
import { Link } from 'react-router-dom';
import eye from 'assets/icons/eye.svg';

type FormComponentProps = {
  id: string;
  name: string;
  type: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void; // Add onPreview prop
};

const FormComponent: React.FC<FormComponentProps> = ({ id, name, type, onDelete,  onPreview }) => {

  
  return (
    <div className="w-60 h-48 flex flex-col m-4 border-2 border-gray-300 p-4 mb-4 shadow-lg rounded-lg bg-white relative hover:bg-gray-100 hover:shadow-2xl transition duration-300 hover:scale-105">
      <div className='static'>
        <img
          src={eye}
          alt="Preview Form"
          className="absolute top-2 right-2 w-10 h-10 hover:bg-gray-300 rounded-md p-1 cursor-pointer"
          onClick={() => onPreview(id)} // Handle eye icon click
        />
      </div>
      <h3 className="text-xl mb-2 text-[#233368] font-semibold">{name}</h3>
      <p className="text-[#3b549f]">Type: {type}</p>
      <div className="flex absolute bottom-3 left-3">
        <button className="p-2 bg-gray-300 mr-2 text-black rounded hover:bg-gray-400" onClick={() => onDelete(id)}>
          Delete
        </button>
          <button className="p-2 bg-[#233368] text-white rounded hover:bg-[#2f3e6f]">
            Edit
          </button>
      </div>
    </div>
  );
};

export default FormComponent;
