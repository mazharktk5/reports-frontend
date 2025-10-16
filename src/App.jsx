import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateReport from './pages/NewReportPage';
import EditReport from './pages/EditReportPage';
import RegisterPage from './pages/RegisterPage';
import { getToken } from './utils/auth';
import Main from './components/admin/Main';

const PrivateRoute = ({ children }) => getToken() ? children : <Navigate to="/login" />;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/create-report" element={<PrivateRoute><CreateReport /></PrivateRoute>} />
          <Route path="/edit-report/:id" element={<PrivateRoute><EditReport /></PrivateRoute>} />
          <Route path="/admin/*" element={<Main />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
