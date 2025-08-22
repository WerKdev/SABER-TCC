// backend/src/api/controllers/disciplina.controller.js

const { Disciplina } = require('../../models');

// Função para criar uma nova Disciplina
exports.createDisciplina = async (req, res) => {
  try {
    const { nome, area_conhecimento } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'O nome da disciplina é obrigatório.' });
    }

    const novaDisciplina = await Disciplina.create({ nome, area_conhecimento });

    res.status(201).json({
      message: 'Disciplina criada com sucesso!',
      disciplina: novaDisciplina
    });

  } catch (error) {
    console.error('Erro ao criar disciplina:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// Função para listar todas as Disciplinas
exports.getAllDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error('Erro ao listar disciplinas:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};