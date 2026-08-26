import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { CATEGORIES } from '../../data/categories';
import { JHARKHAND_DISTRICTS } from '../../data/districts';
import { ChallengeApi } from '../../api/challenge.api';
import { LocationPicker } from '../../components/report/LocationPicker';
import { SpeechInput } from '../../components/report/SpeechInput';

export const ReportProblemPage = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'water',
    district: 'Ranchi',
    block: '',
    village: '',
    address: '',
    latitude: '',
    longitude: '',
    gpsCoordinates: '',
    images: []
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdChallenge, setCreatedChallenge] = useState(null);

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (newVal) => {
    setFormData({ ...formData, description: newVal });
  };

  const handleLocationChange = (newLocationData) => {
    setFormData(newLocationData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, images: [...prev.images, reader.result] }));
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        gpsCoordinates: formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : formData.gpsCoordinates
      };

      const res = await ChallengeApi.create(payload);
      if (res.success && res.data) {
        setCreatedChallenge(res.data);
        setStep(5);
      }
    } catch (err) {
      setError(err.message || (isHi ? 'रिपोर्ट सबमिट करने में विफल' : 'Failed to submit problem report'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px', maxWidth: '720px' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
            🚨 {isHi ? 'समस्या रिपोर्ट विजार्ड' : 'Societal Problem Report Wizard'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi ? 'झारखंड सरकार और विश्वविद्यालयों के समक्ष अपनी सामुदायिक समस्या दर्ज करें' : 'Submit civic or rural issues directly to Govt of Jharkhand & University R&D teams'}
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', position: 'relative' }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: step >= s ? '#1D4ED8' : '#E2E8F0',
                  color: step >= s ? '#FFFFFF' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '14px'
                }}
              >
                {step > s ? '✓' : s}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: step >= s ? '#1D4ED8' : '#94A3B8', marginTop: '6px' }}>
                {s === 1 ? (isHi ? 'विवरण' : 'Details') : s === 2 ? (isHi ? 'स्थान' : 'Location') : s === 3 ? (isHi ? 'साक्ष्य' : 'Evidence') : (isHi ? 'समीक्षा' : 'Review')}
              </span>
            </div>
          ))}
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '14px', borderRadius: '8px', fontWeight: '700', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          {step === 1 && (
            <div>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {isHi ? 'चरण 1: समस्या शीर्षक एवं विवरण' : 'Step 1: Problem Title & Description'}
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                  {isHi ? 'समस्या का शीर्षक' : 'Problem Title'} *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleTextChange}
                  placeholder={isHi ? 'जैसे: गांव में दूषित पेयजल की समस्या' : 'e.g. Severe drinking water contamination in village'}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                  {isHi ? 'प्रक्षेत्र चुनें' : 'Select Category'} *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleTextChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {isHi ? c.nameHi : c.nameEn}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                  {isHi ? 'विस्तृत विवरण (वाणी इनपुट उपलब्ध 🎤)' : 'Detailed Description (Speech Input Available 🎤)'} *
                </label>
                {/* Integrated Speech Input Component */}
                <SpeechInput
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder={isHi ? 'समस्या का पूरा विवरण लिखें या बोलकर दर्ज करें...' : 'Provide complete details regarding the societal issue or speak using microphone...'}
                  rows={5}
                />
              </div>

              <button
                onClick={() => { if (formData.title && formData.description) setStep(2); else alert(isHi ? 'कृपया शीर्षक और विवरण भरें' : 'Please fill in title and description'); }}
                style={{ width: '100%', padding: '14px', background: '#1D4ED8', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                {isHi ? 'अगला: स्थान जानकारी →' : 'Next: Location Details →'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {isHi ? 'चरण 2: भौगोलिक स्थान' : 'Step 2: Geographical Location'}
              </h3>

              {/* Integrated Live Location Picker (GPS) */}
              <LocationPicker
                locationData={formData}
                onLocationChange={handleLocationChange}
              />

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                  {isHi ? 'जिला' : 'District'} *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleTextChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px' }}
                >
                  {JHARKHAND_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                  {isHi ? 'प्रखंड / ब्लॉक' : 'Block'}
                </label>
                <input
                  type="text"
                  name="block"
                  value={formData.block}
                  onChange={handleTextChange}
                  placeholder="e.g. Kanke"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                  {isHi ? 'गांव / पंचायत / पता' : 'Village / Panchayat / Address'}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleTextChange}
                  placeholder="e.g. Main Chowk, Village Boreya"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  ← {isHi ? 'पीछे' : 'Back'}
                </button>
                <button onClick={() => setStep(3)} style={{ flex: 2, padding: '14px', background: '#1D4ED8', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  {isHi ? 'अगला: साक्ष्य अपलोड →' : 'Next: Upload Evidence →'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {isHi ? 'चरण 3: चित्र एवं साक्ष्य' : 'Step 3: Photos & Evidence'}
              </h3>

              <div style={{ marginBottom: '24px', border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '30px', textAlign: 'center', background: '#F8FAFC' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="evidenceUpload" />
                <label htmlFor="evidenceUpload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#1D4ED8' }}>
                    {uploadingImage ? (isHi ? 'चित्र अपलोड हो रहा है...' : 'Processing image...') : (isHi ? 'सहायक चित्र अपलोड करने के लिए क्लिक करें' : 'Click to upload supporting evidence photo')}
                  </span>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {formData.images.map((img, idx) => (
                    <img key={idx} src={img} alt="Evidence" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '14px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  ← {isHi ? 'पीछे' : 'Back'}
                </button>
                <button onClick={() => setStep(4)} style={{ flex: 2, padding: '14px', background: '#1D4ED8', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  {isHi ? 'अगला: समीक्षा एवं सबमिट →' : 'Next: Review & Submit →'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                {isHi ? 'चरण 4: रिपोर्ट की समीक्षा करें' : 'Step 4: Review Your Report'}
              </h3>

              <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1D4ED8' }}>{formData.title}</h4>
                <p style={{ fontSize: '14px', color: '#334155', marginBottom: '12px' }}>{formData.description}</p>
                <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <span>📍 {formData.district} ({formData.block || 'Central'})</span>
                  <span>📁 {formData.category}</span>
                  {formData.latitude && <span>🛰️ GPS: {formData.latitude}, {formData.longitude}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(3)} style={{ flex: 1, padding: '14px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  ← {isHi ? 'संशोधित करें' : 'Edit'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ flex: 2, padding: '14px', background: '#10B981', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}
                >
                  {submitting ? (isHi ? 'सबमिट हो रहा है...' : 'Submitting Report...') : (isHi ? '🚀 रिपोर्ट सबमिट करें' : '🚀 Submit Report')}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#059669', marginBottom: '10px' }}>
                {isHi ? 'समस्या रिपोर्ट सफलतापूर्वक दर्ज हुई!' : 'Problem Report Submitted Successfully!'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '24px' }}>
                {isHi ? 'आपकी रिपोर्ट Groq AI द्वारा स्वचालित रूप से विश्लेषित की जा रही है।' : 'Your report has been queued for Groq AI automated triage & Government review.'}
              </p>

              {createdChallenge && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', display: 'inline-block', marginBottom: '24px', fontSize: '14px', fontWeight: '700', color: '#1D4ED8' }}>
                  Report ID: {createdChallenge._id || createdChallenge.id}
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button onClick={() => navigate('/citizen/reports')} style={{ padding: '12px 24px', background: '#1D4ED8', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  {isHi ? 'मेरी रिपोर्ट देखें' : 'View My Reports'}
                </button>
                <button onClick={() => { setStep(1); setFormData({ title: '', description: '', category: 'water', district: 'Ranchi', block: '', village: '', address: '', latitude: '', longitude: '', gpsCoordinates: '', images: [] }); }} style={{ padding: '12px 24px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  {isHi ? 'एक और समस्या दर्ज करें' : 'Report Another Issue'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
