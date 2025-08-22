// backend/src/api/controllers/entrega.controller.js

const { EntregaAtividade, Avaliacao, Turma, Usuario } = require('../../models');

// Função para um professor corrigir uma entrega (adicionar nota e feedback)
exports.corrigirEntrega = async (req, res) => {
  try {
    const { entregaId } = req.params;
    const professorId = req.usuario.id;
    const { nota, feedback } = req.body;

    // 1. Validação da entrada
    if (nota === undefined || !feedback) {
      return res.status(400).json({ message: 'Nota e feedback são obrigatórios.' });
    }

    // 2. Buscar a entrega e aninhar os dados da avaliação e da turma
    const entrega = await EntregaAtividade.findByPk(entregaId, {
      include: {
        model: Avaliacao,
        as: 'avaliacao',
        include: {
          model: Turma,
          as: 'turma'
        }
      }
    });

    if (!entrega) {
      return res.status(404).json({ message: 'Entrega não encontrada.' });
    }

    // 3. VERIFICAÇÃO DE SEGURANÇA: O professor pertence à turma desta entrega?
    const turmaDaEntrega = entrega.avaliacao.turma;
    const isProfessorDaTurma = await turmaDaEntrega.hasProfessor(professorId);

    if (!isProfessorDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para corrigir atividades desta turma.' });
    }

    // 4. Atualizar a entrega com a nota e o feedback
    entrega.nota = nota;
    entrega.feedback = feedback;
    await entrega.save();

    res.status(200).json({
      message: 'Atividade corrigida com sucesso!',
      entrega: entrega
    });

  } catch (error) {
    console.error('Erro ao corrigir entrega:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
exports.enviarAtividade = async (req, res) => {
  try {
    const { avaliacaoId } = req.params;
    const alunoId = req.usuario.id;

    // 1. Verificar se um arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    // 2. Buscar a avaliação e verificar se o aluno pertence à turma
    const avaliacao = await Avaliacao.findByPk(avaliacaoId, {
      include: { model: Turma, as: 'turma' }
    });

    if (!avaliacao) {
        return res.status(404).json({ message: 'Avaliação não encontrada.' });
    }

    const isAlunoDaTurma = await avaliacao.turma.hasAluno(alunoId);
    if (!isAlunoDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não está matriculado na turma desta avaliação.' });
    }

    // 3. Criar o registro da entrega no banco
    const novaEntrega = await EntregaAtividade.create({
      avaliacao_id: avaliacaoId,
      aluno_id: alunoId,
      conteudo_enviado: req.file.path // Salva o caminho do arquivo salvo pelo multer
    });

    res.status(201).json({
        message: 'Atividade enviada com sucesso!',
        entrega: novaEntrega
    });

  } catch (error) {
    console.error('Erro ao enviar atividade:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};