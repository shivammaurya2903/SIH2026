const {
  getOverview: getOverviewData,
  getChallengesByCategory,
  getChallengesByDistrict
} = require('../services/analytics.service');

const University = require('../models/University');
const Industry = require('../models/Industry');
const ImpactMetric = require('../models/ImpactMetric');
const { successResponse, errorResponse } = require('../utils/response');

const getOverview = async (req, res) => {
  try {
    const data = await getOverviewData();
    return successResponse(res, data, 'Analytics overview retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getChallenges = async (req, res) => {
  try {
    const data = await getChallengesByCategory();
    return successResponse(res, data, 'Category-wise challenge analytics retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getDistricts = async (req, res) => {
  try {
    const data = await getChallengesByDistrict();
    return successResponse(res, data, 'District-wise challenge analytics retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getUniversities = async (req, res) => {
  try {
    const data = await University.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$district', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    return successResponse(res, data, 'University district distribution retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getIndustries = async (req, res) => {
  try {
    const data = await Industry.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    return successResponse(res, data, 'Industry distribution retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getImpact = async (req, res) => {
  try {
    const data = await ImpactMetric.aggregate([
      {
        $group: {
          _id: null,
          totalBeneficiaries: { $sum: '$beneficiaries' },
          totalDistricts: { $sum: '$districtsImpacted' },
          totalVillages: { $sum: '$villagesImpacted' },
          totalCostSaved: { $sum: '$costSaved' },
          totalJobsCreated: { $sum: '$jobsCreated' },
          averageImpactScore: { $avg: '$impactScore' }
        }
      }
    ]);

    const result = data[0] || {
      totalBeneficiaries: 0,
      totalDistricts: 0,
      totalVillages: 0,
      totalCostSaved: 0,
      totalJobsCreated: 0,
      averageImpactScore: 0
    };

    return successResponse(res, result, 'Impact analytics retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getOverview,
  getChallenges,
  getDistricts,
  getUniversities,
  getIndustries,
  getImpact
};