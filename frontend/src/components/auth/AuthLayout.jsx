import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthNavbar } from './AuthNavbar';
import { AuthVisualPanel } from './AuthVisualPanel';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './AuthShell.css';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname.includes('/auth/register');
  const mode = isRegister ? 'register' : 'login';

  const handleSwitchToRegister = () => {
    navigate('/auth/register');
  };

  const handleSwitchToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="auth-page-container">
      {/* Clean Dedicated Auth Navbar */}
      <AuthNavbar />

      {/* Centered Viewport Container */}
      <main className="auth-viewport">
        <div className="auth-viewport-glow" />

        {/* Master Auth Shell with Two Primary Sections */}
        <div className={`auth-shell ${mode === 'login' ? 'login-mode' : 'register-mode'}`}>
          <section className="auth-visual">
            <AuthVisualPanel mode={mode} />
          </section>

          <section className="auth-form">
            {mode === 'login' ? (
              <LoginForm onSwitchToRegister={handleSwitchToRegister} />
            ) : (
              <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
