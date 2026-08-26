import ApiClient from './client';

export const ChallengeApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return ApiClient.get(`/challenges${query ? `?${query}` : ''}`);
  },
  getById: (id) => ApiClient.get(`/challenges/${id}`),
  create: (data) => ApiClient.post('/challenges', data),
  toggleFaced: (id) => ApiClient.post(`/challenges/${id}/faced`, {}),
  updateStatus: (id, status, officialRemarks, priority) => ApiClient.patch(`/challenges/${id}/status`, { status, officialRemarks, priority }),
  getMatches: (id) => ApiClient.get(`/challenges/${id}/matches`),
  analyze: (id) => ApiClient.post(`/challenges/${id}/analyze`, {}),
  getDuplicates: (id) => ApiClient.get(`/challenges/${id}/duplicates`)
};
