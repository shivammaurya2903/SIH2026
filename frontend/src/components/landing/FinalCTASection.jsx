import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export const FinalCTASection = () => {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)', color: '#FFFFFF', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', marginBottom: '16px', color: '#FFFFFF' }}>
          {t('finalCta.heading', 'Have a Problem Worth Solving?')}
        </h2>
        <p style={{ fontSize: '17px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '32px' }}>
          {t('finalCta.desc', 'Your local challenge could become the next research project, innovation or deployable solution.')}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          <Link
            to="/citizen/report"
            style={{
              padding: '14px 28px',
              background: '#1D4ED8',
              color: '#FFFFFF',
              borderRadius: '10px',
              fontWeight: '800',
              fontSize: '16px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.4)'
            }}
          >
            {t('hero.reportCta', '📄 Report a Problem')}
          </Link>

          <Link
            to="/challenges"
            style={{
              padding: '14px 28px',
              background: 'transparent',
              color: '#FFFFFF',
              border: '2px solid #475569',
              borderRadius: '10px',
              fontWeight: '800',
              fontSize: '16px',
              textDecoration: 'none'
            }}
          >
            {t('hero.exploreCta', '🔎 Explore Challenges')}
          </Link>
        </div>
      </div>
    </section>
  );
};
