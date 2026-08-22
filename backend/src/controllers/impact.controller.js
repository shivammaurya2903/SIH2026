const ImpactMetric = require('../models/ImpactMetric');
const Project = require('../models/Project');
const { successResponse, errorResponse } = require('../utils/response');

const createImpactMetric = async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return errorResponse(res, 'Project ID is required', 400);
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return errorResponse(res, 'Project not found', 404);
    }

    const metric = await ImpactMetric.create({
      ...req.body,
      project: projectId
    });

    return successResponse(res, metric, 'Impact metric recorded successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getProjectImpact = async (req, res) => {
  try {
    const metrics = await ImpactMetric.find({ project: req.params.projectId })
      .populate('project', 'title status')
      .sort({ createdAt: -1 });

    return successResponse(res, metrics, 'Project impact metrics retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getImpactOverview = async (req, res) => {
  try {
    const aggregated = await ImpactMetric.aggregate([
      {
        $group: {
          _id: null,
          totalBeneficiaries: { $sum: '$beneficiaries' },
          totalDistricts: { $sum: '$districtsImpacted' },
          totalVillages: { $sum: '$villagesImpacted' },
          totalCostSaved: { $sum: '$costSaved' },
          totalJobsCreated: { $sum: '$jobsCreated' },
          totalPatents: { $sum: '$patents' },
          totalStartups: { $sum: '$startupsCreated' },
          avgImpactScore: { $avg: '$impactScore' },
          avgSatisfaction: { $avg: '$citizenSatisfaction' }
        }
      }
    ]);

    const result = aggregated[0] || {
      totalBeneficiaries: 0,
      totalDistricts: 0,
      totalVillages: 0,
      totalCostSaved: 0,
      totalJobsCreated: 0,
      totalPatents: 0,
      totalStartups: 0,
      avgImpactScore: 0,
      avgSatisfaction: 0
    };

    return successResponse(res, result, 'Aggregated impact metrics retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createImpactMetric,
  getProjectImpact,
  getImpactOverview
};
