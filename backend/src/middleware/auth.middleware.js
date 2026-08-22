const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token is missing or malformed', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return errorResponse(res, 'User associated with token no longer exists', 401);
    }

    if (!user.isActive) {
      return errorResponse(res, 'User account is inactive', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired authentication token', 401);
  }
};

module.exports = {
  protect
};