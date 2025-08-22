// backend/src/server.js

const app = require('./app');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor do SABER rodando na porta ${PORT}`);
});