// backend/src/models/disciplina.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Disciplina = sequelize.define('Disciplina', {
    id_disciplina: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_disciplina'
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    area_conhecimento: {
        type: DataTypes.STRING(100),
        field: 'area_conhecimento'
    }
}, {
    tableName: 'DISCIPLINA',
    timestamps: false
});

module.exports = Disciplina;