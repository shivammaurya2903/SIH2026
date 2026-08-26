import ApiClient from './client';

export const CollaborationApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return ApiClient.get(`/collaborations${query ? `?${query}` : ''}`);
  },
  create: (data) => ApiClient.post('/collaborations', data),
  updateStatus: (id, status, remarks) => ApiClient.patch(`/collaborations/${id}/status`, { status, remarks })
};
