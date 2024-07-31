import React, { useState } from 'react';
import { FormElement } from './types'; // Import the type

interface EditTextModalProps {
  element: FormElement;
  onSave: (updatedElement: FormElement) => void;
  onClose: () => void;
}

const EditTextModal: React.FC<EditTextModalProps> = ({ element, onSave, onClose }) => {
  const [label, setLabel] = useState(element.label || '');
  const [placeholder, setPlaceholder] = useState(element.placeholder || '');
  const [defaultValue, setDefaultValue] = useState(element.defaultValue || '');

  const handleSave = () => {
    onSave({ ...element, label, placeholder, defaultValue });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2>Edit Text Field</h2>
        <div className="flex items-center mb-4">
          <label className="w-32 text-right pr-4">Label:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 flex-1"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-32 text-right pr-4">Placeholder:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 flex-1"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-32 text-right pr-4">Default Value:</label>
          <input
            type="text"
            className="p-2 border border-gray-300 flex-1"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
          <button onClick={onClose} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTextModal;
