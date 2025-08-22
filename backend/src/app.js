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
const avaliacaoRoutes = require('./api/routes/avaliacao.routes');
const entregaRoutes = require('./api/routes/entrega.routes');
const alunoRoutes = require('./api/routes/aluno.routes');
const iaRoutes = require('./api/routes/ia.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/instituicoes', instituicaoRoutes);
app.use('/api/turmas', turmaRoutes); // 2. Use as rotas
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/aluno', alunoRoutes);
app.use('/api/ia', iaRoutes);

// Rota de teste inicial (pode manter ou remover)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API do SABER está funcionando!',
  });
});

module.exports = app;