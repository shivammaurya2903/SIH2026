const express = require('express');
const {
  getNotifications,
  markNotificationAsRead
} = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, getNotifications);
router.patch('/:id/read', protect, validateObjectId('id'), markNotificationAsRead);

module.exports = router;