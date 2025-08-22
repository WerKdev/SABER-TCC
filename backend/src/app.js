// backend/src/app.js

const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares essenciais
app.use(cors()); // Habilita o CORS para todas as origens
app.use(express.json()); // Habilita o body-parser para receber JSON

// Rota de teste inicial
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API do SABER está funcionando!',
  });
});

module.exports = app;