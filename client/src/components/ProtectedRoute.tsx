import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 학생인 경우 학생 전용 경로만 접근 가능
  if (user?.role === 'student') {
    const currentPath = window.location.pathname;
    const allowedPaths = ['/dashboard', '/exam', '/results'];
    
    if (!allowedPaths.some(path => currentPath.startsWith(path))) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 