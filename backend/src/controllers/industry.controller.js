const Industry = require('../models/Industry');
const { successResponse, errorResponse } = require('../utils/response');

const ALLOWED_INDUSTRY_FIELDS = [
  'name',
  'description',
  'type',
  'email',
  'phone',
  'website',
  'address',
  'district',
  'state',
  'domains',
  'expertise',
  'technologies',
  'csrInterests',
  'fundingCapabilities',
  'mentorshipCapabilities',
  'prototypingCapabilities',
  'deploymentCapabilities',
  'contactPerson'
];

const createIndustry = async (req, res) => {
  try {
    const payload = {};
    ALLOWED_INDUSTRY_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const industry = await Industry.create(payload);
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
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return errorResponse(res, 'Industry not found', 404);
    }

    if (req.user.role === 'industry') {
      const isOwner =
        (industry.email && industry.email.toLowerCase() === req.user.email.toLowerCase()) ||
        (industry.contactPerson && industry.contactPerson.email && industry.contactPerson.email.toLowerCase() === req.user.email.toLowerCase()) ||
        (req.user.organization && industry.name.toLowerCase() === req.user.organization.toLowerCase());

      if (!isOwner) {
        return errorResponse(res, 'Forbidden: You are not authorized to update another industry profile', 403);
      }
    } else if (!['government', 'admin'].includes(req.user.role)) {
      return errorResponse(res, 'Forbidden: You are not authorized to update industry profiles', 403);
    }

    ALLOWED_INDUSTRY_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        industry[field] = req.body[field];
      }
    });

    await industry.save();

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