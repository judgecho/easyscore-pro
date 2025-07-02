import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Pages
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import Dashboard from './pages/Dashboard';
import ExamManagement from './pages/ExamManagement';
import QuestionManagement from './pages/QuestionManagement';
import StudentManagement from './pages/StudentManagement';
import CategoryManagement from './pages/CategoryManagement';
import ExamTaking from './pages/ExamTaking';
import Results from './pages/Results';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
          } 
        />
        <Route 
          path="/student-login" 
          element={
            !isAuthenticated ? <StudentLogin /> : <Navigate to="/exam" replace />
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Admin/Teacher Routes */}
          {user?.role !== 'student' && (
            <>
              <Route path="exams" element={<ExamManagement />} />
              <Route path="questions/:examId" element={<QuestionManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="results" element={<Results />} />
            </>
          )}
          
          {/* Student Routes */}
          {user?.role === 'student' && (
            <>
              <Route path="exam" element={<ExamTaking />} />
              <Route path="results" element={<Results />} />
            </>
          )}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App; 