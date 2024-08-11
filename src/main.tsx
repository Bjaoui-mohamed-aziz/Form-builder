// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Comp from './forms/Comp'; // Adjust path as necessary
import './index.css'; // Ensure Tailwind styles are included

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Comp />
    </BrowserRouter>
  </React.StrictMode>
);
