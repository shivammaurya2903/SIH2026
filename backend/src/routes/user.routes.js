const express = require('express');
const { getUser, updateUser } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

const router = express.Router();

router.get('/:id', protect, validateObjectId('id'), getUser);
router.put('/:id', protect, validateObjectId('id'), updateUser);

module.exports = router;