import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ProposalApi } from '../../api/proposal.api';

export const ProposalForm = ({ challengeId, challengeTitle, onSuccess, onCancel }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [formData, setFormData] = useState({
    title: challengeTitle ? (isHi ? `आरएंडडी प्रस्ताव: ${challengeTitle}` : `R&D Proposal: ${challengeTitle}`) : '',
    problemStatement: '',
    proposedSolution: '',
    methodology: '',
    expectedImpact: '',
    requiredResources: '',
    technologies: '',
    estimatedBudget: '',
    durationInMonths: '6'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.proposedSolution) {
      setError(isHi ? 'कृपया शीर्षक और प्रस्तावित समाधान भरें' : 'Please provide proposal title and proposed solution');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        challenge: challengeId,
        title: formData.title,
        problemStatement: formData.problemStatement,
        proposedSolution: formData.proposedSolution,
        methodology: formData.methodology,
        expectedImpact: formData.expectedImpact,
        requiredResources: formData.requiredResources,
        technologies: formData.technologies ? formData.technologies.split(',').map(s => s.trim()) : [],
        estimatedBudget: formData.estimatedBudget ? Number(formData.estimatedBudget) : 0,
        durationInMonths: formData.durationInMonths ? Number(formData.durationInMonths) : 6
      };

      const res = await ProposalApi.create(payload);

      if (res.success && res.data) {
        setSuccessData(res.data);
        if (onSuccess) onSuccess(res.data);
      } else {
        setError(res.message || (isHi ? 'प्रस्ताव जमा करने में विफल' : 'Failed to submit proposal'));
      }
    } catch (err) {
      setError(err.message || (isHi ? 'सर्वर त्रुटि। पुनः प्रयास करें।' : 'Server error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
        <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#059669', marginBottom: '8px' }}>
          {isHi ? 'आरएंडडी प्रस्ताव सफलतापूर्वक जमा किया गया!' : 'R&D Proposal Submitted Successfully!'}
        </h3>
        <p style={{ fontSize: '14px', color: '#047857', marginBottom: '16px' }}>
          {isHi ? 'आपका प्रस्ताव समीक्षा के लिए सरकारी कमांड सेंटर को भेज दिया गया है।' : 'Your proposal has been routed to the Government Command Center for review & authorization.'}
        </p>
        <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', display: 'inline-block', fontSize: '13px', fontWeight: '800', color: '#0F172A', marginBottom: '20px', border: '1px solid #D1FAE5' }}>
          Proposal ID: {successData._id || successData.id}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{ padding: '10px 20px', background: '#059669', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0F172A' }}>
          🎓 {isHi ? 'आरएंडडी समाधान प्रस्ताव जमा करें' : 'Submit R&D Solution Proposal'}
        </h3>
        {onCancel && (
          <button onClick={onCancel} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: '900', color: '#64748B' }}>
            ✕
          </button>
        )}
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Proposal Title */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
            {isHi ? 'प्रस्ताव का शीर्षक' : 'Proposal Title'} *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder={isHi ? 'आरएंडडी प्रस्ताव शीर्षक...' : 'R&D Proposal Title...'}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* Proposed Solution */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
            {isHi ? 'प्रस्तावित आरएंडडी समाधान' : 'Proposed R&D Solution'} *
          </label>
          <textarea
            name="proposedSolution"
            rows={4}
            required
            value={formData.proposedSolution}
            onChange={handleChange}
            placeholder={isHi ? 'तकनीकी समाधान और नवाचार दृष्टिकोण का विवरण दें...' : 'Describe technical architecture, innovation approach, and implementation strategy...'}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
          />
        </div>

        {/* Methodology & Expected Impact (2 Columns on Desktop) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'कार्यप्रणाली (Methodology)' : 'Methodology & Research Plan'}
            </label>
            <textarea
              name="methodology"
              rows={3}
              value={formData.methodology}
              onChange={handleChange}
              placeholder={isHi ? 'चरणबद्ध अनुसंधान योजना...' : 'Phased execution & prototyping roadmap...'}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'अपेक्षित सामाजिक प्रभाव' : 'Expected Societal Impact'}
            </label>
            <textarea
              name="expectedImpact"
              rows={3}
              value={formData.expectedImpact}
              onChange={handleChange}
              placeholder={isHi ? 'नागरिकों और समुदाय पर प्रभाव...' : 'Quantifiable benefits to citizens & region...'}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>
        </div>

        {/* Budget, Duration, Technologies */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'अनुमानित बजट (₹)' : 'Estimated Budget (₹)'}
            </label>
            <input
              type="number"
              name="estimatedBudget"
              value={formData.estimatedBudget}
              onChange={handleChange}
              placeholder="e.g. 250000"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'अवधि (महीने)' : 'Duration (Months)'}
            </label>
            <input
              type="number"
              name="durationInMonths"
              value={formData.durationInMonths}
              onChange={handleChange}
              placeholder="6"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'तकनीक (कॉमा अलग)' : 'Technologies (comma separated)'}
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="e.g. IoT, GIS, Water Filters"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{ flex: 1, padding: '12px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 2,
              padding: '12px',
              background: '#1D4ED8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading
              ? (isHi ? 'सबमिट हो रहा है...' : 'Submitting Proposal...')
              : (isHi ? '🚀 आरएंडडी प्रस्ताव जमा करें' : '🚀 Submit R&D Proposal')}
          </button>
        </div>
      </form>
    </div>
  );
};
