// backend/src/app.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---
const authRoutes = require('./api/routes/auth.routes');
const userRoutes = require('./api/routes/user.routes');
const instituicaoRoutes = require('./api/routes/instituicao.routes');
const turmaRoutes = require('./api/routes/turma.routes'); // 1. Importe
const disciplinaRoutes = require('./api/routes/disciplina.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/instituicoes', instituicaoRoutes);
app.use('/api/turmas', turmaRoutes); // 2. Use as rotas
app.use('/api/disciplinas', disciplinaRoutes);

// Rota de teste inicial (pode manter ou remover)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API do SABER está funcionando!',
  });
});

module.exports = app;