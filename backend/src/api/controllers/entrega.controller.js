// backend/src/api/controllers/entrega.controller.js

const { EntregaAtividade, Avaliacao, Turma } = require('../../models');

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