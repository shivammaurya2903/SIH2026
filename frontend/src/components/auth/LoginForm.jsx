import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { getRoleDashboard } from '../../auth/roleRoutes';
import { PasswordInput } from './PasswordInput';

export const LoginForm = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      const targetDashboard = getRoleDashboard(user.role);
      const destination = location.state?.from?.pathname || targetDashboard;
      navigate(destination, { replace: true });
    } catch (err) {
      if (err.data && err.data.isPending) {
        navigate('/auth/pending-verification');
        return;
      }
      setError(err.message || (isHi ? 'अमान्य ईमेल या पासवर्ड मान' : 'Invalid email or password credentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
          {isHi ? 'पुनः स्वागत है' : 'Welcome Back'}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px' }}>
          {isHi ? 'अपने समाधानसेतु कार्यस्थान तक पहुँचने के लिए साइन इन करें' : 'Sign in to continue to your SamadhanSetu workspace.'}
        </p>
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', marginBottom: '20px', border: '1px solid #FECACA' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
            {isHi ? 'ईमेल पता' : 'Email Address'} *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="officer@jharkhand.gov.in"
            style={{ width: '100%', height: '48px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
            {isHi ? 'पासवर्ड' : 'Password'} *
          </label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            height: '48px',
            background: '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
            transition: 'background 0.2s ease'
          }}
        >
          {loading ? (isHi ? 'प्रमाणित किया जा रहा है...' : 'Signing in...') : (isHi ? 'साइन इन करें' : 'Sign In')}
        </button>
      </form>

      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
        {isHi ? 'खाता नहीं है?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: '800', cursor: 'pointer', padding: 0, fontSize: '14px' }}
        >
          {isHi ? 'नया खाता बनाएं →' : 'Create Account →'}
        </button>
      </div>
    </div>
  );
};
