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
            {/* <Route
              path=""
            />
            <Route
              path="/login"
              element={
                <div>
                  nigga
                </div>
              }
            /> */}
          </Routes>
          
      </Router>
  </React.StrictMode>
);

