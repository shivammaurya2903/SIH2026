import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const STAGES = [
  { key: 'PLANNING', labelEn: 'Planning & Team', labelHi: 'योजना एवं टीम' },
  { key: 'IN_PROGRESS', labelEn: 'R&D Active', labelHi: 'आरएंडडी सक्रिय' },
  { key: 'PROTOTYPE', labelEn: 'Prototype Build', labelHi: 'प्रोटोटाइप निर्माण' },
  { key: 'TESTING', labelEn: 'Testing & QA', labelHi: 'गुणवत्ता परीक्षण' },
  { key: 'PILOT', labelEn: 'Pilot Trial', labelHi: 'पायलट परीक्षण' },
  { key: 'DEPLOYED', labelEn: 'Field Deployment', labelHi: 'क्षेत्रीय तैनाती' },
  { key: 'COMPLETED', labelEn: 'Completed', labelHi: 'पूर्ण' }
];

export const ProjectLifecycleTracker = ({ currentStage = 'IN_PROGRESS' }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const currentIndex = Math.max(0, STAGES.findIndex(s => s.key === currentStage));
  const progressPercent = Math.round(((currentIndex + 1) / STAGES.length) * 100);

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
            ⚡ {isHi ? 'प्रोजेक्ट जीवनचक्र प्रगति' : 'Project Lifecycle Progression'}
          </h4>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            {isHi ? 'वर्तमान चरण: ' : 'Current Stage: '}
            <strong style={{ color: '#1D4ED8' }}>
              {isHi ? STAGES[currentIndex]?.labelHi : STAGES[currentIndex]?.labelEn}
            </strong>
          </span>
        </div>
        <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981' }}>
          {progressPercent}%
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #1D4ED8, #10B981)', transition: 'width 0.4s ease' }} />
      </div>

      {/* Stages Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STAGES.length}, 1fr)`, gap: '8px', overflowX: 'auto' }}>
        {STAGES.map((stage, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} style={{ textAlign: 'center', minWidth: '80px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  margin: '0 auto 6px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '800',
                  background: isCurrent ? '#1D4ED8' : isPassed ? '#10B981' : '#F1F5F9',
                  color: isCurrent || isPassed ? '#FFFFFF' : '#64748B',
                  border: isCurrent ? '2px solid #BFDBFE' : 'none'
                }}
              >
                {isPassed ? '✓' : idx + 1}
              </div>
              <div style={{ fontSize: '11px', fontWeight: isCurrent ? '800' : '600', color: isCurrent ? '#1D4ED8' : isPassed ? '#059669' : '#94A3B8' }}>
                {isHi ? stage.labelHi : stage.labelEn}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
