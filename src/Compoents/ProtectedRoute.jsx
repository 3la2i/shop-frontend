import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from './auth';

export default function ProtectedRoute() {
  const isAuthenticated = checkAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    
    
  }
  
  return <Outlet />;
}

