import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useLanguage } from '../../i18n/LanguageContext';
import { NotificationApi } from '../../api/notification.api';

export const NotificationsPage = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await NotificationApi.getAll();
        if (res.success && res.data) {
          setNotifications(res.data);
        }
      } catch (err) {
        console.error('Failed to load notifications:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await NotificationApi.markAsRead(id);
      if (res.success) {
        setNotifications(prev => prev.map(n => (n._id === id || n.id === id) ? { ...n, isRead: true } : n));
      }
    } catch (err) {
      console.error('Failed to mark read:', err.message);
    }
  };

  return (
    <PageContainer>
      <div className="container" style={{ padding: '40px 16px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              🔔 {isHi ? 'सूचनाएं एवं अलर्ट' : 'Notifications & Alerts'}
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>
              {isHi ? 'रिपोर्ट स्थिति परिवर्तन, आरएंडडी मैच और सरकारी अपडेट' : 'Real-time challenge status updates, R&D matches, and government triage logs'}
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#1D4ED8', fontWeight: '700' }}>Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
            {isHi ? 'कोई नई सूचना नहीं है।' : 'No notifications found.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map((n) => (
              <div
                key={n._id || n.id}
                style={{
                  background: n.isRead ? '#FFFFFF' : '#EFF6FF',
                  padding: '20px',
                  borderRadius: '12px',
                  border: `1px solid ${n.isRead ? '#E2E8F0' : '#BFDBFE'}`,
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                    {n.title || n.message}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>
                    {n.createdAt ? new Date(n.createdAt).toLocaleString() : 'Recent'}
                  </div>
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n._id || n.id)}
                    style={{ padding: '6px 12px', background: '#1D4ED8', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
