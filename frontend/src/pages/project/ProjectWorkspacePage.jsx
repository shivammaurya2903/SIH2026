import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { ProjectLifecycleTracker } from '../../components/project/ProjectLifecycleTracker';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { ProjectApi } from '../../api/project.api';
import { MilestoneApi } from '../../api/milestone.api';

export const ProjectWorkspacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStage, setUpdatingStage] = useState(false);

  // Milestone state
  const [milestones, setMilestones] = useState([]);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [milestoneDueDate, setMilestoneDueDate] = useState('');
  const [creatingMilestone, setCreatingMilestone] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const res = await ProjectApi.getById(id);
        if (res.success && res.data) {
          setProject(res.data);
        }

        const msRes = await MilestoneApi.getAll({ project: id });
        if (msRes.success && msRes.data) {
          setMilestones(msRes.data);
        }
      } catch (err) {
        console.error('Failed to load Project Workspace:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjectDetails();
  }, [id]);

  const handleStageAdvance = async (nextStage) => {
    setUpdatingStage(true);
    try {
      const res = await ProjectApi.updateStatus(id, nextStage, `Stage advanced to ${nextStage}`);
      if (res.success && res.data) {
        setProject(res.data);
      }
    } catch (err) {
      alert(err.message || 'Stage update failed');
    } finally {
      setUpdatingStage(false);
    }
  };

  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    setCreatingMilestone(true);
    try {
      const res = await MilestoneApi.create({
        project: id,
        title: milestoneTitle,
        description: milestoneDescription,
        dueDate: milestoneDueDate
      });
      if (res.success && res.data) {
        setMilestones([res.data, ...milestones]);
        setMilestoneTitle('');
        setMilestoneDescription('');
        setMilestoneDueDate('');
        setShowMilestoneForm(false);
      }
    } catch (err) {
      alert(err.message || 'Failed to create milestone');
    } finally {
      setCreatingMilestone(false);
    }
  };

  const handleCompleteMilestone = async (msId) => {
    try {
      const res = await MilestoneApi.updateStatus(msId, 'completed');
      if (res.success && res.data) {
        setMilestones(milestones.map(m => (m._id === msId || m.id === msId) ? res.data : m));
      }
    } catch (err) {
      alert(err.message || 'Failed to update milestone status');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '80px', color: '#1D4ED8', fontWeight: '800' }}>
          {isHi ? 'प्रोजेक्ट कार्यस्थान लोड हो रहा है...' : 'Loading Project R&D Workspace...'}
        </div>
      </PageContainer>
    );
  }

  if (!project) {
    return (
      <PageContainer>
        <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
          <h2>{isHi ? 'प्रोजेक्ट नहीं मिला' : 'Project Not Found'}</h2>
          <button onClick={() => navigate('/challenges')} style={{ padding: '10px 20px', background: '#1D4ED8', color: '#FFF', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '16px' }}>
            {isHi ? 'चुनौतियां देखें' : 'Back to Challenges'}
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: '700', cursor: 'pointer', marginBottom: '20px' }}>
          ← {isHi ? 'वापस जाएं' : 'Back'}
        </button>

        <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <StatusBadge status={project.stage || 'in_progress'} />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>📍 District: {project.district || 'Ranchi'}</span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>
            {project.title}
          </h1>

          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#64748B', padding: '14px', background: '#F8FAFC', borderRadius: '10px' }}>
            <div>Lead University: <strong style={{ color: '#0F172A' }}>{project.universityName || 'BIT Mesra'}</strong></div>
            <div>Faculty Mentor: <strong style={{ color: '#0F172A' }}>{project.facultyMentor || 'Prof. A. K. Singh'}</strong></div>
            <div>Team Members: <strong style={{ color: '#0F172A' }}>{project.teamMembers?.length || 4} Students</strong></div>
          </div>
        </div>

        {/* Dynamic 7-Stage Lifecycle Tracker */}
        <div style={{ marginBottom: '30px' }}>
          <ProjectLifecycleTracker currentStage={project.stage || 'IN_PROGRESS'} />
        </div>

        {/* Milestone Management Section */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
              {isHi ? 'आरएंडडी माइलस्टोन' : 'R&D Milestones'}
            </h3>
            <button 
              onClick={() => setShowMilestoneForm(!showMilestoneForm)}
              style={{ padding: '8px 16px', background: '#1D4ED8', color: '#FFF', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}
            >
              {showMilestoneForm ? (isHi ? 'रद्द करें' : 'Cancel') : (isHi ? 'माइलस्टोन जोड़ें' : 'Add Milestone')}
            </button>
          </div>

          {showMilestoneForm && (
            <form onSubmit={handleCreateMilestone} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Title</label>
                <input 
                  type="text" 
                  value={milestoneTitle} 
                  onChange={e => setMilestoneTitle(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Description</label>
                <textarea 
                  value={milestoneDescription} 
                  onChange={e => setMilestoneDescription(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', minHeight: '60px' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>Due Date</label>
                <input 
                  type="date" 
                  value={milestoneDueDate} 
                  onChange={e => setMilestoneDueDate(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                />
              </div>
              <button 
                type="submit" 
                disabled={creatingMilestone}
                style={{ padding: '10px 20px', background: '#10B981', color: '#FFF', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', width: '100%' }}
              >
                {creatingMilestone ? 'Creating...' : 'Submit Milestone'}
              </button>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {milestones.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748B', fontSize: '14px', padding: '20px' }}>
                No milestones yet — create the first R&D milestone
              </p>
            ) : (
              milestones.map((ms) => (
                <div key={ms._id || ms.id} style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>{ms.title}</h4>
                      <StatusBadge status={ms.status || 'pending'} />
                    </div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#475569' }}>{ms.description}</p>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
                      📅 Due: {new Date(ms.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  {ms.status !== 'completed' && (
                    <button 
                      onClick={() => handleCompleteMilestone(ms._id || ms.id)}
                      style={{ padding: '8px 16px', background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', marginLeft: '16px' }}
                    >
                      ✓ Mark Complete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stage Advancement Control Bar */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
              {isHi ? 'प्रोजेक्ट चरण प्रगति नियंत्रण' : 'Project Stage Advancement Control'}
            </h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              {isHi ? 'सत्यापन के बाद परियोजना को अगले चरण में आगे बढ़ाएं' : 'Advance the R&D solution through validation, prototype build, testing, and field deployment'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleStageAdvance('TESTING')}
              disabled={updatingStage}
              style={{ padding: '10px 18px', background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
            >
              🧪 Mark Testing Phase
            </button>
            <button
              onClick={() => handleStageAdvance('DEPLOYED')}
              disabled={updatingStage}
              style={{ padding: '10px 18px', background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
            >
              🚀 Field Deploy Solution
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
