// backend/src/models/instituicao.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Instituicao = sequelize.define('Instituicao', {
    id_instituicao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Id_instituicao'
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING(18),
        unique: true,
        allowNull: false
    },
    nivel_ensino: {
        type: DataTypes.ENUM('infantil', 'fundamental', 'medio', 'superior'),
        field: 'nivel_ensino'
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'ativa'
    }
}, {
    tableName: 'INSTITUICAO',
    timestamps: false
});

module.exports = Instituicao;