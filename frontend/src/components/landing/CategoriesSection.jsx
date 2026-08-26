import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { CATEGORIES } from '../../data/categories';

export const CategoriesSection = () => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
            {t('categorySection.heading', 'Challenges We Can Solve Together')}
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B' }}>
            {t('categorySection.sub', 'Key societal problem domains across Jharkhand')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/challenges?category=${cat.id}`)}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                {isHi ? cat.nameHi : cat.nameEn}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
