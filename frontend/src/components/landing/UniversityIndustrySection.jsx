import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const UniversityIndustrySection = () => {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A', marginBottom: '40px' }}>
          {t('uniIndustry.heading', 'From Research to Real-World Solutions')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
          <div style={{ background: '#F8FAFC', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
            <span style={{ fontSize: '32px' }}>🎓</span>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1D4ED8', margin: '12px 0 8px 0' }}>
              {t('uniIndustry.uniTitle', 'UNIVERSITIES & COLLEGES')}
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
              {t('uniIndustry.uniDesc', 'Research • Faculty Mentors • Student Innovators • R&D Labs • Prototype Testing')}
            </p>
          </div>

          <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>+</div>

          <div style={{ background: '#F8FAFC', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
            <span style={{ fontSize: '32px' }}>🏭</span>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#F59E0B', margin: '12px 0 8px 0' }}>
              {t('uniIndustry.indTitle', 'INDUSTRY & CSR PARTNERS')}
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
              {t('uniIndustry.indDesc', 'Technology • Mentorship • CSR Funding • Field Testing • Scaling • Implementation')}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '16px 24px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', display: 'inline-block', fontSize: '15px', fontWeight: '900', color: '#059669' }}>
          = {t('uniIndustry.resultTitle', 'DEPLOYABLE SOCIETAL SOLUTION')}
        </div>
      </div>
    </section>
  );
};
