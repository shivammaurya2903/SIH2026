import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { getRoleDashboard } from '../../auth/roleRoutes';

export const UnauthorizedPage = () => {
  const { language } = useLanguage();
  const { role } = useAuth();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  return (
    <PageContainer hideFooter>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)', padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: '460px', background: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#DC2626', marginBottom: '10px' }}>
            {isHi ? '403 — पहुंच प्रतिबंधित' : '403 — Access Restricted'}
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
            {isHi
              ? 'आपके पास इस पृष्ठ या प्रशासनिक कार्यस्थान तक पहुँचने के लिए आवश्यक अधिकार नहीं हैं।'
              : 'You do not have the required role authorization to access this workspace page.'}
          </p>

          <button
            onClick={() => navigate(getRoleDashboard(role))}
            style={{
              padding: '12px 24px',
              background: '#1D4ED8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            {isHi ? 'अपने डैशबोर्ड पर लौटें' : 'Return to Your Dashboard'}
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
