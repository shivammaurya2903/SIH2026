import ApiClient from './client';

export const AnalyticsApi = {
  getOverview: () => ApiClient.get('/analytics/overview'),
  getPipeline: () => ApiClient.get('/analytics/pipeline'),
  getDistricts: () => ApiClient.get('/analytics/districts')
};
