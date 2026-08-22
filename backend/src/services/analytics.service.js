const Challenge = require('../models/Challenge');
const Project = require('../models/Project');
const University = require('../models/University');
const Industry = require('../models/Industry');
const ImpactMetric = require('../models/ImpactMetric');

const getOverview = async () => {
  const [
    totalChallenges,
    challengesByStatusRaw,
    totalProjects,
    projectsByStatusRaw,
    totalUniversities,
    totalIndustries,
    impactSummary
  ] = await Promise.all([
    Challenge.countDocuments(),
    Challenge.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]),
    Project.countDocuments(),
    Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]),
    University.countDocuments({ isActive: true }),
    Industry.countDocuments({ isActive: true }),
    ImpactMetric.aggregate([
      {
        $group: {
          _id: null,
          totalBeneficiaries: { $sum: '$beneficiaries' },
          totalCostSaved: { $sum: '$costSaved' },
          totalJobsCreated: { $sum: '$jobsCreated' }
        }
      }
    ])
  ]);

  const challengesByStatus = {};
  challengesByStatusRaw.forEach((item) => {
    challengesByStatus[item._id] = item.count;
  });

  const projectsByStatus = {};
  projectsByStatusRaw.forEach((item) => {
    projectsByStatus[item._id] = item.count;
  });

  const impact = impactSummary[0] || {
    totalBeneficiaries: 0,
    totalCostSaved: 0,
    totalJobsCreated: 0
  };

  return {
    totalChallenges,
    challengesByStatus,
    totalProjects,
    projectsByStatus,
    totalUniversities,
    totalIndustries,
    impact
  };
};

const getChallengesByCategory = async () => {
  return Challenge.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

const getChallengesByDistrict = async () => {
  return Challenge.aggregate([
    {
      $group: {
        _id: '$location.district',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

module.exports = {
  getOverview,
  getChallengesByCategory,
  getChallengesByDistrict
};