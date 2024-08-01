// src/ConditionModal.tsx
import React, { useState } from 'react';
import { Condition , FormElement } from './types';

interface ConditionModalProps {
  onClose: () => void;
  onSave: (condition: Condition) => void;
  formElements: FormElement[];
}

const ConditionModal: React.FC<ConditionModalProps> = ({ onClose, onSave  , formElements}) => {
  const [field, setField] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');
  const [fieldToAppear, setFieldToAppear] = useState('');
  
  const handleSave = () => {
    // Log current values for debugging
    console.log("Field:", field);
    console.log("Operator:", operator);
    console.log("Value:", value);
    console.log("Field to Appear:", fieldToAppear);

    if (!field || !operator || !fieldToAppear) {
      alert('Please fill all fields.');
      return;
    }

    const condition: Condition = {
      field,
      operator,
      value,
      fieldToAppear,
    };
    onSave(condition);
    onClose();
  };
  return (
    <div className="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create Condition</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Field:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="">Select a field</option>
            {formElements.map((element) => (
              <option key={element.id} value={element.id}>
                {element.label || element.type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Operator:</label>
          <select value={operator} onChange={(e) => setOperator(e.target.value)} className="block mb-2 p-2 border border-gray-300 rounded">
          <option value="">select an operator</option>
          <option value="equals">Equals</option>
          <option value="not equals">Not Equals</option>
          <option value="contains">Contains</option>
          <option value="not contains">Not Contains</option>
        </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Value:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Field to Appear:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={fieldToAppear}
            onChange={(e) => setFieldToAppear(e.target.value)}
          >
            <option value="">Select a field</option>
            {formElements.map((element) => (
              <option key={element.id} value={element.id}>
                {element.label || element.type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConditionModal;
