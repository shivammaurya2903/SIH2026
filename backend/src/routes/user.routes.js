const express = require('express');
const { getUsers, getUser, updateUser } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, validateObjectId('id'), getUser);
router.put('/:id', protect, validateObjectId('id'), updateUser);

module.exports = router;