import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuthStore from './useAuthStore';
import AuthService from '../services/AuthService';

const PrivateRoute = ({ element: Element, allowedRoles, redirectTo, ...rest }) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const role = AuthService.role();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  // Kiểm tra xem vai trò của người dùng có phù hợp không
  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} />;
  }

  // Nếu đủ điều kiện, trả về component đã cho
  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
