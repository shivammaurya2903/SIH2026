import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export const DistrictInfoCard = ({ district, onClose }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  // Escape key handler to close card
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!district) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '18px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.15)',
        width: 'min(280px, 90%)',
        zIndex: 30,
        boxSizing: 'border-box'
      }}
    >
      {/* Top Bar with District Name & X Close Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: '#0F172A' }}>
            {isHi ? district.nameHi : district.name}
          </h4>
          <span style={{ fontSize: '10px', color: '#64748B', fontWeight: '700' }}>
            {isHi ? 'जिला नवाचार डेटा' : 'District Innovation Profile'}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close district info card"
          style={{
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '900',
            color: '#64748B',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
        >
          ✕
        </button>
      </div>

      {/* Metrics List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
          <span>{isHi ? 'चुनौतियां:' : 'Challenges:'}</span>
          <strong style={{ color: '#1D4ED8' }}>{district.challenges}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
          <span>{isHi ? 'सक्रिय परियोजनाएं:' : 'Active Projects:'}</span>
          <strong style={{ color: '#10B981' }}>{district.projects}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
          <span>{isHi ? 'तैनात समाधान:' : 'Solutions Deployed:'}</span>
          <strong style={{ color: '#F59E0B' }}>{district.deployed}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
          <span>{isHi ? 'नागरिक सहभागिता:' : 'Citizens Engaged:'}</span>
          <strong style={{ color: '#0F172A' }}>{district.citizens}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
          <span>{isHi ? 'प्रभाव स्कोर:' : 'Impact Score:'}</span>
          <strong style={{ color: '#7C3AED' }}>{district.score}</strong>
        </div>
      </div>

      {/* View District Details Action Button */}
      <button
        onClick={() => navigate(`/challenges?district=${district.id}`)}
        style={{
          width: '100%',
          padding: '10px',
          background: '#1D4ED8',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '800',
          fontSize: '13px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)'
        }}
      >
        {t('hero.viewDistrictDetails', 'View District Details →')}
      </button>
    </div>
  );
};
