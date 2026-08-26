import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AIIntelligenceSection = () => {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
        <div>
          <span style={{ padding: '4px 10px', background: '#F5F3FF', color: '#7C3AED', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
            ⚡ Groq Llama-3 70B AI Engine
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A', marginTop: '12px', marginBottom: '16px' }}>
            {t('aiSection.heading', 'Smart Triage. Better Matching.')}
          </h2>
          <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
            {t('aiSection.text', 'Groq AI automatically assists government officials and university mentors by classifying challenges, extracting keywords, assigning priority, and mapping required R&D skills.')}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
            <li>✓ Automatic domain & sub-category classification</li>
            <li>✓ Skill mapping for engineering & research departments</li>
            <li>✓ Urgency and severity priority score calculation</li>
            <li>✓ Assists human government decision makers</li>
          </ul>
        </div>

        {/* Visual Pipeline */}
        <div style={{ background: '#F8FAFC', padding: '30px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center', fontWeight: '800', fontSize: '13px' }}>
            <div style={{ padding: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px' }}>PROBLEM REPORT</div>
            <div style={{ color: '#7C3AED' }}>↓</div>
            <div style={{ padding: '12px', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', color: '#7C3AED' }}>GROQ AI ANALYSIS</div>
            <div style={{ color: '#7C3AED' }}>↓</div>
            <div style={{ padding: '12px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', color: '#1D4ED8' }}>KEYWORDS & PRIORITY</div>
            <div style={{ color: '#7C3AED' }}>↓</div>
            <div style={{ padding: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#059669' }}>REQUIRED R&D SKILLS & MATCHING</div>
          </div>
        </div>
      </div>
    </section>
  );
};
