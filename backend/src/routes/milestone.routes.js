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

const router = express.Router({ mergeParams: true });

router.get('/', protect, getMilestones);
router.get('/:id', protect, validateObjectId('id'), getMilestoneById);

router.post(
  '/',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  createMilestone
);

router.put(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
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
