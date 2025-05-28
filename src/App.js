import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import AdminRecommendationsPage from './pages/AdminRecommendationsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDonationsPage from './pages/AdminDonationsPage';
import AdminProjectsPage from './pages/AdminProjectsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/recommendations" 
              element={
                <ProtectedRoute>
                  <AdminRecommendationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/donations" 
              element={
                <ProtectedRoute>
                  <AdminDonationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects" 
              element={
                <ProtectedRoute>
                  <AdminProjectsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;