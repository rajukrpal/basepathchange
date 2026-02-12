import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import OTPVerificationPage from '@/pages/auth/OTPVerificationPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import SignupPage from '@/pages/auth/SignupPage';
import { BASE_PATH } from './lib/apiConfig';


function App() {
  return (
    <Router basename={BASE_PATH}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Baaki routes yahan add karein */}
        <Route path="*" element={<div className="flex h-screen items-center justify-center text-2xl">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;