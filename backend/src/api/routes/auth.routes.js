// backend/src/api/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Definindo a rota de login
// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;