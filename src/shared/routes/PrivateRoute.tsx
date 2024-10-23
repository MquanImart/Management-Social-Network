import React from 'react';
import { Navigate } from 'react-router-dom';

// Component kiểm tra token và điều hướng nếu không có
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage (hoặc localStorage nếu bạn dùng nó)

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  // Nếu có token, cho phép truy cập vào trang
  return children;
};

export default PrivateRoute;
