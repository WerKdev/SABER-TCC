// backend/src/models/user.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importando a conexão do Sequelize

const Usuario = sequelize.define('Usuario', {
    // No Sequelize, a chave primária 'id' com auto-incremento já é criada por padrão.
    // O nome da coluna no banco será 'Id_usuario'
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Id_usuario' // Mapeia este campo para a coluna 'Id_usuario' no banco
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false // Corresponde a 'NOT NULL' no banco
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true // Garante que não haja dois usuários com o mesmo email
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        unique: true
    },
    tipo: {
        type: DataTypes.ENUM('administrador', 'professor', 'aluno'),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20) // Ex: 'ativo', 'inativo'
    },
    nivel_acesso: {
        type: DataTypes.ENUM('admin', 'editor', 'viewer'),
        field: 'nivel_acesso' // Garante o nome correto da coluna
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Define a data/hora atual por padrão
        field: 'data_criacao'
    }
}, {
    tableName: 'USUARIO', // Nome exato da tabela no banco de dados
    timestamps: false // Desativa a criação automática das colunas createdAt e updatedAt pelo Sequelize
});

const bcrypt = require('bcryptjs');

// Hook do Sequelize: antes de criar um novo usuário no banco (beforeCreate)
Usuario.beforeCreate(async (usuario) => {
  if (usuario.senha) {
    const salt = await bcrypt.genSalt(10); // Gera a "complexidade" do hash
    usuario.senha = await bcrypt.hash(usuario.senha, salt); // Substitui a senha pelo hash
  }
});

module.exports = Usuario;

module.exports = Usuario;