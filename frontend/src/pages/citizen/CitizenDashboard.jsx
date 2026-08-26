import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { ChallengeApi } from '../../api/challenge.api';

export const CitizenDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyReports = async () => {
      try {
        const res = await ChallengeApi.getAll();
        if (res.success && res.data) {
          setReports(res.data);
        }
      } catch (err) {
        console.error('Failed to load user reports:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMyReports();
  }, []);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              {isHi ? `नमस्ते, ${user?.name || 'नागरिक'}` : `Welcome, ${user?.name || 'Citizen'}`}
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>
              {isHi ? 'नागरिक समाधान डैशबोर्ड — अपनी रिपोर्ट की प्रगति ट्रैक करें' : 'Citizen Workspace — Track your submitted societal reports and impact'}
            </p>
          </div>

          <Link to="/citizen/report" style={{ padding: '12px 24px', background: '#1D4ED8', color: '#FFFFFF', borderRadius: '10px', fontWeight: '800', textDecoration: 'none' }}>
            🚨 {isHi ? 'नया मुद्दा दर्ज करें' : 'Report New Issue'}
          </Link>
        </div>

        {/* Quick KPI Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{reports.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'कुल दर्ज रिपोर्ट' : 'Total Reports Submitted'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B' }}>{reports.filter(r => r.status === 'submitted' || r.status === 'under_review').length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'समीक्षाधीन' : 'Pending Review'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>{reports.filter(r => r.status === 'approved' || r.status === 'in_progress' || r.status === 'deployed').length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'स्वीकृत / आरएंडडी सक्रिय' : 'Approved / R&D Active'}</div>
          </div>
        </div>

        {/* Reports Feed */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          {isHi ? 'आपकी रिपोर्ट स्थिति' : 'Recent Submitted Reports'}
        </h3>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#1D4ED8', fontWeight: '700' }}>Loading your dashboard...</div>
        ) : reports.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
            <p style={{ color: '#64748B' }}>{isHi ? 'आपने अभी तक कोई रिपोर्ट दर्ज नहीं की है।' : 'You have not submitted any societal reports yet.'}</p>
            <Link to="/citizen/report" style={{ display: 'inline-block', padding: '10px 20px', background: '#1D4ED8', color: '#FFF', borderRadius: '8px', textDecoration: 'none', fontWeight: '800' }}>
              {isHi ? 'पहला मुद्दा दर्ज करें' : 'Report Your First Issue'}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {reports.map((r) => (
              <div key={r._id || r.id} style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <StatusBadge status={r.status} />
                  <span style={{ fontSize: '12px', color: '#64748B' }}>📍 {r.district || 'Ranchi'}</span>
                </div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{r.title}</h4>
                <p style={{ fontSize: '13px', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '0 0 16px 0' }}>
                  {r.description}
                </p>
                <button onClick={() => navigate(`/challenges/${r._id || r.id}`)} style={{ width: '100%', padding: '10px', background: '#F1F5F9', color: '#1D4ED8', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  {isHi ? 'ट्रैकिंग स्थिति देखें →' : 'View Tracking Status →'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
