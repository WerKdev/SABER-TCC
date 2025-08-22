// backend/src/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Cria uma nova instância do Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // Informa ao Sequelize que estamos usando PostgreSQL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necessário para a conexão com o Supabase
      }
    },
    logging: false, // Desativa os logs SQL no console. Pode ser true para debug.
  }
);

// Função para testar a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados Supabase estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

module.exports = { sequelize, testConnection };