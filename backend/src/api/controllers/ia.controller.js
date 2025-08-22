// backend/src/api/controllers/ia.controller.js

const iaService = require('../../services/ia.service');
const { Turma, Usuario, Avaliacao, EntregaAtividade, sequelize } = require('../../models');

// Função para acionar a análise de redação pela IA
exports.analisarRedacao = async (req, res) => {
  try {
    const { textoRedacao, tema } = req.body;

    // 1. Validação simples da entrada
    if (!textoRedacao || !tema) {
      return res.status(400).json({ message: 'O texto da redação e o tema são obrigatórios.' });
    }

    // 2. Chama o nosso serviço de IA para fazer o trabalho pesado
    const analise = await iaService.analisarRedacao(textoRedacao, tema);

    // 3. Retorna a análise (nota e feedback) para o frontend
    res.status(200).json(analise);

  } catch (error) {
    console.error('Erro no controller de análise de redação:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao processar a análise da IA.' });
  }
};
exports.corrigirEntregaComIA = async (req, res) => {
  try {
    const { entregaId } = req.params;
    const { textoRedacao } = req.body; // O frontend enviará o texto da redação
    const professorId = req.usuario.id;

    if (!textoRedacao) {
      return res.status(400).json({ message: 'O texto da redação é obrigatório.' });
    }

    // 1. Buscar a entrega e seus dados associados para validação
    const entrega = await EntregaAtividade.findByPk(entregaId, {
      include: {
        model: Avaliacao,
        as: 'avaliacao',
        include: { model: Turma, as: 'turma' }
      }
    });

    if (!entrega) {
      return res.status(404).json({ message: 'Entrega não encontrada.' });
    }

    // 2. Validação de segurança: O professor pertence à turma?
    const isProfessorDaTurma = await entrega.avaliacao.turma.hasProfessor(professorId);
    if (!isProfessorDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para corrigir atividades desta turma.' });
    }

    // 3. Chamar o serviço de IA, usando o título da avaliação como tema
    const tema = entrega.avaliacao.titulo;
    const analise = await iaService.analisarRedacao(textoRedacao, tema);

    // 4. Salvar a nota e o feedback da IA na entrega
    entrega.nota = analise.nota;
    entrega.feedback = analise.feedback;
    await entrega.save();

    res.status(200).json({
      message: 'Redação corrigida com IA e salva com sucesso!',
      entrega: entrega
    });

  } catch (error) {
    console.error('Erro ao corrigir entrega com IA:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao processar a correção com IA.' });
  }
};
exports.gerarRelatorioInteligente = async (req, res) => {
  try {
    const { turmaId } = req.params;
    const professorId = req.usuario.id;

    // 1. Validação de segurança
    const turma = await Turma.findByPk(turmaId, {
      include: { model: Usuario, as: 'alunos', attributes: ['id_usuario', 'nome'] }
    });
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    const isProfessorDaTurma = await turma.hasProfessor(professorId);
    if (!isProfessorDaTurma) {
      return res.status(403).json({ message: 'Acesso negado. Você não é professor desta turma.' });
    }

    // 2. Coletar dados de desempenho
    const totalAvaliacoes = await Avaliacao.count({ where: { turma_id: turmaId } });
    
    const dadosAlunos = [];
    for (const aluno of turma.alunos) {
      const entregas = await EntregaAtividade.findAll({
        where: { aluno_id: aluno.id_usuario },
        include: { model: Avaliacao, as: 'avaliacao', where: { turma_id: turmaId }, attributes: [] }
      });

      const entregasCorrigidas = entregas.filter(e => e.nota !== null);
      const somaNotas = entregasCorrigidas.reduce((acc, e) => acc + e.nota, 0);
      const media = entregasCorrigidas.length > 0 ? somaNotas / entregasCorrigidas.length : 0;

      dadosAlunos.push({
        nome: aluno.nome,
        media: media,
        entregasCorrigidas: entregasCorrigidas.length
      });
    }

    const dadosParaIA = {
      totalAvaliacoes: totalAvaliacoes,
      alunos: dadosAlunos
    };

    // 3. Chamar o serviço de IA para gerar o relatório
    const relatorio = await iaService.gerarRelatorioTurma(dadosParaIA);

    res.status(200).json(relatorio);

  } catch (error) {
    console.error('Erro ao gerar relatório inteligente:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao gerar o relatório.' });
  }
};