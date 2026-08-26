import ApiClient from './client';

export const TeamApi = {
  getAll: () => ApiClient.get('/teams'),
  getById: (id) => ApiClient.get(`/teams/${id}`),
  create: (data) => ApiClient.post('/teams', data),
  addMember: (teamId, memberData) => ApiClient.post(`/teams/${teamId}/members`, memberData)
};
