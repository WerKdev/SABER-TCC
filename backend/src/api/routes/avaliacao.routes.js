// backend/src/api/routes/avaliacao.routes.js

const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacao.controller');
const { isProfessor } = require('../middlewares/auth.middleware');

// GET /api/avaliacoes/:avaliacaoId/entregas - Professor visualiza os envios de uma atividade.
router.get('/:avaliacaoId/entregas', isProfessor, avaliacaoController.getEntregasByAvaliacao);


module.exports = router;