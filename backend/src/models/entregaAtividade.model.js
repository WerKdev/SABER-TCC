// backend/src/models/entregaAtividade.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EntregaAtividade = sequelize.define('EntregaAtividade', {
    id_entrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_entrega'
    },
    data_envio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    nota: {
        type: DataTypes.FLOAT,
        allowNull: true // A nota pode ser nula até a correção
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    conteudo_enviado: {
        type: DataTypes.STRING(255), // Armazenará o caminho para o arquivo enviado
        allowNull: true
    }
    // Chaves estrangeiras (avaliacao_id, aluno_id) serão adicionadas via associações.
}, {
    tableName: 'ENTREGA_ATIVIDADE',
    timestamps: false
});

module.exports = EntregaAtividade;