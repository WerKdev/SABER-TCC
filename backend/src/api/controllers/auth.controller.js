// backend/src/api/controllers/auth.controller.js

const Usuario = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função de Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Validação básica de entrada
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // 2. Buscar o usuário no banco de dados pelo email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas.' }); // Não especificar se é email ou senha por segurança
    }

    // 3. Comparar a senha enviada com a senha "hasheada" no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // 4. Gerar o Token JWT
    const token = jwt.sign(
      { 
        id: usuario.id_usuario, 
        tipo: usuario.tipo 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h', // Token expira em 8 horas
      }
    );

    // 5. Enviar a resposta com o token
    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};