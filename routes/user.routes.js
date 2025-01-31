const express = require('express');
const { RegisterUser, Login, GetUser } = require('../controller/user.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', Login);
router.get('/profile', protect, GetUser);

module.exports = router;
