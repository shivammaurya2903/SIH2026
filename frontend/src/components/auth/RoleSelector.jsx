import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const roles = [
    { id: 'citizen', icon: '👥', tag: 'REPORT', title: isHi ? 'नागरिक' : 'Citizen', desc: isHi ? 'समस्या दर्ज करें' : 'Report community problems' },
    { id: 'government', icon: '🏛️', tag: 'VALIDATE', title: isHi ? 'सरकार' : 'Government', desc: isHi ? 'सत्यापित एवं प्राथमिकता दें' : 'Validate & prioritize' },
    { id: 'university', icon: '🏫', tag: 'RESEARCH', title: isHi ? 'विश्वविद्यालय' : 'University', desc: isHi ? 'अनुसंधान एवं नवाचार' : 'Research & innovate' },
    { id: 'faculty', icon: '👩‍🏫', tag: 'MENTOR', title: isHi ? 'संकाय मेंटर' : 'Faculty Mentor', desc: isHi ? 'टीमों को मार्गदर्शन दें' : 'Guide student teams' },
    { id: 'student', icon: '🎓', tag: 'INNOVATE', title: isHi ? 'छात्र' : 'Student Innovator', desc: isHi ? 'समाधान का निर्माण करें' : 'Build R&D solutions' },
    { id: 'industry', icon: '🏭', tag: 'COLLABORATE', title: isHi ? 'उद्योग' : 'Industry Partner', desc: isHi ? 'सहयोग एवं विस्तार' : 'Collaborate & scale' }
  ];

  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>
        {isHi ? 'अपनी भूमिका चुनें' : 'SELECT YOUR ROLE'} *
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        {roles.map((r) => {
          const isSelected = selectedRole === r.id;
          return (
            <div
              key={r.id}
              onClick={() => onSelectRole(r.id)}
              style={{
                background: isSelected ? '#EFF6FF' : '#FFFFFF',
                border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '18px' }}>{r.icon}</span>
                <span style={{ fontSize: '9px', fontWeight: '900', padding: '2px 6px', background: isSelected ? '#2563EB' : '#CBD5E1', color: '#FFFFFF', borderRadius: '4px' }}>
                  {r.tag}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: isSelected ? '#2563EB' : '#0F172A' }}>
                {r.title}
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', lineHeight: '1.2' }}>
                {r.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
