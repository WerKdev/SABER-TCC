// backend/src/api/controllers/turma.controller.js

const { Turma, Instituicao } = require('../../models');

// Função para criar uma nova Turma
exports.createTurma = async (req, res) => {
  try {
    // O 'instituicao_id' é essencial para criar uma turma.
    const { nome, ano, turno, instituicao_id } = req.body;

    if (!nome || !instituicao_id) {
      return res.status(400).json({ message: 'O nome da turma e o ID da instituição são obrigatórios.' });
    }

    // Verifica se a instituição informada realmente existe
    const instituicao = await Instituicao.findByPk(instituicao_id);
    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada.' });
    }

    const novaTurma = await Turma.create({
      nome,
      ano,
      turno,
      instituicao_id // Associando a turma à instituição
    });

    res.status(201).json({
      message: 'Turma criada com sucesso!',
      turma: novaTurma
    });

  } catch (error) {
    console.error('Erro ao criar turma:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// Função para listar todas as turmas de UMA instituição específica
exports.getTurmasByInstituicao = async (req, res) => {
  try {
    const { instituicaoId } = req.params; // Pega o ID da instituição pela URL

    const turmas = await Turma.findAll({
      where: { instituicao_id: instituicaoId }
    });

    if (turmas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma turma encontrada para esta instituição.' });
    }

    res.status(200).json(turmas);
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};