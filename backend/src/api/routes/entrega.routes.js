// backend/src/api/routes/entrega.routes.js

const express = require('express');
const router = express.Router();

const entregaController = require('../controllers/entrega.controller');
// 1. Importe os middlewares e o upload
const { isProfessor, isAluno } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// PUT /api/entregas/:entregaId/corrigir - Professor corrige uma atividade
router.put('/:entregaId/corrigir', isProfessor, entregaController.corrigirEntrega);

router.post(
    '/avaliacao/:avaliacaoId', 
    isAluno, 
    upload.single('arquivo'), // Middleware do Multer para um único arquivo com o nome do campo 'arquivo'
    entregaController.enviarAtividade
);

module.exports = router;