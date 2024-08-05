import React from 'react';
import { Condition, ItemType, ItemTypes } from './types';

interface ModalPreviewProps {
  componentName: string;
  componentType: string;
  conditions: Condition[];
  formRef?: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  formElements: {
    id: string;
    type: ItemType;
    value?: string;
    label?: string;
    defaultValue?: string;
    options?: string[];
  }[];
  onUpdateElement: (id: string, value: string) => void;
  onSave: () => void;
}

const Modal: React.FC<ModalPreviewProps> = ({
  onClose,
  formElements,
  componentName,
  componentType,
  conditions,
  onSave
}) => {
  const [formState, setFormState] = React.useState(
    formElements.reduce((acc, el) => {
      acc[el.id] = el.defaultValue || (el.type === ItemTypes.CHECKBOX_GROUP ? [] : '');
      return acc;
    }, {} as Record<string, string | string[]>)
  );

  const evaluateConditions = (elementId: string) => {
    const applicableConditions = conditions.filter(cond => cond.fieldToAppear === elementId);

    if (applicableConditions.length === 0) {
      return true; // No conditions mean the element should be visible
    }

    return applicableConditions.every(cond => {
      const fieldValue = formState[cond.field];

      if (Array.isArray(fieldValue)) {
        switch (cond.operator) {
          case 'equals':
            return fieldValue.includes(cond.value);
          case 'not equals':
            return !fieldValue.includes(cond.value);
          case 'contains':
            return fieldValue.includes(cond.value);
          case 'not contains':
            return !fieldValue.includes(cond.value);
          default:
            return false;
        }
      } else {
        switch (cond.operator) {
          case 'equals':
            return fieldValue === cond.value;
          case 'not equals':
            return fieldValue !== cond.value;
          case 'contains':
            return fieldValue?.includes(cond.value);
          case 'not contains':
            return !fieldValue?.includes(cond.value);
          default:
            return false;
        }
      }
    });
  };

  const handleChange = (id: string, value: string | string[]) => {
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h1 className="text-2xl mb-2 font-bold text-center">{componentName}</h1>
        <h3 className="mb-4 text-center">{componentType}</h3>
        {formElements.map((element) => {
          const isVisible = evaluateConditions(element.id);

          if (!isVisible) return null;

          return (
            <div key={element.id} className="p-2 mb-2 rounded-md">
              {element.type === ItemTypes.H1 && <h1 className="text-2xl font-bold text-center mb-4">{element.value}</h1>}
              {element.type === ItemTypes.H2 && <h2 className="text-1xl font-bold text-center mb-4">{element.value}</h2>}

              {element.type === ItemTypes.TEXT_INPUT && (
                <div>
                  <label className="font-semibold mb-2 mt-3">{element.label}</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded w-60 ml-3"
                    value={formState[element.id] as string}
                    onChange={(e) => handleChange(element.id, e.target.value)}
                  />
                </div>
              )}

              {element.type === ItemTypes.DATE && (
                <div>
                  <label className="font-semibold mb-2 mt-3">{element.label}</label>
                  <input
                    type="date"
                    className="p-2 border border-gray-300 rounded w-60 ml-3"
                    value={formState[element.id] as string}
                    onChange={(e) => handleChange(element.id, e.target.value)}
                  />
                </div>
              )}

              {element.type === ItemTypes.CHECKBOX && (
                <input
                  type="checkbox"
                  className="p-2 border border-gray-300"
                  checked={formState[element.id] === 'true'}
                  onChange={(e) => handleChange(element.id, e.target.checked ? 'true' : 'false')}
                />
              )}

              {element.type === ItemTypes.CHECKBOX_GROUP && (
                <div className="flex items-start mb-2">
                  <label className="font-semibold mb-2 mt-3">{element.label}</label>
                  <div className="flex flex-col ml-4 mt-3">
                    {element.options?.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          className="p-2 border-gray-300 mr-2"
                          checked={(formState[element.id] as string[]).includes(option)}
                          onChange={(e) => {
                            const currentValues = formState[element.id] as string[];
                            const updatedValues = e.target.checked
                              ? [...currentValues, option]
                              : currentValues.filter(value => value !== option);

                            handleChange(element.id, updatedValues);
                          }}
                        />
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {element.type === ItemTypes.RADIO_GROUP && (
                <div className="flex items-start mb-2">
                  <label className="font-semibold mb-2 mt-3">{element.label}</label>
                  <div className="flex flex-col ml-4 mt-3">
                    {element.options?.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          className="p-2 border border-gray-300 mr-2"
                          name={element.id}
                          checked={formState[element.id] === option}
                          onChange={() => handleChange(element.id, option)}
                        />
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {element.type === ItemTypes.SELECT && (
                <div className="flex items-start mb-2">
                  <label className="font-semibold mb-2 mt-3">{element.label}</label>
                  <select
                    className="p-2 border ml-3 border-gray-300 rounded w-60"
                    value={formState[element.id] as string}
                    onChange={(e) => handleChange(element.id, e.target.value)}
                  >
                    <option value="" selected>Select option</option>
                    {element.options?.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              )}

              {element.type === ItemTypes.PASSWORD && (
                <input
                  type="password"
                  className="p-2 border border-gray-300 w-full"
                  value={formState[element.id] as string}
                  onChange={(e) => handleChange(element.id, e.target.value)}
                />
              )}

              {element.type === ItemTypes.FILE_UPLOAD && (
                <input
                  type="file"
                  className="p-2 border border-gray-300 w-full"
                  onChange={(e) => handleChange(element.id, e.target.files?.[0]?.name || '')}
                />
              )}

              {element.type === ItemTypes.MULTI_FILE_UPLOAD && (
                <input
                  type="file"
                  multiple
                  className="p-2 border border-gray-300 w-full"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).map(file => file.name).join(',');
                    handleChange(element.id, files);
                  }}
                />
              )}

              {element.type === ItemTypes.GROUP && (
                <div className="p-2 border border-gray-300">
                  Group Content
                </div>
              )}

              {element.type === ItemTypes.TOGGLE && (
                <input
                  type="checkbox"
                  className="p-2 border border-gray-300"
                  checked={formState[element.id] === 'true'}
                  onChange={(e) => handleChange(element.id, e.target.checked ? 'true' : 'false')}
                />
              )}
            </div>
          );
        })}
        <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Close
        </button>
        <button className="p-2 bg-green-500 text-white ml-3 rounded mr-2"
                    onClick={onSave}

        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default Modal;
