import ApiClient from './client';

export const AuthApi = {
  login: (email, password) => ApiClient.post('/auth/login', { email, password }),
  register: (userData) => ApiClient.post('/auth/register', userData),
  registerGovernmentRequest: (govData) => ApiClient.post('/auth/register-government-request', govData),
  getMe: () => ApiClient.get('/auth/me')
};
