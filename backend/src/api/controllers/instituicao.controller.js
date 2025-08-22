// backend/src/api/controllers/instituicao.controller.js

// Usamos o 'Instituicao' que vem do nosso arquivo central de models
const { Instituicao } = require('../../models');

// Função para criar uma nova Instituição
exports.createInstituicao = async (req, res) => {
  try {
    const { nome, cnpj, nivel_ensino } = req.body;

    // Validação simples
    if (!nome || !cnpj) {
      return res.status(400).json({ message: 'Nome e CNPJ são obrigatórios.' });
    }

    // Verifica se o CNPJ já existe para evitar duplicatas
    const cnpjExistente = await Instituicao.findOne({ where: { cnpj } });
    if (cnpjExistente) {
      return res.status(409).json({ message: 'Este CNPJ já está cadastrado.' });
    }

    const novaInstituicao = await Instituicao.create({
      nome,
      cnpj,
      nivel_ensino
    });

    res.status(201).json({
      message: 'Instituição criada com sucesso!',
      instituicao: novaInstituicao
    });

  } catch (error) {
    console.error('Erro ao criar instituição:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// Função para listar todas as Instituições
exports.getAllInstituicoes = async (req, res) => {
  try {
    const instituicoes = await Instituicao.findAll();
    res.status(200).json(instituicoes);
  } catch (error) {
    console.error('Erro ao listar instituições:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};