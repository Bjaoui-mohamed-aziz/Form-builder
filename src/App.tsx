import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import FormList from "./components/FormList";
import DragDropContext from "./components/DragDropContext";
import Sidebar from "./components/Sidebar";
import FormBuilder from "./components/FormBuilder";
import { FormElement } from "./components/types";

const App: React.FC = () => {
  const [forms, setForms] = useState<{ id: string; name: string; type: string; elements: FormElement[]  }[]>([
    { id: "1", name: "Form 1", type: "complex", elements: [] },
    // Add initial forms as needed
  ]);

  const [currentForm, setCurrentForm] = useState<{ id: string; name: string; type: string; elements: FormElement[] } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleAddComponent = () => {
    const newForm = { id: (forms.length + 1).toString(), name: "", type: "", elements: [] };
    setCurrentForm(newForm);
    navigate("/form-builder");
  };

  const handleEditComponent = (id: string) => {
    const formToEdit = forms.find(form => form.id === id);
    if (formToEdit) {
      setCurrentForm(formToEdit);
      navigate(`/form-builder/${id}`);
    }
  };

  const handlePreviewComponent = (id: string) => {
    const formToPreview = forms.find(form => form.id === id);
    if (formToPreview) {
      setCurrentForm(formToPreview);
      navigate(`/form-preview/${id}`);
    }
  };

  useEffect(() => {
    if (id) {
      const formToEdit = forms.find(form => form.id === id);
      if (formToEdit) {
        setCurrentForm(formToEdit);
      } else {
        navigate("/"); // Redirect to the home page if form is not found
      }
    } else {
      setCurrentForm(null);
    }
  }, [id, forms, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Form Components</h1>
            <button
              className="p-2 bg-[#233368] text-white ml-10 rounded"
              onClick={handleAddComponent}
            >
              Add Component
            </button>
<FormList
  forms={forms}
  setForms={setForms}
  onEdit={handleEditComponent}
/>
          </div>
        }
      />
      <Route
        path="/form-builder"
        element={
          <DragDropContext>
            <div className="flex h-screen mt-8">
              <Sidebar />
              <FormBuilder
                forms={forms}
                setForms={setForms}
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
              />
            </div>
          </DragDropContext>
        }
      />
      <Route
        path="/form-builder/:id"
        element={
          <DragDropContext>
            <div className="flex h-screen mt-8">
              <Sidebar />
              <FormBuilder
                forms={forms}
                setForms={setForms}
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
              />
            </div>
          </DragDropContext>
        }
      />
    </Routes>
  );
};

export default App;
