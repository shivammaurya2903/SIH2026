const {
  getUserNotifications,
  markAsRead
} = require('../services/notification.service');
const { successResponse, errorResponse } = require('../utils/response');

const getNotifications = async (req, res) => {
  try {
    const notifications = await getUserNotifications(
      req.user._id,
      req.query
    );

    return successResponse(res, notifications, 'Notifications retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await markAsRead(
      req.params.id,
      req.user._id
    );

    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }

    return successResponse(res, notification, 'Notification marked as read', 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getNotifications,
  markNotificationAsRead
};