import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuthStore from './useAuthStore';
import AuthService from '../services/AuthService';

const PrivateRoute = ({ element: Element, allowedRoles, redirectTo, ...rest }) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const role = AuthService.role();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
