import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('sessionToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const GuestGuard = ({ children }) => {
  const token = localStorage.getItem('sessionToken');
  if (token) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestGuard><WelcomePage /></GuestGuard>} />
        <Route path="/login" element={<GuestGuard><LoginPage /></GuestGuard>} />
        <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
