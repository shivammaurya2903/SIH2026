const express = require('express');
const {
  createUniversity,
  getUniversities,
  getUniversity,
  updateUniversity
} = require('../controllers/university.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', getUniversities);
router.get('/:id', validateObjectId('id'), getUniversity);

router.post(
  '/',
  protect,
  authorize('university', 'admin', 'government'),
  createUniversity
);
router.put(
  '/:id',
  protect,
  authorize('university', 'admin', 'government'),
  validateObjectId('id'),
  updateUniversity
);

module.exports = router;