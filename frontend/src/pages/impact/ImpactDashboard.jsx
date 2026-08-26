import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { ImpactApi } from '../../api/impact.api';

export const ImpactDashboard = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [impactData, setImpactData] = useState({
    citizensBenefited: '1,45,000+',
    solutionsDeployed: 12,
    districtsImpacted: 24,
    csrFundingMobilized: '₹1.85 Cr'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const res = await ImpactApi.getOverview();
        if (res.success && res.data) {
          setImpactData(res.data);
        }
      } catch (err) {
        console.error('Impact data fetch warning:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImpact();
  }, []);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ padding: '4px 12px', background: '#ECFDF5', color: '#059669', borderRadius: '9999px', fontSize: '13px', fontWeight: '800' }}>
            Societal Social Return on Investment (SROI)
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0F172A', marginTop: '10px', marginBottom: '8px' }}>
            🌟 {isHi ? 'सामाजिक प्रभाव कमांड सेंटर' : 'Social Impact Command Center'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
            {isHi ? 'झारखंड सरकार, विश्वविद्यालयों और उद्योग सीएसआर के संयुक्त सामाजिक प्रभाव के वास्तविक मापदंड' : 'Real-time societal impact metrics delivered through Govt of Jharkhand, University R&D, and Industry CSR partnerships'}
          </p>
        </div>

        {/* Dynamic Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#10B981', marginBottom: '6px' }}>{impactData.citizensBenefited || '1,45,000+'}</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{isHi ? 'लाभान्वित नागरिक' : 'Citizens Benefited'}</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Across 24 Jharkhand Districts</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#1D4ED8', marginBottom: '6px' }}>{impactData.solutionsDeployed || 12}</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{isHi ? 'तैनात आरएंडडी समाधान' : 'Field Deployed Solutions'}</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Water, Energy & Sanitation</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#F59E0B', marginBottom: '6px' }}>{impactData.csrFundingMobilized || '₹1.85 Cr'}</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{isHi ? 'सीएसआर फंडिंग गतिशीलता' : 'CSR Funds Mobilized'}</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Industry Partner Contributions</div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
