// backend/src/api/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');

// Middleware para verificar o token e se o usuário é administrador
exports.isAdmin = (req, res, next) => {
  // 1. Pegar o token do header da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // 2. Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Verificar se o tipo de usuário no token é 'administrador'
    if (decoded.tipo !== 'administrador') {
      return res.status(403).json({ message: 'Acesso proibido. Requer privilégios de administrador.' });
    }

    // Adiciona os dados do usuário decodificado ao objeto 'req' para uso posterior
    req.usuario = decoded; 
    next(); // Se tudo estiver OK, permite que a requisição continue
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
exports.isProfessor = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // A única mudança: verificamos se o tipo é 'professor'
    if (decoded.tipo !== 'professor') {
      return res.status(403).json({ message: 'Acesso proibido. Requer privilégios de professor.' });
    }

    req.usuario = decoded; // Adiciona os dados do token na requisição
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
exports.isAluno = (req, res, next) => {
  // A lógica é a mesma, só muda o tipo verificado
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.tipo !== 'aluno') {
      return res.status(403).json({ message: 'Acesso proibido. Rota exclusiva para alunos.' });
    }
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};