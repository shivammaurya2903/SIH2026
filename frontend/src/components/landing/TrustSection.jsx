import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const TrustSection = () => {
  const { t } = useLanguage();

  const trustItems = [
    t('trust.t1', 'Role-based access'),
    t('trust.t2', 'Evidence-backed reports'),
    t('trust.t3', 'Structured validation'),
    t('trust.t4', 'Transparent status tracking'),
    t('trust.t5', 'Controlled stakeholder access'),
    t('trust.t6', 'District-level visibility')
  ];

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A', marginBottom: '40px' }}>
          {t('trust.heading', 'Built for Trust')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #E2E8F0',
                fontSize: '15px',
                fontWeight: '800',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <span>✓</span>
              <span style={{ color: '#0F172A' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
