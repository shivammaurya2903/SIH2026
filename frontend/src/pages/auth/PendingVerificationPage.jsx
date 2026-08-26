import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';

export const PendingVerificationPage = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  return (
    <PageContainer hideFooter>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: '520px', background: '#FFFFFF', padding: '40px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '64px', height: '64px', background: '#FEF3C7', color: '#B45309', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '20px' }}>
            🏛️
          </div>

          <span style={{ display: 'inline-block', padding: '4px 12px', background: '#FEF3C7', color: '#B45309', borderRadius: '9999px', fontSize: '12px', fontWeight: '800', marginBottom: '12px' }}>
            {isHi ? 'सरकारी खाता सत्यापन लंबित' : 'Government Verification Pending'}
          </span>

          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>
            {isHi ? 'सत्यापन अनुरोध सबमिट हुआ' : 'Verification Request Submitted'}
          </h2>

          <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
            {isHi
              ? 'आपका सरकारी खाता सत्यापन अनुरोध राज्य प्रशासन को सबमिट कर दिया गया है। आधिकारिक सत्यापन के बाद आपकी पहुंच सक्षम की जाएगी।'
              : 'Your government account verification request has been submitted to state administration and is pending approval. Administrative access will be enabled upon official verification.'}
          </p>

          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#475569', textAlign: 'left', marginBottom: '28px' }}>
            🔒 <strong>{isHi ? 'प्रशासनिक सुरक्षा नीति:' : 'Administrative Security Policy:'}</strong> {isHi ? 'अनधिकृत पहुंच को रोकने के लिए केवल सत्यापित सरकारी अधिकारियों को ही कमांड सेंटर की पहुंच दी जाती है।' : 'To prevent unauthorized access, only verified government officers are granted Command Center privileges.'}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/auth/login')}
              style={{ padding: '12px 24px', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}
            >
              {isHi ? 'साइन इन पर लौटें →' : 'Return to Sign In →'}
            </button>
            <button
              onClick={() => navigate('/')}
              style={{ padding: '12px 24px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}
            >
              {isHi ? 'मुख्य पृष्ठ' : 'Home Page'}
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
