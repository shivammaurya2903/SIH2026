const express = require('express');
const {
  createMilestone,
  getMilestones,
  getMilestoneById,
  updateMilestone,
  updateMilestoneStatus,
  deleteMilestone
} = require('../controllers/milestone.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');
const { upload, handleUploadError } = require('../middleware/upload.middleware');

const router = express.Router({ mergeParams: true });

router.get('/', protect, getMilestones);
router.get('/:id', protect, validateObjectId('id'), getMilestoneById);

router.post(
  '/',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  upload.array('deliverables', 10),
  handleUploadError,
  createMilestone
);

router.put(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  upload.array('deliverables', 10),
  handleUploadError,
  updateMilestone
);

router.patch(
  '/:id/status',
  protect,
  authorize('government', 'admin', 'university', 'faculty', 'industry'),
  validateObjectId('id'),
  updateMilestoneStatus
);

router.delete(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  deleteMilestone
);

module.exports = router;
