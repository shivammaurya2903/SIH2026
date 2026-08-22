const express = require('express');
const {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  analyzeChallenge,
  approveChallenge,
  rejectChallenge,
  getMatches
} = require('../controllers/challenge.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', validateObjectId('id'), getChallenge);

router.post('/', protect, createChallenge);
router.put('/:id', protect, validateObjectId('id'), updateChallenge);
router.delete('/:id', protect, validateObjectId('id'), deleteChallenge);

router.post('/:id/analyze', protect, validateObjectId('id'), analyzeChallenge);
router.get('/:id/matches', protect, validateObjectId('id'), getMatches);

router.patch('/:id/approve', protect, authorize('government', 'admin'), validateObjectId('id'), approveChallenge);
router.patch('/:id/reject', protect, authorize('government', 'admin'), validateObjectId('id'), rejectChallenge);

module.exports = router;