import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '60px 0 30px 0', borderTop: '1px solid #1E293B', marginTop: '60px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ SamadhanSetu
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94A3B8' }}>
            {isHi
              ? 'झारखंड सरकार का सामाजिक नवाचार मंच। क्राउडसोर्स्ड नागरिक चुनौतियों को विश्वविद्यालय आरएंडडी और उद्योग सीएसआर से जोड़ना।'
              : 'Societal Innovation Collaboration Platform, Govt of Jharkhand. Connecting crowdsourced citizen challenges with University R&D and Industry CSR.'}
          </p>
        </div>

        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '800', marginBottom: '16px' }}>
            {isHi ? 'त्वरित लिंक' : 'Quick Navigation'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><a href="/challenges" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'चुनौतियां देखें' : 'Explore Challenges'}</a></li>
            <li><a href="/citizen/report" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'समस्या दर्ज करें' : 'Report a Problem'}</a></li>
            <li><a href="/analytics" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'राज्य विश्लेषण' : 'State Analytics'}</a></li>
            <li><a href="/impact" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'प्रभाव केंद्र' : 'Impact Center'}</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '800', marginBottom: '16px' }}>
            {isHi ? 'स्टेकहोल्डर्स' : 'Stakeholders'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><a href="/auth/login" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'नागरिक पोर्टल' : 'Citizen Portal'}</a></li>
            <li><a href="/auth/login" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'सरकारी कमांड सेंटर' : 'Government Command'}</a></li>
            <li><a href="/auth/login" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'विश्वविद्यालय आरएंडडी' : 'University R&D'}</a></li>
            <li><a href="/auth/login" style={{ color: '#94A3B8', textDecoration: 'none' }}>{isHi ? 'उद्योग सीएसआर' : 'Industry CSR'}</a></li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid #1E293B', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748B' }}>
        <div>SIH26043 — Smart India Hackathon 2026 | SamadhanSetu</div>
        <div>Government of Jharkhand © 2026. All rights reserved.</div>
      </div>
    </footer>
  );
};
