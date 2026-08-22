const Notification = require('../models/Notification');

const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  relatedId = null
}) => {
  return Notification.create({
    recipient,
    sender,
    type,
    title,
    message,
    relatedId
  });
};

const getUserNotifications = async (userId, options = {}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 20;
  const skip = (page - 1) * limit;

  return Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

const markAsRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    {
      _id: notificationId,
      recipient: userId
    },
    {
      isRead: true,
      readAt: new Date()
    },
    {
      new: true
    }
  );
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead
};