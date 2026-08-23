const University = require('../models/University');
const { successResponse, errorResponse } = require('../utils/response');

const ALLOWED_UNIVERSITY_FIELDS = [
  'name',
  'code',
  'description',
  'type',
  'email',
  'phone',
  'website',
  'address',
  'district',
  'state',
  'departments',
  'expertise',
  'researchAreas',
  'facilities',
  'laboratories',
  'innovationCenters',
  'incubationFacilities',
  'previousProjects',
  'contactPerson'
];

const createUniversity = async (req, res) => {
  try {
    const payload = {};
    ALLOWED_UNIVERSITY_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        payload[field] = req.body[field];
      }
    });

    const university = await University.create(payload);
    return successResponse(res, university, 'University profile created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getUniversities = async (req, res) => {
  try {
    const { search, district, expertise } = req.query;

    const filter = { isActive: true };

    if (district) {
      filter.district = district;
    }

    if (expertise) {
      filter.expertise = {
        $in: expertise.split(',')
      };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const universities = await University.find(filter).sort({ createdAt: -1 });

    return successResponse(res, universities, 'Universities retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return errorResponse(res, 'University not found', 404);
    }

    return successResponse(res, university, 'University details retrieved', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return errorResponse(res, 'University not found', 404);
    }

    if (req.user.role === 'university') {
      const isOwner =
        (university.email && university.email.toLowerCase() === req.user.email.toLowerCase()) ||
        (university.contactPerson && university.contactPerson.email && university.contactPerson.email.toLowerCase() === req.user.email.toLowerCase()) ||
        (req.user.organization && university.name.toLowerCase() === req.user.organization.toLowerCase());

      if (!isOwner) {
        return errorResponse(res, 'Forbidden: You are not authorized to update another university profile', 403);
      }
    } else if (!['government', 'admin'].includes(req.user.role)) {
      return errorResponse(res, 'Forbidden: You are not authorized to update university profiles', 403);
    }

    ALLOWED_UNIVERSITY_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        university[field] = req.body[field];
      }
    });

    await university.save();

    return successResponse(res, university, 'University profile updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  createUniversity,
  getUniversities,
  getUniversity,
  updateUniversity
};