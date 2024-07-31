import React, { useState } from "react";
import FormComponent from "./FormComponent";


const FormList: React.FC = () => {
    // Initial form list state (example data)
    const [forms, setForms] = useState<{ id: string, name: string, type: string }[]>([
      { id: '1', name: 'Form 1', type: 'complex' },
      { id: '2', name: 'Form 2', type: 'access' },
      { id: '3', name: 'Form 3', type: 'patient' },
      { id: '4', name: 'Form 4', type: 'patient' },

      // Add more forms as needed
    ]);
  
    // Handle delete functionality
    const handleDelete = (id: string) => {
      setForms((prevForms) => prevForms.filter(form => form.id !== id));
    };

  return (
    <div className="p-4 flex flex-row flex-wrap flex-initial grow">
       {forms.map(form => (
        <FormComponent
          key={form.id}
          id={form.id}
          name={form.name}
          type={form.type}
          onDelete={handleDelete} // Pass delete handler as a prop
        />
      ))}
    </div>
  );
};

export default FormList;
