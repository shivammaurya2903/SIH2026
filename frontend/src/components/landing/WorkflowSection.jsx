import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const WorkflowSection = () => {
  const { t } = useLanguage();

  const steps = [
    { num: '01', title: t('howItWorks.step1.title', 'REPORT'), desc: t('howItWorks.step1.desc', 'Citizen reports a real local challenge.') },
    { num: '02', title: t('howItWorks.step2.title', 'AI TRIAGE'), desc: t('howItWorks.step2.desc', 'Groq AI classifies, prioritizes and extracts key R&D domain tags.') },
    { num: '03', title: t('howItWorks.step3.title', 'GOVERNMENT'), desc: t('howItWorks.step3.desc', 'Government officials review, validate, and authorize challenge.') },
    { num: '04', title: t('howItWorks.step4.title', 'SMART MATCHING'), desc: t('howItWorks.step4.desc', 'Match relevant universities, faculty mentors, and R&D capabilities.') },
    { num: '05', title: t('howItWorks.step5.title', 'PROPOSAL'), desc: t('howItWorks.step5.desc', 'University teams submit innovative project proposals.') },
    { num: '06', title: t('howItWorks.step6.title', 'COLLABORATION'), desc: t('howItWorks.step6.desc', 'University labs and industry CSR partners join forces.') },
    { num: '07', title: t('howItWorks.step7.title', 'BUILD'), desc: t('howItWorks.step7.desc', 'Develop and field-test functional solution prototypes.') },
    { num: '08', title: t('howItWorks.step8.title', 'DEPLOY'), desc: t('howItWorks.step8.desc', 'Deploy solution to target gram panchayats & urban centers.') },
    { num: '09', title: t('howItWorks.step9.title', 'IMPACT'), desc: t('howItWorks.step9.desc', 'Measure and report transparent societal outcome metrics.') }
  ];

  return (
    <section id="how-it-works" style={{ padding: '80px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: '9999px', fontSize: '12px', fontWeight: '800', marginBottom: '10px' }}>
            9-STEP INNOVATION PIPELINE
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '900', color: '#0F172A' }}>
            {t('howItWorks.heading', 'How SamadhanSetu Works')}
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '600px', margin: '8px auto 0 auto' }}>
            {t('howItWorks.sub', 'From initial problem reporting to verified societal impact across 9 structured stages.')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#1D4ED8', marginBottom: '6px' }}>
                  {step.num}
                </div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>
                  {step.title}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
