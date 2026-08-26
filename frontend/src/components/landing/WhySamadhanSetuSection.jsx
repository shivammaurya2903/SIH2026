import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const WhySamadhanSetuSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      title: t('whyUs.b1.title', 'Community-driven'),
      desc: t('whyUs.b1.desc', 'Real problems originate directly from local citizens.')
    },
    {
      title: t('whyUs.b2.title', 'Location-aware'),
      desc: t('whyUs.b2.desc', 'Challenges are tied to district, block, village, and GPS.')
    },
    {
      title: t('whyUs.b3.title', 'AI-assisted'),
      desc: t('whyUs.b3.desc', 'Problems are analyzed and categorized intelligently.')
    },
    {
      title: t('whyUs.b4.title', 'Collaborative'),
      desc: t('whyUs.b4.desc', 'Government, academia, and industry work together.')
    },
    {
      title: t('whyUs.b5.title', 'Transparent'),
      desc: t('whyUs.b5.desc', 'Citizens can follow the journey of their reports.')
    },
    {
      title: t('whyUs.b6.title', 'Impact-focused'),
      desc: t('whyUs.b6.desc', 'Projects are connected to measurable outcomes.')
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A' }}>
            {t('whyUs.heading', 'Why SamadhanSetu?')}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {benefits.map((b, idx) => (
            <div
              key={idx}
              style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <h4 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: '800', color: '#1D4ED8' }}>
                {b.title}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
