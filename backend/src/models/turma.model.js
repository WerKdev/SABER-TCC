// backend/src/models/turma.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Turma = sequelize.define('Turma', {
    id_turma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_turma'
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER // Ex: 2024
    },
    turno: {
        type: DataTypes.ENUM('matutino', 'vespertino', 'noturno', 'integral')
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'ativa'
    }
    // A chave estrangeira 'instituicao_id' será adicionada na fase de associações.
}, {
    tableName: 'TURMA',
    timestamps: false
});

module.exports = Turma;