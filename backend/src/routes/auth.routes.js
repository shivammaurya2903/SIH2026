const express = require('express');
const {
  register,
  registerGovernmentRequest,
  login,
  getMe
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/register-government-request', registerGovernmentRequest);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;