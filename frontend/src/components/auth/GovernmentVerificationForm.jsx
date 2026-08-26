import React from 'react';
import { JHARKHAND_DISTRICTS } from '../../data/districts';
import { useLanguage } from '../../i18n/LanguageContext';

export const GovernmentVerificationForm = ({ formData, onChange }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px' }}>🏛️</span>
        <span style={{ fontSize: '13px', fontWeight: '800', color: '#1D4ED8' }}>
          {isHi ? 'सरकारी अधिकारी सत्यापन जानकारी' : 'Government Official Verification Request'}
        </span>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
          {isHi ? 'सरकारी विभाग' : 'Department Name'} *
        </label>
        <input
          type="text"
          name="department"
          required
          value={formData.department || ''}
          onChange={onChange}
          placeholder="e.g. Water Resources Department"
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
          {isHi ? 'पद / पदनाम' : 'Official Designation'} *
        </label>
        <input
          type="text"
          name="designation"
          required
          value={formData.designation || ''}
          onChange={onChange}
          placeholder="e.g. Executive Engineer / Nodal Officer"
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
          {isHi ? 'कार्यालय संपर्क नंबर' : 'Official Contact Number'}
        </label>
        <input
          type="tel"
          name="officialContact"
          value={formData.officialContact || ''}
          onChange={onChange}
          placeholder="+91 94311 XXXXX"
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ padding: '10px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '12px', color: '#B45309', fontWeight: '700' }}>
        🔒 {isHi ? 'सुरक्षा नोट: सरकारी खाते सत्यापन के बाद ही सक्रिय होते हैं।' : 'Security Notice: Government accounts require official verification before administrative access is granted.'}
      </div>
    </div>
  );
};
