import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ImpactSection = ({ stats }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const metrics = [
    { number: '24', label: isHi ? 'कवर किए गए जिले' : 'Districts Covered', sub: isHi ? 'संपूर्ण झारखंड' : 'All Jharkhand' },
    { number: stats?.challengesCount || 1248, label: isHi ? 'कुल चुनौतियां' : 'Total Challenges', sub: isHi ? 'नागरिक रिपोर्ट की गई' : 'Citizen Reported' },
    { number: stats?.projectsCount || 156, label: isHi ? 'सक्रिय परियोजनाएं' : 'Active Projects', sub: isHi ? 'आरएंडडी एवं नवाचार' : 'R&D & Innovation' },
    { number: '42', label: isHi ? 'तैनात समाधान' : 'Solutions Deployed', sub: isHi ? 'सफल क्षेत्र पायलट' : 'Successful Field Pilots' },
    { number: '18,540', label: isHi ? 'नागरिक सहभागिता' : 'Citizens Engaged', sub: isHi ? 'सक्रिय समुदाय' : 'Active Community' },
    { number: '22', label: isHi ? 'विश्वविद्यालय एवं संस्थान' : 'Universities & R&D', sub: isHi ? 'अनुसंधान भागीदार' : 'Research Partners' }
  ];

  return (
    <section style={{ padding: '72px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: '900', color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {isHi ? 'झारखंड के लिए निर्मित' : 'BUILT FOR JHARKHAND'}
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: '900', color: '#0F172A', marginTop: '6px', marginBottom: '14px' }}>
          {isHi ? 'प्रभाव के लिए डिज़ाइन किया गया मंच' : 'Built for Jharkhand. Designed for Impact.'}
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '680px', margin: '0 auto 48px auto', lineHeight: '1.6' }}>
          {isHi
            ? 'समाधानसेतु वास्तविक समय के डेटा के साथ राज्य भर में नागरिक समस्याओं को समाधान तक पहुँचाने की गति को मापता है।'
            : 'Track real-time societal problem resolution performance across all 24 districts of Jharkhand.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '20px' }}>
          {metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '24px 16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#1D4ED8', marginBottom: '4px' }}>
                {m.number}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', marginBottom: '2px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
