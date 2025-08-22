// backend/src/api/controllers/aluno.controller.js

const { Usuario, Turma, Instituicao, EntregaAtividade, Avaliacao, Disciplina } = require('../../models');
const { Op } = require('sequelize'); // Importar o operador 'Op' do Sequelize

// Função para um aluno logado buscar suas próprias turmas
exports.getMinhasTurmas = async (req, res) => {
  try {
    const alunoId = req.usuario.id; // ID do aluno vem do token

    // 1. Encontrar o usuário (aluno) no banco de dados
    const aluno = await Usuario.findByPk(alunoId);

    if (!aluno) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // 2. Usar o método mágico do Sequelize para buscar as turmas associadas
    // O nome 'getTurmas_aluno' vem do 'as: turmas_aluno' que definimos no models/index.js
    const turmas = await aluno.getTurmas_aluno({
        // Incluímos dados da instituição para exibir no frontend
        include: {
            model: Instituicao,
            as: 'instituicao',
            attributes: ['nome']
        },
        // Remove a tabela de junção da resposta
        joinTableAttributes: [] 
    });

    res.status(200).json(turmas);

  } catch (error) {
    console.error('Erro ao buscar turmas do aluno:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
exports.getMinhasNotas = async (req, res) => {
  try {
    const alunoId = req.usuario.id;

    // 1. Buscar todas as entregas do aluno que JÁ FORAM CORRIGIDAS (nota não é nula)
    const entregasCorrigidas = await EntregaAtividade.findAll({
      where: {
        aluno_id: alunoId,
        nota: {
          [Op.ne]: null // Usamos o operador 'not equal' para pegar apenas as que têm nota
        }
      },
      // Incluímos dados da avaliação e da disciplina para dar contexto ao aluno
      include: {
        model: Avaliacao,
        as: 'avaliacao',
        attributes: ['titulo', 'tipo_avaliacao', 'data_entrega'],
        include: {
          model: Disciplina,
          as: 'disciplina',
          attributes: ['nome']
        }
      },
      order: [['data_envio', 'DESC']] // Ordenar pelas mais recentes
    });

    res.status(200).json(entregasCorrigidas);

  } catch (error) {
    console.error('Erro ao buscar notas do aluno:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};