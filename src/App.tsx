import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import FormList from './components/FormList';
import DragDropContext from './components/DragDropContext';
import Sidebar from './components/Sidebar';
import FormBuilder from './components/FormBuilder';

type Form = {
  id: string;
  name: string;
  type: string;
};

const App: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([
    { id: '1', name: 'Form 1', type: 'Type 1' },
    // Add more initial forms if needed
  ]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Form Components</h1>
            <FormList forms={forms} setForms={setForms} />
          </div>
        }
      />
      <Route
        path="/form-builder/:id"
        element={
          <DragDropContext>
            <div className="flex h-screen mt-8">
              <Sidebar />
              <FormBuilder forms={forms} setForms={setForms} />
            </div>
          </DragDropContext>
        }
      />
    </Routes>
  );
};

export default App;
