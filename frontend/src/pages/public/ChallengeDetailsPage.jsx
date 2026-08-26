import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../auth/AuthContext';
import { ChallengeApi } from '../../api/challenge.api';
import { ProposalForm } from '../../components/proposal/ProposalForm';
import { ChallengeStatusTracker } from '../../components/citizen/ChallengeStatusTracker';

export const ChallengeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const isHi = language === 'hi';

  const [challenge, setChallenge] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faced, setFaced] = useState(false);
  const [facedCount, setFacedCount] = useState(0);
  const [submittingFaced, setSubmittingFaced] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const [res, matchesRes] = await Promise.all([
          ChallengeApi.getById(id),
          ChallengeApi.getMatches(id).catch(() => ({ success: false }))
        ]);

        if (res.success && res.data) {
          setChallenge(res.data);
          setFacedCount(res.data.facedCount || 0);
          if (user && res.data.facedBy && Array.isArray(res.data.facedBy)) {
            setFaced(res.data.facedBy.includes(user.id || user._id));
          }
        }

        if (matchesRes.success && matchesRes.data) {
          setMatches(matchesRes.data);
        }
      } catch (err) {
        console.error('Failed to load challenge details:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadDetails();
  }, [id, user]);

  const handleToggleFaced = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    setSubmittingFaced(true);
    try {
      const res = await ChallengeApi.toggleFaced(id);
      if (res.success && res.data) {
        setFaced(res.data.faced);
        setFacedCount(res.data.facedCount);
      }
    } catch (err) {
      alert(err.message || (isHi ? 'कार्रवाई दर्ज करने में विफल' : 'Failed to record action'));
    } finally {
      setSubmittingFaced(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '80px', color: '#1D4ED8', fontWeight: '800' }}>
          {isHi ? 'विवरण लोड हो रहा है...' : 'Loading challenge details...'}
        </div>
      </PageContainer>
    );
  }

  if (!challenge) {
    return (
      <PageContainer>
        <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
          <h2>{isHi ? 'चुनौती नहीं मिली' : 'Challenge Not Found'}</h2>
          <button onClick={() => navigate('/challenges')} style={{ padding: '10px 20px', background: '#1D4ED8', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '16px' }}>
            {isHi ? 'चुनौतियां देखें' : 'Back to Challenges'}
          </button>
        </div>
      </PageContainer>
    );
  }

  const isEligibleForProposal = user && ['university', 'faculty', 'student'].includes(user.role);

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}>
          ← {isHi ? 'वापस जाएं' : 'Back'}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {/* Main Challenge Content */}
          <div>
            <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <StatusBadge status={challenge.status} />
                <PriorityBadge priority={challenge.priority} />
              </div>

              <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', marginBottom: '16px' }}>
                {challenge.title}
              </h1>

              <p style={{ fontSize: '16px', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-line', marginBottom: '24px' }}>
                {challenge.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', padding: '16px', background: '#F8FAFC', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>{isHi ? 'जिला' : 'District'}</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>📍 {challenge.district || 'Ranchi'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>{isHi ? 'प्रखंड / क्षेत्र' : 'Block / Area'}</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>🏡 {challenge.block || 'Central'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>{isHi ? 'प्रभावित नागरिक' : 'Citizens Affected'}</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1D4ED8' }}>👥 {facedCount}</div>
                </div>
              </div>
            </div>

            {/* "I Faced This Problem" Card */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {isHi ? 'क्या आप भी इस समस्या से प्रभावित हैं?' : 'Are you also affected by this issue?'}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>
                {isHi ? 'अपना समर्थन दर्ज करें ताकि सरकार और विश्वविद्यालय इस प्राथमिकता पर ध्यान दें।' : 'Add your vote to signal severity and help Government & University R&D prioritize this issue.'}
              </p>

              <button
                onClick={handleToggleFaced}
                disabled={submittingFaced}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '15px',
                  cursor: 'pointer',
                  border: 'none',
                  background: faced ? '#ECFDF5' : '#1D4ED8',
                  color: faced ? '#059669' : '#FFFFFF',
                  boxShadow: faced ? '0 0 0 2px #10B981' : '0 4px 12px rgba(29,78,216,0.2)'
                }}
              >
                {faced
                  ? (isHi ? '✓ अंकित — आपको यह समस्या है' : '✓ Marked — You Faced This Problem')
                  : (isHi ? '✋ मुझे भी यह समस्या है' : '✋ I Faced This Problem')}
              </button>
            </div>

            {/* University / Faculty / Student R&D Proposal CTA Card */}
            {isEligibleForProposal && (
              <div style={{ marginBottom: '24px' }}>
                {!showProposalForm ? (
                  <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '24px', borderRadius: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '900', color: '#1E4ED8' }}>
                      🎓 {isHi ? 'क्या आपका विश्वविद्यालय इस समस्या को हल कर सकता है?' : 'Can your University or R&D team solve this problem?'}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#3B82F6', marginBottom: '16px' }}>
                      {isHi ? 'सरकारी कमांड सेंटर की समीक्षा के लिए एक संरचित आरएंडडी प्रस्ताव सबमिट करें।' : 'Submit a structured R&D solution proposal for Government Command Center review & project authorization.'}
                    </p>
                    <button
                      onClick={() => setShowProposalForm(true)}
                      style={{
                        padding: '12px 24px',
                        background: '#1D4ED8',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '15px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)'
                      }}
                    >
                      🚀 {isHi ? 'आरएंडडी प्रस्ताव सबमिट करें' : 'Submit R&D Proposal'}
                    </button>
                  </div>
                ) : (
                  <ProposalForm
                    challengeId={id}
                    challengeTitle={challenge.title}
                    onCancel={() => setShowProposalForm(false)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar Info & Status Tracker */}
          <div>
            {/* Live 10-Stage Resolution Lifecycle Tracker */}
            <div style={{ marginBottom: '24px' }}>
              <ChallengeStatusTracker status={challenge.status} currentStage={challenge.currentStage} />
            </div>

            {/* AI Analysis Card */}
            <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '24px', borderRadius: '16px', color: '#FFFFFF', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#38BDF8' }}>⚡ Groq AI Analysis</span>
                <span style={{ fontSize: '11px', background: 'rgba(56,189,248,0.2)', color: '#38BDF8', padding: '3px 8px', borderRadius: '9999px', fontWeight: '700' }}>Automated Triage</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'अनुशंसित श्रेणी' : 'Inferred Category'}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>{challenge.aiAnalysis?.category || challenge.category || 'General Infrastructure'}</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'आवश्यक कौशल' : 'Required R&D Skills'}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {(challenge.aiAnalysis?.requiredSkills || ['Civil Engg', 'Water Management', 'GIS']).map((skill, idx) => (
                    <span key={idx} style={{ padding: '3px 8px', background: '#334155', color: '#F8FAFC', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* University R&D Matches */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
                🎓 {isHi ? 'विश्वविद्यालय आरएंडडी मैच' : 'University R&D Matches'}
              </h3>

              {matches.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#64748B', fontStyle: 'italic' }}>
                  {isHi ? 'कोई कृत्रिम स्कोर नहीं — सरकारी सत्यापन के बाद आरएंडडी मैच प्रदर्शित होंगे।' : 'Truthful Match Engine: Real university matches appear upon validation.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {matches.map((m, idx) => (
                    <div key={idx} style={{ padding: '12px', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '14px', color: '#0F172A' }}>
                        <span>{m.universityName || 'BIT Mesra'}</span>
                        <span style={{ color: '#10B981' }}>{m.score}% Match</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                        {m.reason || 'Expertise in domain & geographic proximity'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
