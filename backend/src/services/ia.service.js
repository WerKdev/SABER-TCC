// backend/src/services/ia.service.js

const { CohereClient } = require('cohere-ai');
require('dotenv').config();

// Inicializa o cliente da Cohere com a nossa chave de API
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Função que recebe o texto da redação e retorna a análise da IA
async function analisarRedacao(textoRedacao, tema) {
  try {
    const prompt = `
      Você é um professor de português especialista em corrigir redações do ENEM.
      Analise a seguinte redação com o tema "${tema}".
      
      Texto da redação:
      "${textoRedacao}"

      Forneça uma análise detalhada baseada nas 5 competências do ENEM:
      1.  **Competência I:** Demonstrar domínio da modalidade escrita formal da língua portuguesa.
      2.  **Competência II:** Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema.
      3.  **Competência III:** Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.
      4.  **Competência IV:** Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.
      5.  **Competência V:** Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.

      No final, atribua uma nota de 0 a 1000, baseada na análise.
      Sua resposta deve ser um objeto JSON com a seguinte estrutura: {"nota": <nota_numerica>, "feedback": "<texto_do_feedback_detalhado>"}.
      O feedback deve ser construtivo e apontar pontos fortes e áreas para melhoria.
    `;

    const response = await cohere.generate({
      prompt: prompt,
      max_tokens: 1000, // Aumentamos para permitir um feedback mais completo
      temperature: 0.3, // Mantemos a criatividade baixa para respostas mais consistentes
    });

    // Extrai o texto da resposta da IA
    const aiResponseText = response.generations[0].text;
    
    // Tenta converter a string de resposta em um objeto JSON
    const resultadoJSON = JSON.parse(aiResponseText.trim());

    return resultadoJSON;

  } catch (error) {
    console.error("Erro ao chamar a API da Cohere:", error);
    throw new Error('Falha ao analisar a redação com a IA.');
  }
}

// backend/src/services/ia.service.js

// ... (imports e função analisarRedacao existentes) ...

// Função que recebe os dados de uma turma e gera um relatório de desempenho
async function gerarRelatorioTurma(dadosTurma) {
  try {
    // Transforma os dados brutos em um texto legível para a IA
    const dadosFormatados = dadosTurma.alunos.map(aluno => 
      `- Aluno: ${aluno.nome}, Média de Notas: ${aluno.media.toFixed(2)}, Entregas Corrigidas: ${aluno.entregasCorrigidas}/${dadosTurma.totalAvaliacoes}`
    ).join('\n');

    const prompt = `
      Você é um coordenador pedagógico experiente analisando o desempenho de uma turma.
      Com base nos seguintes dados brutos, gere um relatório detalhado e humanizado para o professor.

      Dados da Turma:
      ${dadosFormatados}

      O relatório deve ter a seguinte estrutura:
      1.  **Visão Geral da Turma:** Comente sobre a média geral, a participação e o desempenho coletivo.
      2.  **Pontos Fortes:** Identifique as forças da turma como um todo.
      3.  **Pontos de Atenção:** Identifique as principais dificuldades ou desafios que a turma enfrenta.
      4.  **Alunos em Destaque:** Mencione 1 ou 2 alunos com desempenho consistentemente alto e sugira como mantê-los engajados.
      5.  **Alunos que Precisam de Apoio:** Identifique 1 ou 2 alunos com as médias mais baixas ou baixa participação e sugira estratégias de intervenção personalizadas.
      
      Seja encorajador e forneça sugestões práticas e construtivas. O relatório deve ser um parágrafo de texto corrido e bem escrito. Não use listas ou tópicos.
    `;

    const response = await cohere.generate({
      prompt: prompt,
      max_tokens: 1500,
      temperature: 0.5 // Um pouco mais de criatividade para um texto mais natural
    });

    const relatorioGerado = response.generations[0].text;
    return { relatorio: relatorioGerado.trim() };

  } catch (error) {
    console.error("Erro ao gerar relatório de turma com a IA:", error);
    throw new Error('Falha ao gerar relatório de desempenho.');
  }
}

module.exports = { analisarRedacao, gerarRelatorioTurma }; // Exporte a nova função