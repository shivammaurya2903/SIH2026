import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { ProjectApi } from '../../api/project.api';
import { TeamApi } from '../../api/team.api';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [assignedProjects, setAssignedProjects] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [projectsRes, teamsRes] = await Promise.all([
          ProjectApi.getAll({ role: 'student' }),
          TeamApi.getAll()
        ]);

        if (projectsRes.success && projectsRes.data) {
          setAssignedProjects(projectsRes.data);
        }
        if (teamsRes.success && teamsRes.data && teamsRes.data.length > 0) {
          setTeam(teamsRes.data[0]);
        }
      } catch (err) {
        console.error('Failed to load Student Workspace:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ padding: '4px 10px', background: '#ECFDF5', color: '#059669', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
            Student Innovator Workspace
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginTop: '8px', marginBottom: '6px' }}>
            🚀 {isHi ? `नमस्ते, ${user?.name || 'छात्र नवाचारकर्ता'}` : `Welcome, ${user?.name || 'Student Innovator'}`}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi ? 'आपके द्वारा आवंटित सामाजिक आरएंडडी प्रोजेक्ट, मील के पत्थर और प्रोटोटाइप कार्य' : 'Your assigned societal R&D projects, team tasks, and prototype testing deliverables'}
          </p>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>{assignedProjects.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'आवंटित आरएंडडी प्रोजेक्ट' : 'Assigned R&D Projects'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{team ? team.name : 'Team Alpha'}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'आपकी आरएंडडी टीम' : 'Your R&D Team'}</div>
          </div>
        </div>

        {/* Assigned Projects Grid */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          🛠️ {isHi ? 'आपके आवंटित प्रोजेक्ट' : 'Your Assigned R&D Projects'}
        </h3>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>Loading Student Workspace data...</div>
        ) : assignedProjects.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
            No R&D projects assigned yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {assignedProjects.map((p) => (
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
                    background: '#10B981',
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
