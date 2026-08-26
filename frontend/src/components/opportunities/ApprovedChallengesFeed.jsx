import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeApi } from '../../api/challenge.api';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';

export const ApprovedChallengesFeed = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      setLoading(true);
      try {
        const res = await ChallengeApi.getAll({ status: 'approved' });
        if (res.success && res.data) {
          setChallenges(res.data);
        }
      } catch (err) {
        console.error('Failed to load Approved Challenges Feed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#1D4ED8', fontWeight: '800' }}>
        {isHi ? 'स्वीकृत चुनौतियां लोड हो रही हैं...' : 'Loading Government Approved Challenges Hub...'}
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
        {isHi ? 'वर्तमान में कोई स्वीकृत चुनौती उपलब्ध नहीं है।' : 'No government-approved challenges currently open for evaluation.'}
      </div>
    );
  }

  const role = user?.role || 'public';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
      {challenges.map((c) => (
        <div key={c._id || c.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <StatusBadge status={c.status} />
              <PriorityBadge priority={c.priority} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginBottom: '8px', lineHeight: '1.3' }}>
              {c.title}
            </h3>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {c.description}
            </p>

            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', marginBottom: '20px', fontSize: '12px', color: '#64748B' }}>
              <div>📍 District: <strong style={{ color: '#0F172A' }}>{c.district || 'Ranchi'}</strong></div>
              <div>🏷️ Category: <strong style={{ color: '#0F172A' }}>{c.category}</strong></div>
            </div>
          </div>

          <div>
            {['university', 'faculty', 'student'].includes(role) && (
              <button
                onClick={() => navigate(`/challenges/${c._id || c.id}`)}
                style={{ width: '100%', padding: '12px', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                🚀 {isHi ? 'मूल्यांकन करें और प्रस्ताव सबमिट करें' : 'Evaluate & Submit R&D Proposal'}
              </button>
            )}

            {role === 'industry' && (
              <button
                onClick={() => navigate('/industry/dashboard')}
                style={{ width: '100%', padding: '12px', background: '#10B981', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                🤝 {isHi ? 'सीएसआर सहायता की पेशकश करें' : 'Offer Industry CSR Support'}
              </button>
            )}

            {role === 'government' && (
              <button
                onClick={() => navigate('/government/dashboard')}
                style={{ width: '100%', padding: '12px', background: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                🏛️ {isHi ? 'कमांड सेंटर में निगरानी करें' : 'Monitor in Command Center'}
              </button>
            )}

            {['citizen', 'public', 'admin'].includes(role) && (
              <button
                onClick={() => navigate(`/challenges/${c._id || c.id}`)}
                style={{ width: '100%', padding: '12px', background: '#F1F5F9', color: '#1D4ED8', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                📖 {isHi ? 'सार्वजनिक विवरण देखें' : 'View Public Details'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
