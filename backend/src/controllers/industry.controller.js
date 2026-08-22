const Industry = require('../models/Industry');
const { successResponse, errorResponse } = require('../utils/response');

const createIndustry = async (req, res) => {
  try {
    const industry = await Industry.create(req.body);
    return successResponse(res, industry, 'Industry profile created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getIndustries = async (req, res) => {
  try {
    const { search, district, type, domain } = req.query;

    const filter = { isActive: true };

    if (district) {
      filter.district = district;
    }

    if (type) {
      filter.type = type;
    }

    if (domain) {
      filter.domains = {
        $in: domain.split(',')
      };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const industries = await Industry.find(filter).sort({ createdAt: -1 });

    return successResponse(res, industries, 'Industries retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getIndustry = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return errorResponse(res, 'Industry not found', 404);
    }

    return successResponse(res, industry, 'Industry details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!industry) {
      return errorResponse(res, 'Industry not found', 404);
    }

    return successResponse(res, industry, 'Industry profile updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createIndustry,
  getIndustries,
  getIndustry,
  updateIndustry
};