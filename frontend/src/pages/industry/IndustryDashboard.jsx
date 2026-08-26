import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { CollaborationApi } from '../../api/collaboration.api';

export const IndustryDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        const res = await CollaborationApi.getAll();
        if (res.success && res.data) {
          setCollaborations(res.data);
        }
      } catch (err) {
        console.error('Failed to load Industry CSR Portal:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustryData();
  }, []);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span style={{ padding: '4px 10px', background: '#FEF3C7', color: '#B45309', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
              Industry CSR Collaboration Portal
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginTop: '8px', marginBottom: '6px' }}>
              🏭 {isHi ? `नमस्ते, ${user?.organization || 'उद्योग सीएसआर भागीदार'}` : `Welcome, ${user?.organization || 'Industry CSR Partner'}`}
            </h1>
            <p style={{ color: '#64748B', fontSize: '15px' }}>
              {isHi ? 'विश्वविद्यालय आरएंडडी परियोजनाओं को सीएसआर फंडिंग, मेंटरशिप और पायलट सहायता प्रदान करें' : 'Sponsor university R&D projects with CSR funding, technical mentorship, and pilot deployment facilities'}
            </p>
          </div>

          <Link to="/challenges" style={{ padding: '12px 24px', background: '#F59E0B', color: '#FFFFFF', borderRadius: '10px', fontWeight: '800', textDecoration: 'none' }}>
            🤝 {isHi ? 'सीएसआर अवसर देखें' : 'Explore CSR Opportunities'}
          </Link>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B' }}>{collaborations.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'सक्रिय सीएसआर साझेदारियां' : 'Active CSR Collaborations'}</div>
          </div>
        </div>

        {/* Collaborations Feed */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          💼 {isHi ? 'आपकी उद्योग सीएसआर साझेदारियां' : 'Your CSR Collaborations'}
        </h3>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#F59E0B', fontWeight: '700' }}>Loading CSR Portal...</div>
        ) : collaborations.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
            No active CSR collaborations yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {collaborations.map((c) => (
              <div key={c._id || c.id} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#D97706', background: '#FEF3C7', padding: '3px 8px', borderRadius: '9999px' }}>
                  {c.collaborationType || 'CSR Sponsorship'}
                </span>
                <h4 style={{ margin: '10px 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{c.projectTitle || 'R&D Solution Support'}</h4>
                <div style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
                  Funding Amount: <strong>₹{c.fundingAmount || '5,00,000'}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
