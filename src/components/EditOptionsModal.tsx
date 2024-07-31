import React, { useState } from 'react';
import { FormElement } from './types';

interface EditOptionsModalProps {
  element: FormElement;
  onClose: () => void;
  onUpdateOptions: (id: string, options: string[]) => void;
}

const EditOptionsModal: React.FC<EditOptionsModalProps> = ({ element, onClose, onUpdateOptions }) => {
  const [options, setOptions] = useState<string[]>(element.options || []);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSave = () => {
    onUpdateOptions(element.id, options);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Options</h2>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="p-2 border border-gray-300 ml-2 rounded flex-grow"
            />
            <button
              onClick={() => handleRemoveOption(index)}
              className="p-2 bg-red-500 text-white rounded ml-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={handleAddOption} className="p-2 bg-blue-500 text-white rounded mb-4">
          Add Option
        </button>
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 bg-gray-300 text-black rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOptionsModal;
