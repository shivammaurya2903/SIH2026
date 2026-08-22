const University = require('../models/University');
const { successResponse, errorResponse } = require('../utils/response');

const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
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
    const university = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!university) {
      return errorResponse(res, 'University not found', 404);
    }

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