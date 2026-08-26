import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { TeamApi } from '../../api/team.api';

export const UniversityTeamsPage = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', department: 'Computer Science & Engineering', leaderName: '' });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await TeamApi.getAll();
        if (res.success && res.data) {
          setTeams(res.data);
        }
      } catch (err) {
        console.error('Failed to load teams:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await TeamApi.create(newTeam);
      if (res.success && res.data) {
        setTeams(prev => [res.data, ...prev]);
        setShowModal(false);
        setNewTeam({ name: '', department: 'Computer Science & Engineering', leaderName: '' });
      }
    } catch (err) {
      alert(err.message || 'Failed to create team');
    }
  };

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              🎓 {isHi ? 'विश्वविद्यालय आरएंडडी टीम प्रबंधन' : 'University R&D Team Management'}
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>
              {isHi ? 'छात्र नवाचारकर्ताओं और संकाय मेंटर्स की टीम बनाएं एवं सामाजिक चुनौतियों के लिए आवंटित करें' : 'Form student innovator teams, assign faculty mentors, and allocate teams to verified societal challenges'}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{ padding: '12px 24px', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}
          >
            + {isHi ? 'नई आरएंडडी टीम बनाएं' : 'Create New R&D Team'}
          </button>
        </div>

        {/* Teams Feed */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#1D4ED8', fontWeight: '700' }}>Loading university teams...</div>
        ) : teams.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
            <p style={{ color: '#64748B' }}>{isHi ? 'कोई आरएंडडी टीम नहीं मिली।' : 'No R&D teams formed yet.'}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {teams.map((t) => (
              <div key={t._id || t.id} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#1D4ED8', background: '#EFF6FF', padding: '4px 10px', borderRadius: '9999px' }}>
                    {t.department || 'R&D Department'}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#10B981' }}>
                    👥 {t.members?.length || 1} Members
                  </span>
                </div>

                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                  {t.name}
                </h3>
                <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
                  Leader: <strong>{t.leaderName || 'Student Lead'}</strong>
                </div>

                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '13px', color: '#475569' }}>
                  Faculty Mentor: <strong>{t.mentorName || 'Dr. A. K. Singh'}</strong>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Creating New Team */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
            <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '900', color: '#0F172A' }}>
                {isHi ? 'नई आरएंडडी टीम बनाएं' : 'Create New R&D Team'}
              </h3>

              <form onSubmit={handleCreateTeam}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Team Name</label>
                  <input
                    type="text"
                    required
                    value={newTeam.name}
                    onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                    placeholder="e.g. HydroTech Innovators"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Department</label>
                  <input
                    type="text"
                    required
                    value={newTeam.department}
                    onChange={e => setNewTeam({ ...newTeam, department: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Student Leader Name</label>
                  <input
                    type="text"
                    required
                    value={newTeam.leaderName}
                    onChange={e => setNewTeam({ ...newTeam, leaderName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ flex: 2, padding: '12px', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
