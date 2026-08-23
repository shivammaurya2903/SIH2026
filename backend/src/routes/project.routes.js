const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, getProjects);
router.get('/:id', protect, validateObjectId('id'), getProject);

router.post(
  '/',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  createProject
);
router.put(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty', 'industry'),
  validateObjectId('id'),
  updateProject
);
router.patch(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty', 'industry'),
  validateObjectId('id'),
  updateProject
);
router.delete(
  '/:id',
  protect,
  authorize('government', 'admin', 'university', 'faculty'),
  validateObjectId('id'),
  deleteProject
);

module.exports = router;