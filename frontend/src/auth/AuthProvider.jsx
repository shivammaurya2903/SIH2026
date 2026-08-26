import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { AuthApi } from '../api/auth.api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jhar_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('jhar_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('jhar_token');
      if (storedToken) {
        try {
          const res = await AuthApi.getMe();
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('jhar_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.warn('Auth validation failed:', err.message);
          localStorage.removeItem('jhar_token');
          localStorage.removeItem('jhar_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await AuthApi.login(email, password);
    if (res.success && res.data) {
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('jhar_token', newToken);
      localStorage.setItem('jhar_user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return userData;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('jhar_token');
    localStorage.removeItem('jhar_user');
    setToken(null);
    setUser(null);
    window.location.href = '/auth/login';
  };

  const refreshUser = async () => {
    try {
      const res = await AuthApi.getMe();
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('jhar_user', JSON.stringify(res.data));
      }
    } catch (err) {
      console.warn('Refresh user error:', err.message);
    }
  };

  const role = user ? user.role : null;

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
