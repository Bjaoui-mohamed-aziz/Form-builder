import React, { useState } from 'react';
import { FormElement } from './types';
import trash from "assets/icons/trash.svg";
import plus from "assets/icons/plus.svg";


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
              className="p-2 border border-gray-300 ml-2 rounded flex-grow  hover:border-gray-500"
            />
             <button onClick={() => handleRemoveOption(index)} className="p-1">
                <img src={trash} alt="Delete" className="w-5 h-5" />
              </button>
          </div>
        ))}
        <button onClick={handleAddOption} className="p-2 bg-[#243c5a] text-white ml-2 rounded-xl mb-4">
          Add Option
        </button>
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 bg-gray-300 text-black rounded-xl mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOptionsModal;
