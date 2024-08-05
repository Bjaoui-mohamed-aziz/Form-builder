import React from 'react';
import FormComponent from './FormComponent';
import { FormElement } from './types';

type FormListProps = {
  forms: { id: string;
    name: string;
    type: string;
  }[];
  
  setForms: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
    type: string;
    elements: FormElement[];

  }[]>>;
  onEdit: (id: string) => void; // Add edit handler prop

};

const FormList: React.FC<FormListProps> = ({ forms, setForms, onEdit }) => {
  const handleDelete = (id: string) => {
    setForms(prevForms => prevForms.filter(form => form.id !== id));
  };

  return (
    <div className='flex flex-wrap'>
      {forms.map(form => (
        <FormComponent
          key={form.id}
          id={form.id}
          name={form.name}
          type={form.type}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default FormList;
