import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const FourStakeholdersSection = () => {
  const { t } = useLanguage();

  const forces = [
    {
      tag: t('fourForces.citizen.tag', 'REPORT'),
      title: t('fourForces.citizen.title', 'Citizens'),
      desc: t('fourForces.citizen.desc', 'Report what is happening in your community.')
    },
    {
      tag: t('fourForces.government.tag', 'VALIDATE'),
      title: t('fourForces.government.title', 'Government'),
      desc: t('fourForces.government.desc', 'Validate, prioritize and monitor societal challenges.')
    },
    {
      tag: t('fourForces.university.tag', 'INNOVATE'),
      title: t('fourForces.university.title', 'Universities'),
      desc: t('fourForces.university.desc', 'Turn real problems into research and innovation projects.')
    },
    {
      tag: t('fourForces.industry.tag', 'IMPLEMENT'),
      title: t('fourForces.industry.title', 'Industry'),
      desc: t('fourForces.industry.desc', 'Provide mentorship, resources and pathways to scale.')
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A' }}>
            {t('fourForces.heading', 'One Platform. Four Forces. One Goal.')}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {forces.map((f, idx) => (
            <div
              key={idx}
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '30px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: '800', padding: '4px 10px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: '6px' }}>
                {f.tag}
              </span>
              <h3 style={{ margin: '16px 0 10px 0', fontSize: '20px', fontWeight: '900', color: '#0F172A' }}>
                {f.title}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
