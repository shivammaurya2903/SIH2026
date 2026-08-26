import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { JHARKHAND_DISTRICTS } from '../../data/districts';
import { AuthApi } from '../../api/auth.api';
import { RoleSelector } from './RoleSelector';
import { PasswordInput } from './PasswordInput';
import { GovernmentVerificationForm } from './GovernmentVerificationForm';

export const RegisterForm = ({ onSwitchToLogin }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const navigate = useNavigate();

  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    district: 'Ranchi',
    department: '',
    designation: '',
    officialContact: '',
    organization: '',
    college: '',
    course: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'government') {
        const res = await AuthApi.registerGovernmentRequest({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || formData.officialContact,
          department: formData.department,
          designation: formData.designation,
          district: formData.district,
          organization: formData.organization || `${formData.department} - ${formData.designation}`
        });

        if (res.success) {
          navigate('/auth/pending-verification');
          return;
        }
      } else {
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role,
          district: formData.district,
          organization: formData.organization || formData.college
        };

        const res = await AuthApi.register(payload);
        if (res.success && res.data) {
          localStorage.setItem('jhar_token', res.data.token);
          localStorage.setItem('jhar_user', JSON.stringify(res.data.user));
          window.location.href = `/${res.data.user.role}/dashboard`;
          return;
        }
      }
    } catch (err) {
      setError(err.message || (isHi ? 'पंजीकरण विफल रहा' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
          {isHi ? 'समाधानसेतु खाता बनाएं' : 'Create Your SamadhanSetu Account'}
        </h2>
        <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
          {isHi ? 'झारखंड के सामाजिक नवाचार मंच में शामिल हों।' : 'Join the Jharkhand Societal Innovation Platform.'}
        </p>
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', marginBottom: '14px', border: '1px solid #FECACA' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* SECTION 1: ROLE & ORGANIZATION */}
        <RoleSelector selectedRole={role} onSelectRole={setRole} />

        {/* SECTION 2: GOVERNMENT VERIFICATION OR BASIC ACCOUNT */}
        {role === 'government' ? (
          <GovernmentVerificationForm formData={formData} onChange={handleChange} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                {isHi ? 'पूरा नाम' : 'Full Name'} *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ramesh Kumar"
                style={{ width: '100%', height: '44px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                {isHi ? 'ईमेल पता' : 'Email Address'} *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="ramesh@example.com"
                style={{ width: '100%', height: '44px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>
        )}

        {/* Role Specific Institution Field */}
        {role !== 'citizen' && role !== 'government' && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'संस्थान / कंपनी का नाम' : 'Institution / Organization Name'}
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. BIT Mesra / Tata Steel CSR"
              style={{ width: '100%', height: '44px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>
        )}

        {role === 'government' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                {isHi ? 'पूरा नाम' : 'Full Name'} *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Officer Name"
                style={{ width: '100%', height: '44px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
                {isHi ? 'सरकारी ईमेल' : 'Official Government Email'} *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="officer@jharkhand.gov.in"
                style={{ width: '100%', height: '44px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>
        )}

        {/* SECTION 3: SECURITY & LOCATION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'पासवर्ड' : 'Password'} *
            </label>
            <PasswordInput value={formData.password} onChange={handleChange} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              {isHi ? 'जिला' : 'District'} *
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              style={{ width: '100%', height: '44px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none' }}
            >
              {JHARKHAND_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            height: '46px',
            background: role === 'government' ? '#B45309' : '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '15px',
            cursor: 'pointer',
            boxShadow: role === 'government' ? '0 4px 14px rgba(180, 83, 9, 0.3)' : '0 4px 14px rgba(37, 99, 235, 0.3)'
          }}
        >
          {loading
            ? (role === 'government' ? (isHi ? 'सत्यापन अनुरोध सबमिट हो रहा है...' : 'Submitting verification request...') : (isHi ? 'खाता बनाया जा रहा है...' : 'Creating account...'))
            : (role === 'government' ? (isHi ? '🏛️ सत्यापन अनुरोध सबमिट करें' : '🏛️ Submit Verification Request') : (isHi ? '🚀 खाता बनाएं' : '🚀 Create Account'))}
        </button>
      </form>

      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
        {isHi ? 'पहले से खाता है?' : 'Already registered?'}{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: '800', cursor: 'pointer', padding: 0, fontSize: '13px' }}
        >
          {isHi ? 'साइन इन करें →' : 'Sign In →'}
        </button>
      </div>
    </div>
  );
};
