import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CollaborationApi } from '../../api/collaboration.api';

const COLLAB_TYPES = [
  { id: 'mentorship', icon: '🎓', labelEn: 'Technical Mentorship', labelHi: 'तकनीकी मार्गदर्शन', descEn: 'Expert engineering & domain guidance', descHi: 'विशेषज्ञ इंजीनियरिंग मार्गदर्शन' },
  { id: 'funding', icon: '💰', labelEn: 'CSR Funding', labelHi: 'सीएसआर फंडिंग', descEn: 'Direct financial & grant support', descHi: 'वित्तीय अनुदान सहायता' },
  { id: 'prototyping', icon: '🧪', labelEn: 'Prototyping Lab Access', labelHi: 'प्रोटोटाइपिंग लैब पहुंच', descEn: 'Hardware lab & testing facilities', descHi: 'हार्डवेयर लैब सुविधाएं' },
  { id: 'testing', icon: '🔬', labelEn: 'Field Testing & QA', labelHi: 'फ़ील्ड परीक्षण एवं गुणवत्ता', descEn: 'Quality assurance & field trial', descHi: 'गुणवत्ता आश्वासन परीक्षण' },
  { id: 'pilot', icon: '🚜', labelEn: 'Ground Pilot Trial', labelHi: 'ग्राउंड पायलट परीक्षण', descEn: 'Real-world community pilot', descHi: 'सामुदायिक पायलट परीक्षण' },
  { id: 'deployment', icon: '🚀', labelEn: 'Scale Deployment', labelHi: 'व्यापक स्तर पर तैनाती', descEn: 'Regional deployment & scaling', descHi: 'क्षेत्रीय स्तर पर कार्यान्वयन' },
  { id: 'technology_transfer', icon: '📜', labelEn: 'Technology Transfer', labelHi: 'प्रौद्योगिकी हस्तांतरण', descEn: 'IP licensing & commercialization', descHi: 'आईपी लाइसेंसिंग एवं व्यावसायीकरण' }
];

export const CollaborationForm = ({ project, onSuccess, onCancel }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [selectedType, setSelectedType] = useState('mentorship');
  const [fundingAmount, setFundingAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!message) {
      setError(isHi ? 'कृपया सहयोग प्रस्ताव विवरण दर्ज करें' : 'Please provide offer details');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        project: project._id || project.id,
        challenge: project.challenge?._id || project.challenge,
        type: selectedType,
        fundingAmount: fundingAmount ? Number(fundingAmount) : 0,
        message,
        proposedContribution: message
      };

      const res = await CollaborationApi.create(payload);

      if (res.success && res.data) {
        if (onSuccess) onSuccess(res.data);
      } else {
        setError(res.message || (isHi ? 'सहयोग प्रस्ताव भेजने में विफल' : 'Failed to submit collaboration offer'));
      }
    } catch (err) {
      setError(err.message || (isHi ? 'प्रस्ताव सबमिट करने में असमर्थ' : 'Unable to submit collaboration offer'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0F172A' }}>
            🤝 {isHi ? 'उद्योग सीएसआर सहयोग का प्रस्ताव दें' : 'Offer CSR Collaboration'}
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            {isHi ? 'चुनें कि आपका संगठन इस परियोजना में कैसे योगदान दे सकता है' : 'Choose how your organization can contribute to this project.'}
          </p>
        </div>
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
        {/* Collaboration Type Selector Grid */}
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>
          {isHi ? 'सहयोग का प्रकार चुनें' : 'SELECT COLLABORATION TYPE'} *
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {COLLAB_TYPES.map((t) => {
            const isSelected = selectedType === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                style={{
                  background: isSelected ? '#EFF6FF' : '#F8FAFC',
                  border: isSelected ? '2px solid #2563EB' : '1px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{t.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: isSelected ? '#2563EB' : '#0F172A' }}>
                  {isHi ? t.labelHi : t.labelEn}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', lineHeight: '1.2' }}>
                  {isHi ? t.descHi : t.descEn}
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Funding Amount */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
            {isHi ? 'अनुमानित सीएसआर फंडिंग राशि (₹) (वैकल्पिक)' : 'Funding Amount (Optional, ₹)'}
          </label>
          <input
            type="number"
            value={fundingAmount}
            onChange={(e) => setFundingAmount(e.target.value)}
            placeholder="e.g. 500000"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Contribution Message */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
            {isHi ? 'प्रस्तावित योगदान विवरण' : 'Proposed Contribution / Support Details'} *
          </label>
          <textarea
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isHi ? 'बताएं कि आपका संगठन तकनीकी मार्गदर्शन, लैब पहुंच या पायलट परीक्षण में कैसे सहायता करेगा...' : 'Describe technical expertise, mentoring availability, hardware facilities, or pilot deployment support...'}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
          />
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
              background: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading
              ? (isHi ? 'प्रस्ताव भेजा जा रहा है...' : 'Sending Offer...')
              : (isHi ? '🤝 सहयोग प्रस्ताव भेजें' : '🤝 Send Collaboration Offer')}
          </button>
        </div>
      </form>
    </div>
  );
};
