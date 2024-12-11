import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import VerifyOtp from './components/VerifyOtp';
import Dashboard from './components/Dashbord';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* Protected Routes */}
            <Route  element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project" element={<ProtectedRoute />} />
              <Route path="/*" element={<Dashboard />} />
            </Route>
          </Routes>

          {/* Toast container */}
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
