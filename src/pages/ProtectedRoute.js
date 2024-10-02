import { Navigate } from 'react-router-dom';
export const ProtectedRoute = ({ name }) => {  
  return localStorage.getItem('isLogin') === 'true' ? name : <Navigate to="/login" />;
};
export const LoginLessRoute= ({ name }) => {
  return localStorage.getItem('isLogin') === 'false' ? name : <Navigate to="/dashboard" />;
};
