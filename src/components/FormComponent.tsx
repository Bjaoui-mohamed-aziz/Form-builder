import React from 'react';
import { Link } from 'react-router-dom';

type FormComponentProps = {
  
  id: string;
  name: string;
  type: string;
  onDelete: (id: string) => void; 
  onEdit: (id: string) => void; 

};

const FormComponent: React.FC<FormComponentProps> = ({id, name, type, onDelete }) => {


      
  return (
    <div className="w-60 h-48  flex flex-col m-4 border-2 border-gray-300 p-4 mb-4 shadow-lg rounded-lg bg-white relative hover:bg-gray-100 hover:shadow-2xl transition duration-300 hover:scale-105">
      <h3 className="text-xl mb-2 text-[#233368] font-semibold">{name}</h3>
      <p className="text-[#3b549f]">Type: {type}</p>
      <div className="flex absolute bottom-3 left-3">
        <button className="p-2 bg-gray-300 mr-2 text-black rounded" onClick={() => onDelete(id)}>
          Delete
        </button>
        <Link to={`/form-builder/${id}`}>
          <button className="p-2 bg-[#233368] text-white rounded">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FormComponent;
