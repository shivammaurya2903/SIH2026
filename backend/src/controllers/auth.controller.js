const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');

const ALLOWED_PUBLIC_ROLES = [
  'citizen',
  'university',
  'faculty',
  'student',
  'industry'
];

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, organization, location } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 'Name, email and password are required', 400);
    }

    const targetRole = role ? String(role).toLowerCase() : 'citizen';

    if (['admin', 'government'].includes(targetRole)) {
      if (!req.user || req.user.role !== 'admin') {
        return errorResponse(
          res,
          'Self-registration as government or admin is not allowed',
          403
        );
      }
    }

    if (!ALLOWED_PUBLIC_ROLES.includes(targetRole) && !['admin', 'government'].includes(targetRole)) {
      return errorResponse(res, 'Invalid user role specified', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return errorResponse(res, 'User already exists with this email', 409);
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: targetRole,
      organization,
      location
    });

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization,
          location: user.location
        },
        token
      },
      'Registration successful',
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    if (!user.isActive) {
      return errorResponse(res, 'User account is inactive. Please contact support.', 403);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization,
          location: user.location
        },
        token
      },
      'Login successful',
      200
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getMe = async (req, res) => {
  return successResponse(res, req.user, 'Current user profile fetched', 200);
};

module.exports = {
  register,
  login,
  getMe
};