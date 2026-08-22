const express = require('express');
const {
  createProposal,
  getProposals,
  getProposal,
  approveProposal,
  rejectProposal
} = require('../controllers/proposal.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, getProposals);
router.get('/:id', protect, validateObjectId('id'), getProposal);

router.post(
  '/',
  protect,
  authorize('university', 'faculty', 'student', 'admin'),
  createProposal
);
router.patch(
  '/:id/approve',
  protect,
  authorize('government', 'admin'),
  validateObjectId('id'),
  approveProposal
);
router.patch(
  '/:id/reject',
  protect,
  authorize('government', 'admin'),
  validateObjectId('id'),
  rejectProposal
);

module.exports = router;