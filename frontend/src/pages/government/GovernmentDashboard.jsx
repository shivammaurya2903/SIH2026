import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { JHARKHAND_DISTRICTS } from '../../data/districts';
import { ChallengeApi } from '../../api/challenge.api';
import { AnalyticsApi } from '../../api/analytics.api';

export const GovernmentDashboard = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, validated: 0, matched: 0 });
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState(null);

  // Filters
  const [district, setDistrict] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadGovData = async () => {
      setLoading(true);
      try {
        const [challengesRes, overviewRes] = await Promise.all([
          ChallengeApi.getAll({ district, status: statusFilter, search }),
          AnalyticsApi.getOverview()
        ]);

        if (challengesRes.success && challengesRes.data) {
          setChallenges(challengesRes.data);
        }

        if (overviewRes.success && overviewRes.data) {
          setStats({
            total: overviewRes.data.totalChallenges || 0,
            pending: overviewRes.data.pendingReview || 0,
            validated: overviewRes.data.approvedChallenges || 0,
            matched: overviewRes.data.activeProjects || 0
          });
        }
      } catch (err) {
        console.error('Failed to load Government Command Center:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGovData();
  }, [district, statusFilter, search]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await ChallengeApi.updateStatus(id, newStatus, 'Status updated by Government Command Center');
      if (res.success) {
        setChallenges(prev => prev.map(c => (c._id === id || c.id === id) ? { ...c, status: newStatus } : c));
      }
    } catch (err) {
      alert(err.message || 'Status update failed');
    }
  };

  const handleAnalyze = async (id) => {
    setAnalyzingId(id);
    try {
      const res = await ChallengeApi.analyze(id);
      if (res.success && res.data) {
        setChallenges(prev => prev.map(c => (c._id === id || c.id === id) ? { ...c, ...res.data } : c));
      }
    } catch (err) {
      alert(err.message || 'Analysis failed');
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ padding: '4px 10px', background: '#DBEAFE', color: '#1D4ED8', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
            Government of Jharkhand Official Portal
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginTop: '8px', marginBottom: '6px' }}>
            🏛️ {isHi ? 'सरकारी कमांड सेंटर' : 'Government Command Center'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi ? 'नागरिक समस्याओं का सत्यापन, समीक्षा एवं विश्वविद्यालय आरएंडडी आवंटन' : 'Validate citizen problem reports, monitor AI triage, and route issues to University R&D teams'}
          </p>
        </div>

        {/* Live Analytics Summary KPI Row (P1 Gap Fix) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{stats.total}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'कुल दर्ज रिपोर्ट' : 'Total Challenges'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B' }}>{stats.pending}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'लंबित समीक्षा' : 'Pending Review'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>{stats.validated}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'सत्यापित / स्वीकृत' : 'Validated Issues'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#7C3AED' }}>{stats.matched}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'आरएंडडी आवंटित' : 'R&D Matched'}</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'जिला' : 'District'}
            </label>
            <select value={district} onChange={e => setDistrict(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
              <option value="">{isHi ? 'सभी 24 जिले' : 'All Districts'}</option>
              {JHARKHAND_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'स्थिति' : 'Status'}
            </label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
              <option value="">{isHi ? 'सभी स्थितियां' : 'All Statuses'}</option>
              <option value="submitted">{isHi ? 'प्रस्तुत' : 'Submitted'}</option>
              <option value="under_review">{isHi ? 'समीक्षाधीन' : 'Under Review'}</option>
              <option value="approved">{isHi ? 'स्वीकृत' : 'Approved'}</option>
              <option value="rejected">{isHi ? 'अस्वीकृत' : 'Rejected'}</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'खोजें' : 'Search'}
            </label>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Title/Keywords..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
          </div>
        </div>

        {/* Dynamic Challenges Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#1D4ED8', fontWeight: '700' }}>Loading Command Center feed...</div>
          ) : challenges.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>No reports matching query.</div>
          ) : (
            <div className="table-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: '800' }}>
                    <th style={{ padding: '14px 16px' }}>Title</th>
                    <th style={{ padding: '14px 16px' }}>District</th>
                    <th style={{ padding: '14px 16px' }}>Category</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px' }}>Priority</th>
                    <th style={{ padding: '14px 16px' }}>Government Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {challenges.map((c) => (
                    <tr key={c._id || c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0F172A' }}>
                        <Link to={`/challenges/${c._id || c.id}`} style={{ color: '#1D4ED8', textDecoration: 'none' }}>
                          {c.title}
                        </Link>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>📍 {c.district || 'Ranchi'}</td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>{c.category}</td>
                      <td style={{ padding: '14px 16px' }}><StatusBadge status={c.status} /></td>
                      <td style={{ padding: '14px 16px' }}><PriorityBadge priority={c.priority} /></td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleUpdateStatus(c._id || c.id, 'approved')}
                            style={{ padding: '6px 12px', background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                          >
                            ✓ Validate
                          </button>
                          {(c.status === 'submitted' || c.status === 'under_review') && (
                            <button
                              onClick={() => handleAnalyze(c._id || c.id)}
                              disabled={analyzingId === (c._id || c.id)}
                              style={{ padding: '6px 12px', background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', borderRadius: '6px', fontWeight: '800', cursor: analyzingId === (c._id || c.id) ? 'not-allowed' : 'pointer', fontSize: '12px', opacity: analyzingId === (c._id || c.id) ? 0.7 : 1 }}
                            >
                              {analyzingId === (c._id || c.id) ? '⏳ Analyzing...' : '🧠 AI Analyze'}
                            </button>
                          )}
                          <button
                            onClick={() => handleUpdateStatus(c._id || c.id, 'rejected')}
                            style={{ padding: '6px 12px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
