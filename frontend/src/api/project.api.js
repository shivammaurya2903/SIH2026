import ApiClient from './client';

export const ProjectApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return ApiClient.get(`/projects${query ? `?${query}` : ''}`);
  },
  getById: (id) => ApiClient.get(`/projects/${id}`),
  create: (data) => ApiClient.post('/projects', data),
  updateStatus: (id, stage, remarks) => ApiClient.patch(`/projects/${id}/status`, { stage, remarks })
};
