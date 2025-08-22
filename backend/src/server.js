// backend/src/server.js

const app = require('./app');
// 1. Importe o syncDatabase em vez do testConnection
const { syncDatabase } = require('./models'); 
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Servidor do SABER rodando na porta ${PORT}`);
  // 2. Chame a nova função de sincronização
  await syncDatabase(); 
});