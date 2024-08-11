import React, { useState } from "react";
import FormComponent from "./FormComponent";
import ModalPreview from "./ModalPreview"; // Import the ModalPreview component
import { FormElement, Condition } from "./types"; // Adjust import paths as needed

type FormListProps = {
  forms: {
    id: string;
    name: string;
    type: string;
    elements: FormElement[];
    conditions: Condition[];
  }[];
  setForms: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
        type: string;
        elements: FormElement[];
        conditions: Condition[];
      }[]
    >
  >;
  onEdit: (id: string) => void;
};

const FormList: React.FC<FormListProps> = ({ forms, setForms, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<{
    id: string;
    name: string;
    type: string;
    elements: FormElement[];
    conditions: Condition[];
  } | null>(null);

  const handleDelete = (id: string) => {
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));
  };

  const handlePreview = (id: string) => {
    const form = forms.find((form) => form.id === id);
    if (form) {
      setSelectedForm(form);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
  };

  const handleSaveForm = () => {
    // Implement form save logic here
  };

  return (
    <div className="flex flex-wrap">
      {forms.map((form) => (
        <FormComponent
          key={form.id}
          id={form.id}
          name={form.name}
          type={form.type}
          onDelete={handleDelete}
          onEdit={onEdit}
          onPreview={handlePreview} // Pass preview handler
        />
      ))}

      {isModalOpen && selectedForm && (
        <ModalPreview
          componentName={selectedForm.name}
          componentType={selectedForm.type}
          conditions={selectedForm.conditions}
          formElements={selectedForm.elements}
          onClose={handleCloseModal}
          onSave={handleSaveForm}
          onUpdateElement={(id, value) => {
            setSelectedForm((prev) =>
              prev
                ? {
                    ...prev,
                    elements: prev.elements.map((el) =>
                      el.id === id ? { ...el, value } : el
                    ),
                  }
                : null
            );
          }}
        />
      )}
    </div>
  );
};

export default FormList;
