import ApiClient from './client';

export const ProposalApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return ApiClient.get(`/proposals${query ? `?${query}` : ''}`);
  },
  create: (data) => ApiClient.post('/proposals', data),
  updateStatus: (id, status, remarks) => ApiClient.patch(`/proposals/${id}/status`, { status, remarks })
};
