const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, getProjects);
router.get('/:id', protect, validateObjectId('id'), getProject);

router.post('/', protect, createProject);
router.put('/:id', protect, validateObjectId('id'), updateProject);
router.patch('/:id', protect, validateObjectId('id'), updateProject);
router.delete('/:id', protect, validateObjectId('id'), deleteProject);

module.exports = router;