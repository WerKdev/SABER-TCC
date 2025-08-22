// backend/src/api/routes/turma.routes.js

const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turma.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

// Rotas para /api/turmas

// POST /api/turmas - Cria uma nova turma
router.post('/', isAdmin, turmaController.createTurma);

// GET /api/turmas/instituicao/:instituicaoId - Lista turmas de uma instituição
router.get('/instituicao/:instituicaoId', isAdmin, turmaController.getTurmasByInstituicao);

module.exports = router;