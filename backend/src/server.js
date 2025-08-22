// backend/src/server.js

const app = require('./app');
const { testConnection } = require('./config/database'); // Importe a função de teste
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Servidor do SABER rodando na porta ${PORT}`);
  await testConnection(); // Executa o teste de conexão
});