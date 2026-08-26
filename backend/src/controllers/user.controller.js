const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');

const getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.district) filter['location.district'] = req.query.district;

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    return successResponse(res, users, 'Users retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user, 'User retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const updateUser = async (req, res) => {
  try {
    if (
      req.user._id.toString() !== req.params.id &&
      req.user.role !== 'admin'
    ) {
      return errorResponse(res, 'You are not authorized to update this profile', 403);
    }

    const allowedFields = [
      'name',
      'phone',
      'profileImage',
      'organization',
      'location'
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        returnDocument: 'after',
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user, 'User updated successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser
};