import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ReportJourneySection = () => {
  const { t } = useLanguage();

  const journeySteps = [
    'Submitted',
    'AI Analyzed',
    'Government Reviewed',
    'Validated',
    'University Matched',
    'Project Started',
    'Prototype / Pilot',
    'Deployment',
    'Impact'
  ];

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>
          {t('journey.heading', 'What Happens to Your Problem?')}
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          {t('journey.note', 'Eligible and validated challenges can progress through the innovation lifecycle.')}
        </p>

        {/* Horizontal Pipeline */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          {journeySteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div
                style={{
                  padding: '10px 16px',
                  background: idx === journeySteps.length - 1 ? '#ECFDF5' : '#FFFFFF',
                  border: `1px solid ${idx === journeySteps.length - 1 ? '#A7F3D0' : '#E2E8F0'}`,
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '800',
                  color: idx === journeySteps.length - 1 ? '#059669' : '#0F172A',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}
              >
                {step}
              </div>
              {idx < journeySteps.length - 1 && (
                <span style={{ color: '#CBD5E1', fontWeight: '900', fontSize: '16px' }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
