// backend/src/api/routes/instituicao.routes.js

const express = require('express');
const router = express.Router();

const instituicaoController = require('../controllers/instituicao.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

// Rotas para /api/instituicoes

// POST /api/instituicoes - Cria uma nova instituição (Protegido por Admin)
router.post('/', isAdmin, instituicaoController.createInstituicao);

// GET /api/instituicoes - Lista todas as instituições (Protegido por Admin)
router.get('/', isAdmin, instituicaoController.getAllInstituicoes);

module.exports = router;