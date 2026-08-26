import ApiClient from './client';

export const MilestoneApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return ApiClient.get(`/milestones${query ? `?${query}` : ''}`);
  },
  getById: (id) => ApiClient.get(`/milestones/${id}`),
  create: (data) => ApiClient.post('/milestones', data),
  updateStatus: (id, status, notes) => ApiClient.patch(`/milestones/${id}/status`, { status, notes }),
  delete: (id) => ApiClient.delete(`/milestones/${id}`)
};
