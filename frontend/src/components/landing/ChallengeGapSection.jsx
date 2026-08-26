import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ChallengeGapSection = () => {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <span style={{ display: 'inline-block', padding: '4px 12px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: '9999px', fontSize: '12px', fontWeight: '800', marginBottom: '12px' }}>
          {t('gap.badge', 'THE CHALLENGE GAP')}
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A', marginBottom: '16px' }}>
          {t('gap.heading', 'From Community Problems to Real Solutions')}
        </h2>
        <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.7', marginBottom: '40px' }}>
          {t('gap.text', 'Citizens identify problems first. Government understands public needs. Universities have research and technical expertise. Students bring innovation and experimentation. Industry brings technology, resources and scale. But these capabilities are often disconnected. SamadhanSetu connects them.')}
        </p>

        {/* Visual Pipeline */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '800' }}>
          <span style={{ padding: '10px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', color: '#0F172A' }}>👥 COMMUNITY</span>
          <span style={{ color: '#94A3B8' }}>→</span>
          <span style={{ padding: '10px 18px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626' }}>🚨 PROBLEM</span>
          <span style={{ color: '#94A3B8' }}>→</span>
          <span style={{ padding: '10px 18px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', color: '#1D4ED8' }}>🤝 COLLABORATION</span>
          <span style={{ color: '#94A3B8' }}>→</span>
          <span style={{ padding: '10px 18px', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '10px', color: '#7C3AED' }}>🛠️ SOLUTION</span>
          <span style={{ color: '#94A3B8' }}>→</span>
          <span style={{ padding: '10px 18px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', color: '#059669' }}>🌟 IMPACT</span>
        </div>
      </div>
    </section>
  );
};
