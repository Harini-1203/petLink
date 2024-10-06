import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import { AuthProvider } from './components/AuthProvider';

localStorage.removeItem('token');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);


