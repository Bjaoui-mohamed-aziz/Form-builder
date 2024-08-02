import React from 'react';
import FormComponent from './FormComponent';

type FormListProps = {
  forms: {
    id: string;
    name: string;
    type: string;
  }[];
  setForms: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
    type: string;
  }[]>>;
};

const FormList: React.FC<FormListProps> = ({ forms, setForms }) => {
  const handleDelete = (id: string) => {
    setForms(prevForms => prevForms.filter(form => form.id !== id));
  };

  return (
    <div>
      {forms.map(form => (
        <FormComponent
          key={form.id}
          id={form.id}
          name={form.name}
          type={form.type}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FormList;
