import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const STAGES = [
  { key: 'submitted', labelEn: 'Submitted', labelHi: 'दर्ज' },
  { key: 'ai_triaged', labelEn: 'AI Triaged', labelHi: 'एआई वर्गीकृत' },
  { key: 'under_review', labelEn: 'Government Review', labelHi: 'सरकारी समीक्षा' },
  { key: 'validated', labelEn: 'Validated', labelHi: 'सत्यापित' },
  { key: 'university_matched', labelEn: 'University Matched', labelHi: 'विश्वविद्यालय मिलान' },
  { key: 'proposal_project', labelEn: 'R&D Project', labelHi: 'आरएंडडी प्रोजेक्ट' },
  { key: 'collaboration', labelEn: 'CSR Collaboration', labelHi: 'सीएसआर सहयोग' },
  { key: 'testing_pilot', labelEn: 'Testing & Trial', labelHi: 'परीक्षण' },
  { key: 'deployed', labelEn: 'Field Deployed', labelHi: 'क्षेत्र में तैनात' },
  { key: 'impact_measured', labelEn: 'Impact Measured', labelHi: 'प्रभाव मापा गया' }
];

export const ChallengeStatusTracker = ({ status = 'submitted', currentStage = '' }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const getActiveIndex = () => {
    const s = (currentStage || status || 'submitted').toLowerCase();
    if (s === 'rejected') return -1;
    if (s === 'submitted') return 0;
    if (s === 'under_review') return 2;
    if (s === 'approved' || s === 'validated') return 3;
    if (s === 'matched' || s === 'university_matched') return 4;
    if (s === 'in_progress' || s === 'project_created') return 5;
    if (s === 'collaboration') return 6;
    if (s === 'testing' || s === 'pilot') return 7;
    if (s === 'deployed' || s === 'resolved') return 8;
    if (s === 'completed' || s === 'impact_measured') return 9;
    return 0;
  };

  const activeIdx = getActiveIndex();
  const isRejected = (status || '').toLowerCase() === 'rejected';

  if (isRejected) {
    return (
      <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '16px', color: '#DC2626' }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>
          ✕ {isHi ? 'रिपोर्ट समीक्षा के बाद खारिज की गई' : 'Report Reviewed & Closed'}
        </h4>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#991B1B' }}>
          {isHi ? 'यह रिपोर्ट सत्यापन मानदंडों को पूरा नहीं करती है।' : 'This report did not meet validation guidelines or was identified as duplicate.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '900', color: '#0F172A' }}>
        📊 {isHi ? 'रिपोर्ट समाधान प्रगति चक्र' : 'Report Resolution Lifecycle'}
      </h4>

      <div className="status-tracker-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {STAGES.map((st, idx) => {
          const isDone = idx < activeIdx;
          const isCurrent = idx === activeIdx;

          let iconBg = '#F1F5F9';
          let iconColor = '#94A3B8';
          let textColor = '#64748B';
          let fontW = '600';

          if (isDone) {
            iconBg = '#ECFDF5';
            iconColor = '#059669';
            textColor = '#0F172A';
            fontW = '700';
          } else if (isCurrent) {
            iconBg = '#1D4ED8';
            iconColor = '#FFFFFF';
            textColor = '#1D4ED8';
            fontW = '900';
          }

          return (
            <div key={st.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: iconBg,
                  color: iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '900',
                  border: isCurrent ? '2px solid #60A5FA' : 'none',
                  flexShrink: 0
                }}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: fontW }}>
                  {isHi ? st.labelHi : st.labelEn}
                </span>
                {isCurrent && (
                  <span style={{ marginLeft: '8px', fontSize: '10px', background: '#DBEAFE', color: '#1D4ED8', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                    {isHi ? 'वर्तमान स्थिति' : 'Current Stage'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
