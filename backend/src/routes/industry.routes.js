const express = require('express');
const {
  createIndustry,
  getIndustries,
  getIndustry,
  updateIndustry
} = require('../controllers/industry.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', getIndustries);
router.get('/:id', validateObjectId('id'), getIndustry);

router.post(
  '/',
  protect,
  authorize('industry', 'admin', 'government'),
  createIndustry
);
router.put(
  '/:id',
  protect,
  authorize('industry', 'admin', 'government'),
  validateObjectId('id'),
  updateIndustry
);

module.exports = router;