import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { UserApi } from '../../api/user.api';
import { AnalyticsApi } from '../../api/analytics.api';

export const AdminDashboard = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, analyticsRes] = await Promise.all([
          UserApi.getAll(),
          AnalyticsApi.getOverview()
        ]);

        if (usersRes.success && usersRes.data) {
          setUsers(usersRes.data);
        }
        if (analyticsRes.success && analyticsRes.data) {
          setAnalytics(analyticsRes.data);
        }
      } catch (err) {
        console.error('Failed to load System Admin Console:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const roleCounts = users.reduce((acc, u) => {
    const r = u.role || 'citizen';
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
            System Administrator Console
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0F172A', marginTop: '8px', marginBottom: '6px' }}>
            🛡️ {isHi ? 'सिस्टम प्रशासक डैशबोर्ड' : 'System Administrator Console'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            {isHi ? 'मंच उपयोगकर्ताओं, भूमिकाओं, ऑडिट लॉग्स एवं सुरक्षा मापदंडों का प्रशासन' : 'Manage platform users, RBAC role permissions, system audit logs, and security parameters'}
          </p>
        </div>

        {/* Live System Metrics (P0 Audit Gap Fix) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#1D4ED8' }}>{users.length}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'कुल पंजीकृत उपयोगकर्ता' : 'Total Registered Users'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>{roleCounts.citizen || 0}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'नागरिक सदस्य' : 'Citizens'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#7C3AED' }}>{(roleCounts.student || 0) + (roleCounts.faculty || 0)}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'विश्वविद्यालय सदस्य' : 'University Members'}</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B' }}>{roleCounts.government || 0}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748B' }}>{isHi ? 'सरकारी अधिकारी' : 'Gov Officials'}</div>
          </div>
        </div>

        {/* User Management Table */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
          👥 {isHi ? 'उपयोगकर्ता निर्देशिका एवं भूमिकाएं' : 'User Directory & RBAC Roles'}
        </h3>

        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#DC2626', fontWeight: '700' }}>Loading user directory...</div>
          ) : (
            <div className="table-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: '800' }}>
                    <th style={{ padding: '14px 16px' }}>Name</th>
                    <th style={{ padding: '14px 16px' }}>Email</th>
                    <th style={{ padding: '14px 16px' }}>Role</th>
                    <th style={{ padding: '14px 16px' }}>District</th>
                    <th style={{ padding: '14px 16px' }}>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id || u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0F172A' }}>{u.name}</td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>{u.email}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ padding: '4px 10px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: '9999px', fontSize: '12px', fontWeight: '800' }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>📍 {u.district || 'Ranchi'}</td>
                      <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '13px' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
