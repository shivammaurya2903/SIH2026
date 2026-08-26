import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { CollaborationApi } from '../../api/collaboration.api';
import { ProjectApi } from '../../api/project.api';
import { IndustryProjectCard } from '../../components/industry/IndustryProjectCard';
import { CollaborationForm } from '../../components/collaboration/CollaborationForm';
import { StatusBadge } from '../../components/common/StatusBadge';

export const IndustryDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState('discover');
  const [collaborations, setCollaborations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [selectedProjectForCollab, setSelectedProjectForCollab] = useState(null);

  const fetchIndustryData = async () => {
    setLoading(true);
    try {
      const [collabRes, projRes] = await Promise.all([
        CollaborationApi.getAll().catch(() => ({ success: false, data: [] })),
        ProjectApi.getAll().catch(() => ({ success: false, data: [] }))
      ]);

      if (collabRes.success && collabRes.data) {
        setCollaborations(collabRes.data);
      }
      if (projRes.success && projRes.data) {
        setProjects(projRes.data);
      }
    } catch (err) {
      console.error('Failed to load Industry CSR Portal:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustryData();
  }, []);

  const handleOfferSuccess = () => {
    setSelectedProjectForCollab(null);
    fetchIndustryData();
    setActiveTab('my_collaborations');
  };

  const filteredProjects = projects.filter(p => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      (p.title && p.title.toLowerCase().includes(term)) ||
      (p.district && p.district.toLowerCase().includes(term)) ||
      (p.universityName && p.universityName.toLowerCase().includes(term))
    );
  });

  const pendingCollabs = collaborations.filter(c => c.status === 'pending').length;
  const activeCollabs = collaborations.filter(c => c.status === 'accepted' || c.status === 'active').length;
  const completedCollabs = collaborations.filter(c => c.status === 'completed').length;

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header Bar */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ padding: '4px 10px', background: '#FEF3C7', color: '#B45309', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
            {isHi ? 'उद्योग सीएसआर सहयोग पोर्टल' : 'Industry CSR Collaboration Portal'}
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginTop: '8px', marginBottom: '6px' }}>
            🏭 {isHi ? `नमस्ते, ${user?.organization || 'उद्योग सीएसआर भागीदार'}` : `Welcome, ${user?.organization || 'Industry CSR Partner'}`}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi
              ? 'झारखंड के विश्वविद्यालय आरएंडडी नवाचारों को मेंटरशिप, तकनीकी प्रयोगशालाओं और सीएसआर फंडिंग से सहायता प्रदान करें।'
              : 'Discover societal innovation projects and contribute technical expertise, CSR funding, hardware labs, and deployment support.'}
          </p>
        </div>

        {/* Real Summary KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>{activeCollabs}</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>{isHi ? 'सक्रिय सीएसआर साझेदारियां' : 'Active Collaborations'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B' }}>{pendingCollabs}</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>{isHi ? 'लंबित अनुरोध' : 'Pending Requests'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{projects.length}</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>{isHi ? 'उपलब्ध आरएंडडी परियोजनाएं' : 'Available Projects'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#7C3AED' }}>{completedCollabs}</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>{isHi ? 'पूर्ण की गई परियोजनाएं' : 'Completed Projects'}</div>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('discover')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '14px',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'discover' ? '#1D4ED8' : '#F1F5F9',
              color: activeTab === 'discover' ? '#FFFFFF' : '#475569'
            }}
          >
            🚀 {isHi ? 'आरएंडडी परियोजनाएं खोजें' : 'Discover Projects'} ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('my_collaborations')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '14px',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'my_collaborations' ? '#1D4ED8' : '#F1F5F9',
              color: activeTab === 'my_collaborations' ? '#FFFFFF' : '#475569'
            }}
          >
            💼 {isHi ? 'मेरी सीएसआर साझेदारियां' : 'My Collaborations'} ({collaborations.length})
          </button>
        </div>

        {/* TAB 1: DISCOVER PROJECTS */}
        {activeTab === 'discover' && (
          <div>
            {/* Search Input Bar */}
            <div style={{ marginBottom: '24px' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isHi ? 'शीर्षक, जिला या विश्वविद्यालय द्वारा खोजें...' : 'Search projects by title, district, or university...'}
                style={{ width: '100%', maxWidth: '480px', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#1D4ED8', fontWeight: '800' }}>
                {isHi ? 'परियोजनाएं लोड हो रही हैं...' : 'Loading active R&D projects...'}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '48px', borderRadius: '16px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
                {isHi ? 'सहयोग के लिए वर्तमान में कोई परियोजना उपलब्ध नहीं है।' : 'No projects are currently available for collaboration.'}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {filteredProjects.map((p) => (
                  <IndustryProjectCard
                    key={p._id || p.id}
                    project={p}
                    onOfferClick={(proj) => setSelectedProjectForCollab(proj)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY COLLABORATIONS */}
        {activeTab === 'my_collaborations' && (
          <div>
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#1D4ED8', fontWeight: '800' }}>
                {isHi ? 'साझेदारियां लोड हो रही हैं...' : 'Loading CSR collaborations...'}
              </div>
            ) : collaborations.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '48px', borderRadius: '16px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
                {isHi ? 'अभी तक कोई सीएसआर सहयोग प्रस्ताव नहीं।' : 'No collaboration offers submitted yet.'}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {collaborations.map((c) => (
                  <div key={c._id || c.id} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <StatusBadge status={c.status || 'pending'} />
                      <span style={{ fontSize: '11px', fontWeight: '900', padding: '3px 8px', background: '#FEF3C7', color: '#B45309', borderRadius: '6px' }}>
                        {c.type || 'mentorship'}
                      </span>
                    </div>

                    <h4 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: '900', color: '#0F172A' }}>
                      {c.project?.title || c.projectTitle || 'R&D Solution Support'}
                    </h4>

                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '14px' }}>
                      {c.message || c.proposedContribution || 'Offer submitted'}
                    </p>

                    <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                      <span>Fasting Amount: <strong>₹{c.fundingAmount || 0}</strong></span>
                      <span>Date: <strong>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal rendering CollaborationForm */}
        {selectedProjectForCollab && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
              <CollaborationForm
                project={selectedProjectForCollab}
                onSuccess={handleOfferSuccess}
                onCancel={() => setSelectedProjectForCollab(null)}
              />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
