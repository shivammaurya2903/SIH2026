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
  getMatches,
  getDuplicates,
  facedThisProblem,
  updateStatus
} = require('../controllers/challenge.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');
const { upload, handleUploadError } = require('../middleware/upload.middleware');

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', validateObjectId('id'), getChallenge);

router.post('/', protect, upload.array('attachments', 10), handleUploadError, createChallenge);
router.put('/:id', protect, validateObjectId('id'), upload.array('attachments', 10), handleUploadError, updateChallenge);
router.delete('/:id', protect, validateObjectId('id'), deleteChallenge);

router.post('/:id/analyze', protect, validateObjectId('id'), analyzeChallenge);
router.post('/:id/faced', protect, validateObjectId('id'), facedThisProblem);
router.patch('/:id/status', protect, authorize('government', 'admin'), validateObjectId('id'), updateStatus);
router.get('/:id/matches', protect, validateObjectId('id'), getMatches);
router.get('/:id/duplicates', protect, validateObjectId('id'), getDuplicates);

router.patch('/:id/approve', protect, authorize('government', 'admin'), validateObjectId('id'), approveChallenge);
router.patch('/:id/reject', protect, authorize('government', 'admin'), validateObjectId('id'), rejectChallenge);

module.exports = router;