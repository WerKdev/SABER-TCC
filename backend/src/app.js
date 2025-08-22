// backend/src/app.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---
const authRoutes = require('./api/routes/auth.routes');
const userRoutes = require('./api/routes/user.routes'); // 1. Importe as rotas de usuário

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // 2. Use as rotas com o prefixo /api/users

// Rota de teste inicial (pode manter ou remover)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API do SABER está funcionando!',
  });
});

module.exports = app;