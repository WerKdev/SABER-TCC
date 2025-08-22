// backend/src/api/routes/user.routes.js

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

// Rota para criar um novo usuário
// POST /api/users
// A rota é protegida pelo middleware isAdmin
router.post('/', isAdmin, userController.createUser);

module.exports = router;