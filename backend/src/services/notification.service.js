const Notification = require('../models/Notification');

const createNotification = async ({
  recipient,
  sender = null,
  type = 'info',
  title,
  message,
  relatedId = null,
  entityType = null,
  entityId = null
}) => {
  if (!recipient || !title || !message) {
    return null;
  }

  const finalRelatedId = relatedId || entityId || null;

  return Notification.create({
    recipient,
    sender,
    type,
    title,
    message,
    relatedId: finalRelatedId
  });
};

const createBulkNotifications = async ({
  recipients = [],
  sender = null,
  type = 'info',
  title,
  message,
  relatedId = null
}) => {
  if (!Array.isArray(recipients) || recipients.length === 0 || !title || !message) {
    return [];
  }

  const uniqueRecipients = Array.from(
    new Set(
      recipients
        .filter((r) => r)
        .map((r) => r.toString())
    )
  );

  const docs = uniqueRecipients.map((recipientId) => ({
    recipient: recipientId,
    sender,
    type,
    title,
    message,
    relatedId,
    isRead: false
  }));

  return Notification.insertMany(docs);
};

const getUserNotifications = async (userId, options = {}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 20;
  const skip = (page - 1) * limit;

  return Notification.find({ recipient: userId })
    .populate('sender', 'name email role')
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
      returnDocument: 'after'
    }
  );
};

const markAllAsRead = async (userId) => {
  return Notification.updateMany(
    {
      recipient: userId,
      isRead: false
    },
    {
      $set: {
        isRead: true,
        readAt: new Date()
      }
    }
  );
};

const safeNotify = async (notificationFn) => {
  try {
    return await notificationFn();
  } catch (err) {
    console.error('SAFE NOTIFICATION WARNING:', err.message);
    return null;
  }
};

module.exports = {
  createNotification,
  createBulkNotifications,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  safeNotify
};