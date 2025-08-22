// backend/src/api/controllers/avaliacao.controller.js

const { Avaliacao, Turma, Usuario, Disciplina, EntregaAtividade } = require('../../models');

// Função para um professor criar uma nova Avaliação
exports.createAvaliacao = async (req, res) => {
  try {
    const { turmaId } = req.params; // ID da turma vem da URL
    const professorId = req.usuario.id; // ID do professor vem do token (injetado pelo middleware)
    
    const { titulo, descricao, tipo_avaliacao, data_entrega, disciplina_id } = req.body;

    // 1. Validação dos dados de entrada
    if (!titulo || !tipo_avaliacao || !data_entrega || !disciplina_id) {
      return res.status(400).json({ message: 'Título, tipo, data de entrega e disciplina são obrigatórios.' });
    }

    // 2. Buscar a turma e verificar se ela existe
    const turma = await Turma.findByPk(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    // 3. VERIFICAÇÃO DE SEGURANÇA CRUCIAL:
    // O professor que está fazendo a requisição realmente pertence a esta turma?
    const isProfessorDaTurma = await turma.hasProfessor(professorId);
    if (!isProfessorDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não é professor desta turma.' });
    }

    // 4. Criar a avaliação no banco de dados
    const novaAvaliacao = await Avaliacao.create({
      titulo,
      descricao,
      tipo_avaliacao,
      data_entrega,
      turma_id: turmaId,
      disciplina_id,
      professor_id: professorId
    });

    res.status(201).json({
      message: 'Avaliação criada com sucesso!',
      avaliacao: novaAvaliacao
    });

  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
exports.getAvaliacoesByTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;
    const usuarioLogado = req.usuario; // Dados do usuário vêm do token

    // 1. Buscar a turma
    const turma = await Turma.findByPk(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }

    // 2. VERIFICAÇÃO DE SEGURANÇA: O usuário logado é professor OU aluno desta turma?
    const isProfessorDaTurma = await turma.hasProfessor(usuarioLogado.id);
    const isAlunoDaTurma = await turma.hasAluno(usuarioLogado.id);

    if (!isProfessorDaTurma && !isAlunoDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não faz parte desta turma.' });
    }

    // 3. Se a permissão for válida, buscar as avaliações
    const avaliacoes = await Avaliacao.findAll({
      where: { turma_id: turmaId },
      include: [
        { model: Usuario, as: 'professor', attributes: ['nome'] },
        { model: Disciplina, as: 'disciplina', attributes: ['nome'] }
      ],
      order: [['data_entrega', 'ASC']]
    });

    res.status(200).json(avaliacoes);

  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
exports.getEntregasByAvaliacao = async (req, res) => {
  try {
    const { avaliacaoId } = req.params;
    const professorId = req.usuario.id;

    // 1. Buscar a avaliação e incluir a turma para a verificação de segurança
    const avaliacao = await Avaliacao.findByPk(avaliacaoId, {
      include: { model: Turma, as: 'turma' }
    });

    if (!avaliacao) {
      return res.status(404).json({ message: 'Avaliação não encontrada.' });
    }

    // 2. VERIFICAÇÃO DE SEGURANÇA: O professor pertence à turma desta avaliação?
    const isProfessorDaTurma = await avaliacao.turma.hasProfessor(professorId);
    if (!isProfessorDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para ver as entregas desta turma.' });
    }

    // 3. Buscar todas as entregas associadas a esta avaliação
    const entregas = await EntregaAtividade.findAll({
      where: { avaliacao_id: avaliacaoId },
      include: {
        model: Usuario,
        as: 'aluno',
        attributes: ['id_usuario', 'nome', 'email'] // Traz os dados do aluno que enviou
      }
    });

    res.status(200).json(entregas);

  } catch (error) {
    console.error('Erro ao listar entregas:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};