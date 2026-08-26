import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { getRoleDashboard } from '../../auth/roleRoutes';

export const MobileNavDrawer = ({ isOpen, onClose }) => {
  const { user, role, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const isHi = language === 'hi';

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.5)',
          zIndex: 9998
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(85vw, 320px)',
          height: '100vh',
          background: '#FFFFFF',
          zIndex: 9999,
          boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
          <span style={{ fontWeight: '900', fontSize: '16px', color: '#1D4ED8' }}>⚡ SamadhanSetu</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: '800', cursor: 'pointer', color: '#475569' }}>✕</button>
        </div>

        <div style={{ padding: '16px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Link to="/" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
            {isHi ? 'मुख्य पृष्ठ' : 'Home'}
          </Link>
          <Link to="/challenges" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
            {isHi ? 'चुनौतियां देखें' : 'Explore Challenges'}
          </Link>
          <Link to="/citizen/report" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
            {isHi ? 'समस्या दर्ज करें' : 'Report a Problem'}
          </Link>
          <Link to="/analytics" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
            {isHi ? 'राज्य विश्लेषण' : 'State Analytics'}
          </Link>
          <Link to="/impact" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
            {isHi ? 'प्रभाव केंद्र' : 'Impact Center'}
          </Link>

          {user && (
            <>
              <div style={{ padding: '16px 24px 6px 24px', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
                {isHi ? 'कार्यस्थान' : 'Workspace'}
              </div>
              <Link to={getRoleDashboard(role)} onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#1D4ED8', fontWeight: '700', borderBottom: '1px solid #F1F5F9' }}>
                ⚡ {isHi ? 'डैशबोर्ड' : 'Dashboard'} ({role})
              </Link>
              <Link to="/notifications" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
                🔔 {isHi ? 'सूचनाएं' : 'Notifications'}
              </Link>
              <Link to="/profile" onClick={onClose} style={{ padding: '12px 24px', textDecoration: 'none', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #F1F5F9' }}>
                👤 {isHi ? 'प्रोफ़ाइल' : 'Profile'}
              </Link>
            </>
          )}

          <div style={{ padding: '20px 24px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: '#F8FAFC' }}>
            <button
              onClick={() => { toggleLanguage(); }}
              style={{ padding: '12px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1D4ED8', fontWeight: '700', cursor: 'pointer' }}
            >
              🌐 {isHi ? 'EN | Switch to English' : 'हिंदी | Switch to Hindi'}
            </button>

            {user ? (
              <button
                onClick={() => { logout(); onClose(); }}
                style={{ padding: '12px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontWeight: '700', cursor: 'pointer' }}
              >
                🚪 {isHi ? 'लॉग आउट' : 'Log Out'} ({user.name || role})
              </button>
            ) : (
              <>
                <Link to="/auth/login" onClick={onClose} style={{ padding: '12px', textAlign: 'center', borderRadius: '8px', background: '#1D4ED8', color: '#FFFFFF', fontWeight: '700', textDecoration: 'none' }}>
                  🔑 {isHi ? 'साइन इन' : 'Sign In'}
                </Link>
                <Link to="/auth/register" onClick={onClose} style={{ padding: '12px', textAlign: 'center', borderRadius: '8px', background: '#10B981', color: '#FFFFFF', fontWeight: '700', textDecoration: 'none' }}>
                  🚀 {isHi ? 'मंच से जुड़ें' : 'Join Platform'}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
