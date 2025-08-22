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
  exports.matricularAluno = async (req, res) => {
  try {
    const { turmaId } = req.params;
    const { usuarioId } = req.body;

    // 1. Validar a entrada
    if (!usuarioId) {
      return res.status(400).json({ message: 'O ID do usuário é obrigatório.' });
    }

    // 2. Encontrar a turma no banco
    const turma = await Turma.findByPk(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    // 3. Encontrar o usuário e verificar se é um aluno
    const aluno = await Usuario.findOne({ where: { id_usuario: usuarioId, tipo: 'aluno' } });
    if (!aluno) {
      return res.status(404).json({ message: 'Usuário não encontrado ou não é um aluno.' });
    }

    // 4. Usar o método 'add' do Sequelize para criar a associação
    // O apelido 'alunos' vem do que definimos em 'models/index.js'
    await turma.addAluno(aluno);

    res.status(200).json({ message: `Aluno ${aluno.nome} matriculado na turma ${turma.nome} com sucesso.` });

  } catch (error) {
    // Tratar erro caso o aluno já esteja na turma
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Este aluno já está matriculado nesta turma.' });
    }
    console.error('Erro ao matricular aluno:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
// backend/src/api/controllers/turma.controller.js

// ... (imports e outras funções existentes) ...

// Função para buscar uma turma específica pelo ID com seus participantes
exports.getTurmaById = async (req, res) => {
  try {
    const { turmaId } = req.params;

    const turma = await Turma.findByPk(turmaId, {
      // Usamos 'include' para carregar os dados associados
      include: [
        {
          model: Usuario,
          as: 'alunos', // O mesmo 'as' que definimos na associação
          attributes: ['id_usuario', 'nome', 'email'], // Seleciona apenas campos seguros
          through: { attributes: [] } // Não traz informações da tabela de junção
        },
        {
          model: Usuario,
          as: 'professores',
          attributes: ['id_usuario', 'nome', 'email'],
          through: { attributes: [] }
        },
        {
          model: Instituicao, // Também podemos incluir a instituição, se necessário
          as: 'instituicao',
          attributes: ['id_instituicao', 'nome']
        }
      ]
    });

    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    res.status(200).json(turma);

  } catch (error) {
    console.error('Erro ao buscar detalhes da turma:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// backend/src/api/controllers/turma.controller.js

// ... (imports e outras funções existentes) ...

// Função para vincular um professor a uma turma
exports.vincularProfessor = async (req, res) => {
  try {
    const { turmaId } = req.params;
    const { usuarioId } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ message: 'O ID do usuário é obrigatório.' });
    }

    const turma = await Turma.findByPk(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    // A única diferença: verificamos se o tipo do usuário é 'professor'
    const professor = await Usuario.findOne({ where: { id_usuario: usuarioId, tipo: 'professor' } });
    if (!professor) {
      return res.status(404).json({ message: 'Usuário não encontrado ou não é um professor.' });
    }

    // Usamos o método 'addProfessor' do Sequelize
    await turma.addProfessor(professor);

    res.status(200).json({ message: `Professor ${professor.nome} vinculado à turma ${turma.nome} com sucesso.` });

  } catch (error) {
     if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Este professor já está vinculado a esta turma.' });
    }
    console.error('Erro ao vincular professor:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

};