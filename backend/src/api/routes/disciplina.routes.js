// backend/src/api/routes/disciplina.routes.js

const express = require('express');
const router = express.Router();

const disciplinaController = require('../controllers/disciplina.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

// POST /api/disciplinas - Cria uma nova disciplina
router.post('/', isAdmin, disciplinaController.createDisciplina);

// GET /api/disciplinas - Lista todas as disciplinas
router.get('/', isAdmin, disciplinaController.getAllDisciplinas);

module.exports = router;