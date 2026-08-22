const express = require('express');
const {
  createCollaboration,
  getCollaborations,
  acceptCollaboration,
  rejectCollaboration
} = require('../controllers/collaboration.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, getCollaborations);
router.post('/', protect, createCollaboration);
router.patch('/:id/accept', protect, validateObjectId('id'), acceptCollaboration);
router.patch('/:id/reject', protect, validateObjectId('id'), rejectCollaboration);

module.exports = router;