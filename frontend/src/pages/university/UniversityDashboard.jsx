import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { ChallengeApi } from '../../api/challenge.api';
import { ProjectApi } from '../../api/project.api';

export const UniversityDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [matchedChallenges, setMatchedChallenges] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUniversityData = async () => {
      try {
        const [challengesRes, projectsRes] = await Promise.all([
          ChallengeApi.getAll({ status: 'approved' }),
          ProjectApi.getAll({ role: 'university' })
        ]);

        if (challengesRes.success && challengesRes.data) {
          setMatchedChallenges(challengesRes.data);
        }
        if (projectsRes.success && projectsRes.data) {
          setActiveProjects(projectsRes.data);
        }
      } catch (err) {
        console.error('Failed to load university portal data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUniversityData();
  }, []);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              🏫 {isHi ? 'विश्वविद्यालय आरएंडडी पोर्टल' : 'University R&D Portal'}
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>
              {isHi ? `${user?.organization || 'विश्वविद्यालय'} — सामाजिक आरएंडडी परियोजनाएं एवं टीम आवंटन` : `${user?.organization || 'University Portal'} — Manage institutional R&D projects and team allocations`}
            </p>
          </div>

          <Link to="/university/teams" style={{ padding: '12px 24px', background: '#1D4ED8', color: '#FFFFFF', borderRadius: '10px', fontWeight: '800', textDecoration: 'none' }}>
            👥 {isHi ? 'आरएंडडी टीमें प्रबंधित करें' : 'Manage R&D Teams'}
          </Link>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{matchedChallenges.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'उपलब्ध चुनौतियां' : 'Available Challenges'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>{activeProjects.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'सक्रिय आरएंडडी परियोजनाएं' : 'Active R&D Projects'}</div>
          </div>
        </div>

        {/* Available Challenges Feed */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          🎯 {isHi ? 'प्रस्ताव सबमिशन हेतु उपलब्ध चुनौतियां' : 'Challenges Available for Proposal Submission'}
        </h3>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#1D4ED8', fontWeight: '700' }}>Loading portal data...</div>
        ) : matchedChallenges.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
            No challenges available for proposal submission at this time.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {matchedChallenges.map((c) => (
              <div key={c._id || c.id} style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#10B981', background: '#ECFDF5', padding: '3px 8px', borderRadius: '9999px' }}>
                  Validated Issue
                </span>
                <h4 style={{ margin: '10px 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{c.title}</h4>
                <p style={{ fontSize: '13px', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '16px' }}>
                  {c.description}
                </p>
                <Link to={`/challenges/${c._id || c.id}`} style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#1D4ED8', color: '#FFFFFF', borderRadius: '8px', fontWeight: '800', textDecoration: 'none', fontSize: '13px' }}>
                  {isHi ? 'आरएंडडी प्रस्ताव जमा करें →' : 'Submit R&D Proposal →'}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
