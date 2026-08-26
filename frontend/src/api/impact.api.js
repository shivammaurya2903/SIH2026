import ApiClient from './client';

export const ImpactApi = {
  getOverview: () => ApiClient.get('/impact/overview')
};
