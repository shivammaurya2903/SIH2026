import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { ProjectApi } from '../../api/project.api';
import { TeamApi } from '../../api/team.api';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const [projectsRes, teamsRes] = await Promise.all([
          ProjectApi.getAll({ role: 'faculty' }),
          TeamApi.getAll()
        ]);

        if (projectsRes.success && projectsRes.data) {
          setProjects(projectsRes.data);
        }
        if (teamsRes.success && teamsRes.data) {
          setTeams(teamsRes.data);
        }
      } catch (err) {
        console.error('Failed to load Faculty Portal:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ padding: '4px 10px', background: '#F5F3FF', color: '#7C3AED', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
            Faculty Mentorship Portal
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginTop: '8px', marginBottom: '6px' }}>
            👩‍🏫 {isHi ? `नमस्ते, डॉ. ${user?.name || 'प्राध्यापक मेंटर'}` : `Welcome, Prof. ${user?.name || 'Faculty Mentor'}`}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi ? 'छात्र आरएंडडी टीमों का मार्गदर्शन, मील के पत्थर का सत्यापन एवं तकनीकी समीक्षा' : 'Guide student R&D teams, approve project milestones, and review prototype testing deliverables'}
          </p>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#7C3AED' }}>{projects.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'मार्गदर्शित प्रोजेक्ट' : 'Mentored R&D Projects'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{teams.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'छात्र टीमें' : 'Student Teams'}</div>
          </div>
        </div>

        {/* Mentored Projects Feed */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          📂 {isHi ? 'सक्रिय आरएंडडी मार्गदर्शन प्रोजेक्ट' : 'Active Mentored R&D Projects'}
        </h3>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#7C3AED', fontWeight: '700' }}>Loading Faculty Dashboard data...</div>
        ) : projects.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
            No mentored R&D projects assigned yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {projects.map((p) => (
              <div key={p._id || p.id} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <StatusBadge status={p.stage || 'in_progress'} />
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '700' }}>📍 {p.district || 'Ranchi'}</span>
                </div>

                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>

                <Link
                  to={`/project/${p._id || p.id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontWeight: '800',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  {isHi ? 'प्रोजेक्ट कार्यस्थान खोलें →' : 'Open Project Workspace →'}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
