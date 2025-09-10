import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages & Components
import HomePage from '../Pages/HomePage';
import Login from '../components/Login';
import Register from '../components/Register';
import AdminDashboard from '../components/AdminDashboard';
import CarRentalDashboard from '../components/CarRentalDashboard';
import AutoLocPremiumDashboard from '../components/AutoLocPremiumDashboard';
import Layout from '../components/Layout';
import AddCompany from '../components/AddCompany';

// ============================
// Protected Route Component
// ============================
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// ============================
// App Router
// ============================
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/car-rental" 
          element={
            <ProtectedRoute>
              <Layout>
                <CarRentalDashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
  path="/auto-loc-premium-dashboard" 
          element={
            <PublicRoute>
              <Layout>
                <AutoLocPremiumDashboard />
              </Layout>
            </PublicRoute>
          } 
        />

        {/* Add Company */}
        <Route 
          path="/add-company" 
          element={
            <PublicRoute>
              <AddCompany />
            </PublicRoute>
          } 
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
