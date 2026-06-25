const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rota POST para http://localhost:3000/api/auth/register
router.post('/register', authController.register);

// Rota POST para http://localhost:3000/api/auth/login
router.post('/login', authController.login);

module.exports = router;