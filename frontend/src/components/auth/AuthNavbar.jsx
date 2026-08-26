import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export const AuthNavbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const isHi = language === 'hi';

  return (
    <header
      style={{
        height: '66px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          width: '100%'
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
              JHARKHAND SOCIETAL INNOVATION • SIH26043
            </div>
          </div>
        </Link>

        {/* Right Navigation & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleLanguage}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1D4ED8',
              fontWeight: '800',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            🌐 {isHi ? 'EN | हिंदी' : 'हिंदी | EN'}
          </button>

          <Link
            to="/"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#F1F5F9',
              color: '#334155',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '13px',
              border: '1px solid #E2E8F0',
              transition: 'background 0.2s ease'
            }}
          >
            ← {isHi ? 'मुख्य पृष्ठ' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </header>
  );
};
