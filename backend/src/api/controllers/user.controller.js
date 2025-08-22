// backend/src/api/controllers/user.controller.js

const Usuario = require('../../models/user.model');

// Função para um administrador criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Validação de entrada
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ message: 'Todos os campos (nome, email, senha, tipo) são obrigatórios.' });
    }

    // Verificar se o email já existe
    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) {
      return res.status(409).json({ message: 'Este email já está em uso.' });
    }

    // O hook 'beforeCreate' no model irá criptografar a senha automaticamente
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha,
      tipo // 'aluno', 'professor' ou 'administrador'
    });

    // Remover a senha da resposta por segurança
    novoUsuario.senha = undefined;

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      usuario: novoUsuario
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};