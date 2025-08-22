// backend/src/api/routes/entrega.routes.js

const express = require('express');
const router = express.Router();

const entregaController = require('../controllers/entrega.controller');
const { isProfessor } = require('../middlewares/auth.middleware');

// PUT /api/entregas/:entregaId/corrigir - Professor corrige uma atividade
router.put('/:entregaId/corrigir', isProfessor, entregaController.corrigirEntrega);

module.exports = router;