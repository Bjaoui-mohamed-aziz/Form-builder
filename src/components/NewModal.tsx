import React, { useState } from 'react';
import { FormElement } from './types';


interface Condition {
  field: string;
  operator: string;
  value: string;
}

interface NewModalProps {
  onClose: () => void;
  onSaveCondition: (condition: Condition) => void;
  formElements: FormElement[];
}

const NewModal: React.FC<NewModalProps> = ({ onClose, onSaveCondition, formElements }) => {
  const [field, setField] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');

  const handleSave = () => {
    onSaveCondition({ field, operator, value });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Add Condition</h2>
        <label>Field:</label>
        <select value={field} onChange={(e) => setField(e.target.value)} className="block mb-2 p-2 border border-gray-300 rounded">
          {formElements.map(element => (
            <option key={element.id} value={element.id}>{element.label || element.type}</option>
          ))}
        </select>
        <label>Operator:</label>
        <select value={operator} onChange={(e) => setOperator(e.target.value)} className="block mb-2 p-2 border border-gray-300 rounded">
          <option value="equals">Equals</option>
          <option value="not equals">Not Equals</option>
          <option value="contains">Contains</option>
          <option value="not contains">Not Contains</option>
        </select>
        <label>Value:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="block mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSave}
          className="mt-4 p-2 bg-[#243c5a] text-white rounded-xl hover:shadow-lg"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-[#243c5a] text-white rounded-xl hover:shadow-lg ml-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewModal;
