// backend/src/models/avaliacao.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Avaliacao = sequelize.define('Avaliacao', {
    id_avaliacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_avaliacao'
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    tipo_avaliacao: {
        type: DataTypes.ENUM('prova', 'trabalho', 'atividade', 'redacao'),
        allowNull: false
    },
    data_postagem: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    data_entrega: {
        type: DataTypes.DATE,
        allowNull: false
    }
    // Chaves estrangeiras (turma_id, disciplina_id, professor_id) serão adicionadas via associações.
}, {
    tableName: 'AVALIACAO',
    timestamps: false
});

module.exports = Avaliacao;