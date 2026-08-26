const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');
const milestoneRoutes = require('./milestone.routes');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');
const { upload, handleUploadError } = require('../middleware/upload.middleware');

const router = express.Router();

router.use('/:projectId/milestones', validateObjectId('projectId'), milestoneRoutes);

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
  upload.array('documents', 10),
  handleUploadError,
  updateProject
);
router.patch(
  '/:id/status',
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
  upload.array('documents', 10),
  handleUploadError,
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