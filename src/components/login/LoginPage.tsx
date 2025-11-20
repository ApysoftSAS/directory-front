import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LoginCard } from './LoginCard';
import { ForgotPasswordDialog } from './ForgotPasswordDialog';
import { Footer } from '../footer/footer';
import { UserRole } from '../types';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <LoginCard
          onForgotPassword={() => setShowForgotPassword(true)}
          onLoginSuccess={onLoginSuccess}
        />
        <Footer />
      </motion.div>

      <ForgotPasswordDialog
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};
