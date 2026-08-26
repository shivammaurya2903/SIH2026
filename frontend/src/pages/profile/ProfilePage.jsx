import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { UserApi } from '../../api/user.api';

export const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [name, setName] = useState(user?.name || '');
  const [district, setDistrict] = useState(user?.district || 'Ranchi');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    try {
      const res = await UserApi.updateProfile({ name, district });
      if (res.success) {
        await refreshUser();
        setMessage('Profile updated successfully!');
      }
    } catch (err) {
      setMessage(err.message || 'Profile update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px', maxWidth: '600px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
            👤 {isHi ? 'उपयोगकर्ता प्रोफ़ाइल' : 'User Account Profile'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>
            {isHi ? 'अपनी व्यक्तिगत जानकारी एवं जिला स्थान अपडेट करें' : 'Manage your personal account details, role permissions, and location'}
          </p>
        </div>

        {message && (
          <div style={{ padding: '12px', background: '#ECFDF5', color: '#059669', borderRadius: '8px', fontWeight: '700', marginBottom: '20px' }}>
            {message}
          </div>
        )}

        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                {isHi ? 'भूमिका (अपरिवर्तनीय)' : 'Assigned Role (Read-only)'}
              </label>
              <input
                type="text"
                disabled
                value={user?.role || 'user'}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1D4ED8', fontWeight: '800', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                {isHi ? 'ईमेल पता' : 'Email Address'}
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#64748B', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                {isHi ? 'पूरा नाम' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                {isHi ? 'जिला' : 'District Location'}
              </label>
              <input
                type="text"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              style={{ width: '100%', padding: '14px', background: '#1D4ED8', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}
            >
              {updating ? (isHi ? 'अपडेट हो रहा है...' : 'Saving Changes...') : (isHi ? 'प्रोफ़ाइल सहेजें' : 'Save Changes')}
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};
