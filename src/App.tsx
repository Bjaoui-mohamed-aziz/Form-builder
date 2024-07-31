// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormList from './components/FormList';
import DragDropContext from './components/DragDropContext';
import Sidebar from './components/Sidebar';
import FormBuilder from './components/FormBuilder';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Form Components</h1>
            <FormList />
          </div>
        }
      />
      <Route
        path="/form-builder"
        element={
          <DragDropContext>
            <div className="flex h-screen mt-8">
              <Sidebar />
              <FormBuilder />
            </div>
          </DragDropContext>
        }
      />
      
    </Routes>
  );
};

export default App;
