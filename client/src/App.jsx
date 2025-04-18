import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { CssBaseline } from '@mui/material';

import Login from './pages/Account/Login';
import ForgotPassword from './pages/Account/ForgotPassword';
import Topbar from './pages/global/Topbar';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';
import User from './pages/Menu/User';

const App = () => {
  const { isAuthenticated, userData } = useAuth();

  // Function to determine where to redirect based on user role
  const getRedirectPath = () => {
    if (userData.role === 'ADMIN') return '/admin-dashboard';
    return '/';
  };

  return (
    <Router>
      <CssBaseline />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <main style={{ flexGrow: 1, overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
          {isAuthenticated && <Topbar className="topbar" />}
          <Routes>
            {/* Redirect logged-in users from the login page */}
            <Route path="/login" element={isAuthenticated ? <Navigate to={getRedirectPath()} /> : <Login />} />
            <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to={getRedirectPath()} />} />
            <Route path="/admin-dashboard" element={isAuthenticated && userData.role === 'ADMIN' ? <DashboardAdmin /> : <Navigate to="/" />} />
            <Route path="/user" element={isAuthenticated && userData.role === 'ADMIN' ? <User /> : <Navigate to="/" />} />
            
            {/* FORGOT PASSWORD SECTION */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
