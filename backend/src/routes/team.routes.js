const express = require('express');
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addMember,
  removeMember,
  assignFacultyMentor,
  assignIndustryMentor,
  deleteTeam
} = require('../controllers/team.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, getTeams);
router.get('/:id', protect, validateObjectId('id'), getTeamById);

router.post(
  '/',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  createTeam
);

router.put(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  updateTeam
);

router.delete(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  deleteTeam
);

router.post(
  '/:id/members',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  addMember
);

router.delete(
  '/:id/members/:userId',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  validateObjectId('userId'),
  removeMember
);

router.patch(
  '/:id/faculty-mentor',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  assignFacultyMentor
);

router.patch(
  '/:id/industry-mentor',
  protect,
  authorize('government', 'admin', 'university', 'faculty', 'industry'),
  validateObjectId('id'),
  assignIndustryMentor
);

module.exports = router;
