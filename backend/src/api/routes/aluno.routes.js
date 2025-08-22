// backend/src/api/routes/aluno.routes.js

const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/aluno.controller');
const { isAluno } = require('../middlewares/auth.middleware');

// GET /api/aluno/minhas-turmas - Retorna as turmas do aluno logado
router.get('/minhas-turmas', isAluno, alunoController.getMinhasTurmas);

router.get('/minhas-notas', isAluno, alunoController.getMinhasNotas);

module.exports = router;