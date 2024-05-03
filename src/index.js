import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from './customer/routes/AppRoutes';
import { divide } from 'lodash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
          <Routes>
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
          
      </Router>
  </React.StrictMode>
);

