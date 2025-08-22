// backend/src/api/routes/turma.routes.js

const express = require('express');
const router = express.Router();

const turmaController = require('../controllers/turma.controller');
const avaliacaoController = require('../controllers/avaliacao.controller'); // 1. Importe o controller de avaliação
const { isAdmin, isProfessor, isAluno, isAuthenticated } = require('../middlewares/auth.middleware');

// Rotas para /api/turmas

// POST /api/turmas - Cria uma nova turma
router.post('/', isAdmin, turmaController.createTurma);

// GET /api/turmas/instituicao/:instituicaoId - Lista turmas de uma instituição
router.get('/instituicao/:instituicaoId', isAdmin, turmaController.getTurmasByInstituicao);

// GET /api/turmas/:turmaId - Busca os detalhes de uma turma específica
router.get('/:turmaId', isAdmin, turmaController.getTurmaById);

router.post('/:turmaId/matricular-aluno', isAdmin, turmaController.matricularAluno);

router.post('/:turmaId/vincular-professor', isAdmin, turmaController.vincularProfessor);

router.post('/:turmaId/avaliacoes', isProfessor, avaliacaoController.createAvaliacao);

// GET /api/turmas/:turmaId/avaliacoes - Professor lista as avaliações da turma
router.get('/:turmaId/avaliacoes', isAuthenticated, avaliacaoController.getAvaliacoesByTurma);

module.exports = router;