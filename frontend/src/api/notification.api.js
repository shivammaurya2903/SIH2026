import ApiClient from './client';

export const NotificationApi = {
  getAll: () => ApiClient.get('/notifications'),
  markAsRead: (id) => ApiClient.patch(`/notifications/${id}/read`, {}),
  markAllAsRead: () => ApiClient.post('/notifications/read-all', {})
};
