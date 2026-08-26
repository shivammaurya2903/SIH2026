import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AuthVisualPanel = ({ mode = 'login' }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const isLogin = mode === 'login';

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: '#FFFFFF',
        padding: '40px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        minHeight: '600px',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Grid Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '42px', height: '42px', background: '#1D4ED8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '22px' }}>
            ⚡
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.3px' }}>SamadhanSetu</div>
            <div style={{ fontSize: '10px', color: '#38BDF8', fontWeight: '800', letterSpacing: '0.6px' }}>JHARKHAND SOCIETAL INNOVATION • SIH26043</div>
          </div>
        </div>

        <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: '900', lineHeight: '1.2', marginBottom: '16px', color: '#FFFFFF' }}>
          {isLogin
            ? (isHi ? 'समाधानसेतु में पुनः आपका स्वागत है' : 'Welcome Back to SamadhanSetu')
            : (isHi ? 'समाधानसेतु मंच से जुड़ें' : 'Join SamadhanSetu Innovation Platform')}
        </h2>

        <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.6', margin: 0 }}>
          {isLogin
            ? (isHi ? 'झारखंड के सभी 24 जिलों के लिए सामुदायिक समस्याओं को वास्तविक समाधानों में बदलना जारी रखें।' : 'Continue turning community problems into meaningful solutions across all 24 Jharkhand districts.')
            : (isHi ? 'झारखंड की सामाजिक चुनौतियों को हल करने में अपना योगदान दें — नागरिक, सरकार, विश्वविद्यालय या उद्योग के रूप में।' : 'Choose how you want to contribute to solving real societal challenges across Jharkhand.')}
        </p>
      </div>

      {/* 3 Civic Tech Visual Badges */}
      <div style={{ position: 'relative', zIndex: 2, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '20px' }}>🏛️</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>{isHi ? 'सरकार' : 'Government'}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'समीक्षा और प्राथमिकता' : 'Review & prioritize challenges'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '20px' }}>🎓</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>{isHi ? 'विश्वविद्यालय एवं शोध' : 'University & R&D'}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'अनुसंधान और समाधान का निर्माण' : 'Research & build R&D solutions'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '20px' }}>🏭</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>{isHi ? 'उद्योग एवं सीएसआर' : 'Industry & CSR Partners'}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'सहायता और क्रियान्वयन' : 'Sponsor & scale field impact'}</div>
          </div>
        </div>
      </div>

      {/* Quote Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(56, 189, 248, 0.08)',
          borderLeft: '3px solid #38BDF8',
          borderRadius: '8px',
          padding: '14px 18px',
          fontSize: '13px',
          color: '#38BDF8',
          lineHeight: '1.5',
          fontWeight: '700'
        }}
      >
        💡 {isLogin
          ? (isHi ? 'एक समस्या एक शोध परियोजना बन सकती है। एक शोध परियोजना एक तैनात समाधान बन सकती है।' : 'One problem can become a research project. One research project can become a deployed solution.')
          : (isHi ? 'झारखंड सरकार के लिए निर्मित सहयोगात्मक सामाजिक नवाचार मंच।' : 'Collaborative societal innovation platform built for the Government of Jharkhand.')}
      </div>
    </div>
  );
};
