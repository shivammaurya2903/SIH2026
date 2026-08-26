import ApiClient from './client';

export const UserApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return ApiClient.get(`/users${query ? `?${query}` : ''}`);
  },
  getProfile: () => ApiClient.get('/users/profile'),
  updateProfile: (data) => ApiClient.put('/users/profile', data)
};
