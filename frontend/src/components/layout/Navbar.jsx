import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { getRoleDashboard } from '../../auth/roleRoutes';
import { MobileNavDrawer } from './MobileNavDrawer';

export const Navbar = () => {
  const { user, role, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            height: '68px'
          }}
        >
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px' }}>
              ⚡
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', lineHeight: '1.1' }}>
                SamadhanSetu
              </div>
              <div style={{ fontSize: '10px', fontWeight: '800', color: '#1D4ED8', letterSpacing: '0.5px' }}>
                JHARKHAND INNOVATION
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <Link to="/challenges" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '14px' }}>
              {isHi ? 'चुनौतियां देखें' : 'Explore Challenges'}
            </Link>
            <a href="#how-it-works" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '14px' }}>
              {isHi ? 'कार्यप्रणाली' : 'How It Works'}
            </a>
            <Link to="/analytics" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '14px' }}>
              {isHi ? 'राज्य विश्लेषण' : 'Analytics'}
            </Link>
            <Link to="/impact" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '14px' }}>
              {isHi ? 'प्रभाव एवं पारदर्शिता' : 'Trust & Impact'}
            </Link>
          </nav>

          {/* Desktop Controls */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleLanguage}
              style={{ padding: '8px 14px', borderRadius: '8px', background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
            >
              🌐 {isHi ? 'EN | हिंदी' : 'हिंदी | EN'}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => navigate(getRoleDashboard(role))}
                  style={{ padding: '8px 14px', borderRadius: '8px', background: '#1D4ED8', color: '#FFFFFF', fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer' }}
                >
                  ⚡ Dashboard ({role})
                </button>
                <button
                  onClick={logout}
                  style={{ padding: '8px 14px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/auth/login" style={{ padding: '8px 16px', textDecoration: 'none', color: '#1D4ED8', fontWeight: '800', fontSize: '14px' }}>
                  {isHi ? 'साइन इन' : 'Sign In'}
                </Link>
                <Link to="/auth/register" style={{ padding: '8px 16px', textDecoration: 'none', background: '#10B981', color: '#FFFFFF', borderRadius: '8px', fontWeight: '800', fontSize: '14px', boxShadow: '0 2px 6px rgba(16, 185, 129, 0.25)' }}>
                  {isHi ? 'मंच से जुड़ें' : 'Join Platform'}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="mobile-only"
            aria-label="Open Navigation Menu"
            style={{
              display: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE',
              fontSize: '20px',
              fontWeight: '900',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>
      </header>

      <MobileNavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
