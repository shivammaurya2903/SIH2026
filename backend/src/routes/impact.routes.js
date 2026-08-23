const express = require('express');
const {
  createImpactMetric,
  getProjectImpact,
  getImpactOverview
} = require('../controllers/impact.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/overview', getImpactOverview);
router.get('/project/:projectId', validateObjectId('projectId'), getProjectImpact);
router.post(
  '/',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  createImpactMetric
);

module.exports = router;
