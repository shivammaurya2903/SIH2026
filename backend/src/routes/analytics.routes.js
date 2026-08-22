const express = require('express');
const {
  getOverview,
  getChallenges,
  getDistricts,
  getUniversities,
  getIndustries,
  getImpact
} = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/overview', getOverview);
router.get('/challenges', getChallenges);
router.get('/districts', getDistricts);
router.get('/universities', getUniversities);
router.get('/industries', getIndustries);
router.get('/impact', getImpact);

module.exports = router;