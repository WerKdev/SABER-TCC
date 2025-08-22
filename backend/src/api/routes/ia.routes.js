// backend/src/api/routes/ia.routes.js

const express = require('express');
const router = express.Router();

const iaController = require('../controllers/ia.controller');
const { isProfessor } = require('../middlewares/auth.middleware');

// POST /api/ia/analisar-redacao - Aciona a correção de uma redação pela IA
router.post('/analisar-redacao', isProfessor, iaController.analisarRedacao);

router.post('/entregas/:entregaId/corrigir', isProfessor, iaController.corrigirEntregaComIA);

router.get('/turmas/:turmaId/relatorio-inteligente', isProfessor, iaController.gerarRelatorioInteligente);

module.exports = router;