import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const IllustrativeJourneySection = () => {
  const { t } = useLanguage();

  const journeySteps = [
    'Community reports local water-quality concern in Kanke block',
    'Government official validates problem report & sets High priority',
    'Groq AI identifies category: Water Infrastructure & Sanitation',
    'BIT Mesra Environmental Engg R&D department is matched',
    'Student + Faculty team develops low-cost filtration prototype',
    'Industry CSR sponsor provides ₹5 Lakh testing & scaling grant',
    'Field pilot deployed in 3 Gram Panchayats',
    'Impact measured: Clean water access for 4,250 residents'
  ];

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', background: '#FEF3C7', color: '#B45309', borderRadius: '9999px', fontSize: '12px', fontWeight: '800', marginBottom: '10px' }}>
            {t('illustrative.badge', 'ILLUSTRATIVE EXAMPLE')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A' }}>
            {t('illustrative.heading', 'See How One Problem Can Become a Solution')}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {journeySteps.map((stepText, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: idx === journeySteps.length - 1 ? '#ECFDF5' : '#EFF6FF',
                  color: idx === journeySteps.length - 1 ? '#059669' : '#1D4ED8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '13px',
                  flexShrink: 0
                }}
              >
                {idx + 1}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                {stepText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
