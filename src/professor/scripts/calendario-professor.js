document.addEventListener('DOMContentLoaded', function() {
    // ========== DADOS DAS AULAS DO PROFESSOR (MATEMÁTICA E FÍSICA) ==========
    const professorClasses = [
        // Maio 2025 - Múltiplas aulas por dia
        // DIA 21/05
        {
            id: 1,
            subject: 'Matemática',
            turma: '7º A',
            topic: 'Equações de 1º grau',
            date: '2025-05-21',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 28,
            objectives: ['Compreender conceito de equação', 'Resolver equações simples', 'Aplicar em problemas práticos'],
            content: ['Definição de equação', 'Elementos de uma equação', 'Métodos de resolução', 'Verificação de soluções'],
            methodology: 'Aula expositiva com exercícios práticos e discussão em grupo',
            resources: ['Quadro', 'Livro didático', 'Lista de exercícios', 'Calculadora'],
            evaluation: 'Participação em aula e resolução de exercícios'
        },
        {
            id: 2,
            subject: 'Física',
            turma: '8º B',
            topic: 'Cinemática - MRU',
            date: '2025-05-21',
            time: '08:00 - 08:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 25,
            objectives: ['Compreender movimento retilíneo uniforme', 'Calcular velocidade média', 'Construir gráficos v x t'],
            content: ['Conceito de velocidade', 'Movimento uniforme', 'Gráficos de movimento', 'Exercícios aplicados'],
            methodology: 'Demonstração experimental e análise gráfica',
            resources: ['Trilho de ar', 'Cronômetro', 'Gráficos', 'Calculadora'],
            evaluation: 'Relatório de experimento e exercícios'
        },
        {
            id: 3,
            subject: 'Matemática',
            turma: '9º A',
            topic: 'Função quadrática',
            date: '2025-05-21',
            time: '09:30 - 10:20',
            turno: 'manha',
            room: 'Sala 201',
            students: 30,
            objectives: ['Definir função quadrática', 'Identificar parábolas', 'Calcular vértice da parábola'],
            content: ['Definição de função quadrática', 'Gráfico da função', 'Cálculo do vértice', 'Zeros da função'],
            methodology: 'Demonstração gráfica com construção de parábolas',
            resources: ['Calculadora científica', 'Papel milimetrado', 'Régua', 'Software GeoGebra'],
            evaluation: 'Construção e interpretação de gráficos'
        },
        {
            id: 4,
            subject: 'Física',
            turma: '9º B',
            topic: 'Leis de Newton',
            date: '2025-05-21',
            time: '11:00 - 11:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 27,
            objectives: ['Compreender as três leis de Newton', 'Aplicar em exercícios', 'Relacionar força e aceleração'],
            content: ['Primeira lei de Newton', 'Segunda lei de Newton', 'Terceira lei de Newton', 'Aplicações'],
            methodology: 'Experimentos demonstrativos e resolução de problemas',
            resources: ['Kit de mecânica', 'Dinamômetro', 'Massas padronizadas'],
            evaluation: 'Aplicação das leis em situações práticas'
        },

        // DIA 22/05
        {
            id: 5,
            subject: 'Matemática',
            turma: '7º B',
            topic: 'Expressões algébricas',
            date: '2025-05-22',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 26,
            objectives: ['Identificar variáveis e constantes', 'Simplificar expressões', 'Calcular valor numérico'],
            content: ['Conceito de variável', 'Operações algébricas', 'Simplificação', 'Valor numérico'],
            methodology: 'Exercícios práticos e resolução passo a passo',
            resources: ['Quadro', 'Lista de exercícios', 'Fichas de atividades'],
            evaluation: 'Resolução de problemas e exercícios individuais'
        },
        {
            id: 6,
            subject: 'Física',
            turma: '9º A',
            topic: 'Energia mecânica',
            date: '2025-05-22',
            time: '10:30 - 11:20',
            turno: 'manha',
            room: 'Lab. Física',
            students: 32,
            objectives: ['Distinguir energia cinética e potencial', 'Aplicar conservação de energia', 'Resolver problemas'],
            content: ['Energia cinética', 'Energia potencial', 'Conservação de energia', 'Transformações energéticas'],
            methodology: 'Experimentos com pêndulo e plano inclinado',
            resources: ['Pêndulo simples', 'Plano inclinado', 'Esferas', 'Trena'],
            evaluation: 'Cálculos energéticos e análise experimental'
        },
        {
            id: 7,
            subject: 'Matemática',
            turma: '8º A',
            topic: 'Sistemas de equações',
            date: '2025-05-22',
            time: '13:00 - 13:50',
            turno: 'tarde',
            room: 'Sala 201',
            students: 29,
            objectives: ['Resolver sistemas 2x2', 'Aplicar métodos de resolução', 'Interpretar soluções graficamente'],
            content: ['Método da substituição', 'Método da adição', 'Interpretação gráfica', 'Aplicações práticas'],
            methodology: 'Resolução passo a passo com verificação das soluções',
            resources: ['Quadro', 'Exemplos práticos', 'Papel quadriculado', 'Calculadora'],
            evaluation: 'Exercícios individuais e trabalho em duplas'
        },

        // DIA 23/05
        {
            id: 8,
            subject: 'Física',
            turma: '8º A',
            topic: 'Ondas e som',
            date: '2025-05-23',
            time: '08:00 - 08:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 27,
            objectives: ['Caracterizar ondas', 'Compreender propagação do som', 'Calcular frequência e período'],
            content: ['Tipos de ondas', 'Propagação sonora', 'Frequência e período', 'Velocidade do som'],
            methodology: 'Experiências com diapasão e corda vibrante',
            resources: ['Diapasão', 'Corda', 'Osciloscópio', 'Alto-falante'],
            evaluation: 'Medições de ondas e cálculos'
        },
        {
            id: 9,
            subject: 'Matemática',
            turma: '7º A',
            topic: 'Inequações de 1º grau',
            date: '2025-05-23',
            time: '09:30 - 10:20',
            turno: 'manha',
            room: 'Sala 201',
            students: 28,
            objectives: ['Distinguir equação de inequação', 'Resolver inequações simples', 'Representar soluções'],
            content: ['Conceito de inequação', 'Sinais de desigualdade', 'Resolução', 'Representação na reta'],
            methodology: 'Comparação com equações e exercícios dirigidos',
            resources: ['Quadro', 'Régua para reta numérica', 'Exercícios graduados'],
            evaluation: 'Resolução e representação gráfica de inequações'
        },
        {
            id: 10,
            subject: 'Física',
            turma: '7º B',
            topic: 'Pressão e densidade',
            date: '2025-05-23',
            time: '11:00 - 11:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 24,
            objectives: ['Calcular densidade de materiais', 'Compreender conceito de pressão', 'Aplicar em fluidos'],
            content: ['Densidade de sólidos e líquidos', 'Pressão em fluidos', 'Princípio de Pascal', 'Empuxo'],
            methodology: 'Experimentos com densímetro e prensa hidráulica',
            resources: ['Balança', 'Provetas', 'Densímetro', 'Líquidos diversos'],
            evaluation: 'Medições de densidade e cálculos de pressão'
        },

        // DIA 24/05
        {
            id: 11,
            subject: 'Matemática',
            turma: '8º B',
            topic: 'Teorema de Pitágoras',
            date: '2025-05-24',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 31,
            objectives: ['Enunciar o teorema', 'Aplicar em triângulos retângulos', 'Resolver problemas práticos'],
            content: ['Enunciado do teorema', 'Demonstração geométrica', 'Aplicações', 'Exercícios práticos'],
            methodology: 'Demonstração com material concreto e exercícios',
            resources: ['Esquadros', 'Material dourado', 'Malha quadriculada'],
            evaluation: 'Aplicação do teorema em problemas'
        },
        {
            id: 12,
            subject: 'Física',
            turma: '9º A',
            topic: 'Eletricidade básica',
            date: '2025-05-24',
            time: '08:00 - 08:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 32,
            objectives: ['Distinguir corrente e tensão', 'Montar circuitos simples', 'Aplicar lei de Ohm'],
            content: ['Corrente elétrica', 'Tensão elétrica', 'Resistência', 'Lei de Ohm'],
            methodology: 'Montagem de circuitos com multímetro',
            resources: ['Kit de eletricidade', 'Multímetro', 'Resistores', 'Lâmpadas'],
            evaluation: 'Montagem de circuitos e medições'
        },
        {
            id: 13,
            subject: 'Matemática',
            turma: '9º B',
            topic: 'Equações do 2º grau',
            date: '2025-05-24',
            time: '09:30 - 10:20',
            turno: 'manha',
            room: 'Sala 201',
            students: 28,
            objectives: ['Identificar equações do 2º grau', 'Aplicar fórmula de Bhaskara', 'Analisar discriminante'],
            content: ['Forma geral', 'Fórmula de Bhaskara', 'Discriminante', 'Tipos de soluções'],
            methodology: 'Dedução da fórmula e aplicação em exercícios',
            resources: ['Calculadora científica', 'Formulário', 'Lista de exercícios'],
            evaluation: 'Resolução de equações e análise do discriminante'
        },

        // Continuando com mais dias...
        // DIA 26/05
        {
            id: 14,
            subject: 'Matemática',
            turma: '7º A',
            topic: 'Geometria - Ângulos',
            date: '2025-05-26',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 28,
            objectives: ['Classificar ângulos', 'Medir com transferidor', 'Identificar ângulos especiais'],
            content: ['Tipos de ângulos', 'Medição de ângulos', 'Ângulos complementares', 'Ângulos suplementares'],
            methodology: 'Atividades práticas com transferidor',
            resources: ['Transferidor', 'Esquadros', 'Compasso'],
            evaluation: 'Classificação e medição de ângulos'
        },
        {
            id: 15,
            subject: 'Física',
            turma: '8º B',
            topic: 'Temperatura e calor',
            date: '2025-05-26',
            time: '08:00 - 08:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 25,
            objectives: ['Distinguir temperatura e calor', 'Converter escalas termométricas', 'Medir temperaturas'],
            content: ['Conceito de temperatura', 'Escalas termométricas', 'Calor e energia térmica', 'Termômetros'],
            methodology: 'Experimentos com termômetros e conversões',
            resources: ['Termômetros', 'Béqueres', 'Água quente e fria'],
            evaluation: 'Conversões de temperatura e medições'
        },
        {
            id: 16,
            subject: 'Matemática',
            turma: '8º A',
            topic: 'Produtos notáveis',
            date: '2025-05-26',
            time: '10:30 - 11:20',
            turno: 'manha',
            room: 'Sala 201',
            students: 29,
            objectives: ['Identificar produtos notáveis', 'Aplicar fórmulas', 'Fatorar expressões'],
            content: ['Quadrado da soma', 'Quadrado da diferença', 'Produto da soma pela diferença'],
            methodology: 'Demonstração geométrica e algébrica',
            resources: ['Quadro', 'Material concreto', 'Lista de exercícios'],
            evaluation: 'Aplicação de produtos notáveis'
        },

        // DIA 27/05
        {
            id: 17,
            subject: 'Física',
            turma: '7º A',
            topic: 'Estados da matéria',
            date: '2025-05-27',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 28,
            objectives: ['Identificar estados da matéria', 'Explicar mudanças de fase', 'Relacionar com temperatura'],
            content: ['Sólido, líquido e gasoso', 'Mudanças de estado', 'Ponto de fusão', 'Ponto de ebulição'],
            methodology: 'Experimentos com gelo e aquecimento',
            resources: ['Bico de Bunsen', 'Gelo', 'Termômetro', 'Béquer'],
            evaluation: 'Observação e descrição de mudanças de fase'
        },
        {
            id: 18,
            subject: 'Matemática',
            turma: '9º A',
            topic: 'Funções - conceitos',
            date: '2025-05-27',
            time: '09:30 - 10:20',
            turno: 'manha',
            room: 'Sala 201',
            students: 30,
            objectives: ['Compreender conceito de função', 'Identificar domínio e imagem', 'Construir gráficos'],
            content: ['Definição de função', 'Domínio e contradomínio', 'Gráficos de funções'],
            methodology: 'Exemplos práticos e construção de gráficos',
            resources: ['Papel milimetrado', 'Régua', 'Calculadora'],
            evaluation: 'Identificação de funções e construção de gráficos'
        },

        // DIA 28/05
        {
            id: 19,
            subject: 'Matemática',
            turma: '7º B',
            topic: 'Frações algébricas',
            date: '2025-05-28',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 26,
            objectives: ['Simplificar frações algébricas', 'Realizar operações', 'Encontrar condições de existência'],
            content: ['Simplificação', 'Adição e subtração', 'Multiplicação e divisão', 'Restrições'],
            methodology: 'Analogia com frações numéricas',
            resources: ['Quadro', 'Exemplos graduados'],
            evaluation: 'Operações com frações algébricas'
        },
        {
            id: 20,
            subject: 'Física',
            turma: '8º A',
            topic: 'Reflexão da luz',
            date: '2025-05-28',
            time: '08:00 - 08:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 27,
            objectives: ['Compreender propagação da luz', 'Aplicar leis da reflexão', 'Construir imagens em espelhos'],
            content: ['Propagação retilínea', 'Leis da reflexão', 'Espelhos planos', 'Formação de imagens'],
            methodology: 'Experimentos com laser e espelhos',
            resources: ['Laser', 'Espelhos', 'Banco óptico'],
            evaluation: 'Construção de imagens e aplicação das leis'
        },

        // DIA 29/05
        {
            id: 21,
            subject: 'Matemática',
            turma: '8º B',
            topic: 'Fatoração',
            date: '2025-05-29',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 31,
            objectives: ['Fatorar por fator comum', 'Aplicar produtos notáveis na fatoração', 'Simplificar expressões'],
            content: ['Fator comum em evidência', 'Fatoração por agrupamento', 'Uso de produtos notáveis'],
            methodology: 'Exercícios progressivos de dificuldade',
            resources: ['Quadro', 'Lista de exercícios graduados'],
            evaluation: 'Fatoração de expressões algébricas'
        },
        {
            id: 22,
            subject: 'Física',
            turma: '9º B',
            topic: 'Magnetismo',
            date: '2025-05-29',
            time: '10:30 - 11:20',
            turno: 'manha',
            room: 'Lab. Física',
            students: 27,
            objectives: ['Caracterizar campos magnéticos', 'Construir eletroímãs', 'Relacionar eletricidade e magnetismo'],
            content: ['Ímãs e campo magnético', 'Eletroímãs', 'Campo magnético terrestre'],
            methodology: 'Experimentos com ímãs e bobinas',
            resources: ['Ímãs', 'Bobinas', 'Fonte DC', 'Bússola'],
            evaluation: 'Construção de eletroímã e observações'
        },

        // DIA 30/05
        {
            id: 23,
            subject: 'Matemática',
            turma: '9º A',
            topic: 'Razões trigonométricas',
            date: '2025-05-30',
            time: '07:00 - 07:50',
            turno: 'manha',
            room: 'Sala 201',
            students: 30,
            objectives: ['Definir seno, cosseno e tangente', 'Calcular razões em triângulos retângulos', 'Usar tabelas trigonométricas'],
            content: ['Seno de um ângulo', 'Cosseno de um ângulo', 'Tangente de um ângulo', 'Aplicações'],
            methodology: 'Construção e medição em triângulos',
            resources: ['Transferidor', 'Calculadora científica', 'Tabela trigonométrica'],
            evaluation: 'Cálculo de razões trigonométricas'
        },
        {
            id: 24,
            subject: 'Física',
            turma: '7º B',
            topic: 'Força e movimento',
            date: '2025-05-30',
            time: '08:00 - 08:50',
            turno: 'manha',
            room: 'Lab. Física',
            students: 24,
            objectives: ['Relacionar força e movimento', 'Medir forças', 'Compreender atrito'],
            content: ['Conceito de força', 'Medição de forças', 'Tipos de atrito', 'Força resultante'],
            methodology: 'Experimentos com dinamômetros',
            resources: ['Dinamômetros', 'Massas', 'Superfícies diferentes'],
            evaluation: 'Medições de força e análise de atrito'
        }
    ];

    // ========== DADOS DO PLANEJAMENTO CURRICULAR (MATEMÁTICA E FÍSICA) ==========
    const curriculumPlanning = {
        matematica: {
            title: 'Matemática',
            turmas: ['7º A', '7º B', '8º A', '8º B', '9º A', '9º B'],
            totalAulas: 200,
            content: [
                {
                    title: 'Números inteiros e operações',
                    period: '1º Bimestre',
                    status: 'completed',
                    description: 'Operações com números inteiros, propriedades e resolução de problemas',
                    objectives: ['Adição e subtração', 'Multiplicação e divisão', 'Potenciação', 'Expressões numéricas', 'Problemas contextualizados']
                },
                {
                    title: 'Álgebra básica - Equações de 1º grau',
                    period: '1º/2º Bimestre',
                    status: 'current',
                    description: 'Resolução de equações lineares, inequações e sistemas simples',
                    objectives: ['Conceito de equação', 'Resolução de equações', 'Inequações', 'Sistemas lineares', 'Problemas aplicados']
                },
                {
                    title: 'Geometria plana e espacial',
                    period: '2º Bimestre',
                    status: 'pending',
                    description: 'Figuras geométricas, ângulos, áreas e volumes',
                    objectives: ['Ângulos e polígonos', 'Teorema de Pitágoras', 'Áreas e perímetros', 'Volumes', 'Geometria analítica']
                },
                {
                    title: 'Funções e equações do 2º grau',
                    period: '3º Bimestre',
                    status: 'pending',
                    description: 'Funções lineares e quadráticas, gráficos e aplicações',
                    objectives: ['Conceito de função', 'Função quadrática', 'Fórmula de Bhaskara', 'Gráficos', 'Razões trigonométricas']
                },
                {
                    title: 'Estatística e probabilidade',
                    period: '4º Bimestre',
                    status: 'pending',
                    description: 'Análise de dados, medidas estatísticas e probabilidade',
                    objectives: ['Coleta de dados', 'Média e mediana', 'Gráficos estatísticos', 'Probabilidade básica', 'Análise crítica']
                }
            ]
        },
        fisica: {
            title: 'Física',
            turmas: ['7º A', '7º B', '8º A', '8º B', '9º A', '9º B'],
            totalAulas: 160,
            content: [
                {
                    title: 'Mecânica - Movimento e forças',
                    period: '1º Bimestre',
                    status: 'completed',
                    description: 'Cinemática básica, tipos de movimento e conceito de força',
                    objectives: ['Movimento retilíneo', 'Velocidade média', 'Leis de Newton', 'Força e atrito', 'Energia mecânica']
                },
                {
                    title: 'Termologia e estados da matéria',
                    period: '1º/2º Bimestre',
                    status: 'current',
                    description: 'Temperatura, calor, mudanças de estado e dilatação térmica',
                    objectives: ['Estados da matéria', 'Escalas termométricas', 'Calor específico', 'Mudanças de fase', 'Dilatação']
                },
                {
                    title: 'Ondulatória e óptica',
                    period: '2º Bimestre',
                    status: 'pending',
                    description: 'Ondas, som, luz e fenômenos ópticos',
                    objectives: ['Ondas mecânicas', 'Propagação do som', 'Luz e reflexão', 'Refração', 'Instrumentos ópticos']
                },
                {
                    title: 'Eletromagnetismo básico',
                    period: '3º Bimestre',
                    status: 'pending',
                    description: 'Eletricidade, magnetismo e suas aplicações',
                    objectives: ['Corrente elétrica', 'Lei de Ohm', 'Circuitos simples', 'Magnetismo', 'Eletroímãs']
                },
                {
                    title: 'Física moderna e aplicações',
                    period: '4º Bimestre',
                    status: 'pending',
                    description: 'Introdução à física moderna e tecnologias atuais',
                    objectives: ['Estrutura atômica', 'Radioatividade', 'Tecnologias', 'Sustentabilidade', 'Física no cotidiano']
                }
            ]
        }
    };

    // ========== VARIÁVEIS GLOBAIS ==========
    let currentDate = new Date();
    const today = new Date();
    let selectedDate = null;
    let currentFilter = 'todos';
    let currentMateriaFilter = 'todas';

    // ========== ELEMENTOS DOM ==========
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthYear = document.getElementById('current-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const selectedDateTitle = document.getElementById('selected-date-title');
    const dayClassesList = document.getElementById('day-classes-list');
    const turnoFilter = document.getElementById('turno-filter');
    const materiaFilter = document.getElementById('materia-filter');
    const todayBtn = document.getElementById('today-btn');
    const classDetailPopup = document.getElementById('class-detail-popup');
    const classDetailContent = document.getElementById('class-detail-content');
    const daySchedulePopup = document.getElementById('day-schedule-popup');
    const dayScheduleContent = document.getElementById('day-schedule-content');
    const closePopups = document.querySelectorAll('.close-popup');
    const tabItems = document.querySelectorAll('.tab-item');
    const curriculumContent = document.getElementById('curriculum-content');

    // ========== INICIALIZAÇÃO ==========
    renderCalendar();
    renderCurriculumPlanning();
    initTabs();

    // ========== EVENT LISTENERS ==========

    // Navegação do calendário
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date(today);
        selectedDate = new Date(today);
        renderCalendar();
        renderDayClasses(selectedDate);
    });

    // Filtros
    turnoFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderCalendar();
        if (selectedDate) {
            renderDayClasses(selectedDate);
        }
    });

    materiaFilter.addEventListener('change', (e) => {
        currentMateriaFilter = e.target.value;
        renderCalendar();
        if (selectedDate) {
            renderDayClasses(selectedDate);
        }
    });

    // Fechar popups
    closePopups.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            classDetailPopup.style.display = 'none';
            daySchedulePopup.style.display = 'none';
        });
    });

    [classDetailPopup, daySchedulePopup].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            classDetailPopup.style.display = 'none';
            daySchedulePopup.style.display = 'none';
        }
    });

    // ========== FUNÇÕES PRINCIPAIS ==========

    function initTabs() {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const tabId = this.getAttribute('data-tab');
                
                document.querySelectorAll('.tab-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                this.classList.add('active');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        currentMonthYear.textContent = `${getMonthName(month)} ${year}`;
        
        calendarDays.innerHTML = '';
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        
        // Dias do mês anterior
        for (let i = firstDay.getDay(); i > 0; i--) {
            const day = prevLastDay.getDate() - i + 1;
            const dayElement = createDayElement(new Date(year, month - 1, day), true);
            calendarDays.appendChild(dayElement);
        }
        
        // Dias do mês atual
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const dayElement = createDayElement(date);
            calendarDays.appendChild(dayElement);
        }
        
        // Dias do próximo mês
        const remainingDays = 42 - calendarDays.children.length;
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            const dayElement = createDayElement(date, true);
            calendarDays.appendChild(dayElement);
        }
    }

    function createDayElement(date, otherMonth = false) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.setAttribute('data-date', formatDate(date, 'yyyy-mm-dd'));
        
        if (otherMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (isToday(date)) {
            dayElement.classList.add('today');
        }
        
        if (selectedDate && isSameDay(date, selectedDate)) {
            dayElement.classList.add('selected');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        const dayClasses = getClassesForDate(date);
        if (dayClasses.length > 0) {
            const indicators = document.createElement('div');
            indicators.className = 'class-indicators';
            
            const turnos = [...new Set(dayClasses.map(cls => cls.turno))];
            turnos.forEach(turno => {
                const dot = document.createElement('div');
                dot.className = `class-dot ${turno}`;
                indicators.appendChild(dot);
            });
            
            dayElement.appendChild(indicators);
            
            // Mostrar primeiras aulas (máximo 2)
            const visibleClasses = dayClasses.slice(0, 2);
            visibleClasses.forEach(classItem => {
                const miniCard = document.createElement('div');
                miniCard.className = `class-mini-card ${classItem.subject.toLowerCase()}`;
                miniCard.textContent = `${classItem.time.split(' - ')[0]} ${classItem.turma}`;
                dayElement.appendChild(miniCard);
            });
            
            // SEMPRE mostrar botão "Ver mais" se houver aulas (mesmo que seja só 1)
            if (dayClasses.length >= 1) {
                const verMaisBtn = document.createElement('div');
                verMaisBtn.className = 'ver-mais-btn';
                if (dayClasses.length === 1) {
                    verMaisBtn.innerHTML = `<button>Ver plano de aula →</button>`;
                } else {
                    verMaisBtn.innerHTML = `<button>+${dayClasses.length - 2} Ver mais →</button>`;
                }
                verMaisBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDaySchedule(date, dayClasses);
                });
                dayElement.appendChild(verMaisBtn);
            }
        }
        
        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            dayElement.classList.add('selected');
            selectedDate = new Date(date);
            renderDayClasses(selectedDate);
        });
        
        return dayElement;
    }

    function getClassesForDate(date) {
        const dateStr = formatDate(date, 'yyyy-mm-dd');
        let filteredClasses = professorClasses.filter(cls => cls.date === dateStr);
        
        if (currentFilter !== 'todos') {
            filteredClasses = filteredClasses.filter(cls => cls.turno === currentFilter);
        }
        
        if (currentMateriaFilter !== 'todas') {
            filteredClasses = filteredClasses.filter(cls => cls.subject.toLowerCase() === currentMateriaFilter);
        }
        
        return filteredClasses.sort((a, b) => a.time.localeCompare(b.time));
    }

    function renderDayClasses(date) {
        const formattedDate = `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
        selectedDateTitle.textContent = `Suas aulas - ${formattedDate}`;
        
        const dayClasses = getClassesForDate(date);
        
        if (dayClasses.length === 0) {
            dayClassesList.innerHTML = '<p class="no-classes">Nenhuma aula programada para este dia.</p>';
            return;
        }
        
        dayClassesList.innerHTML = '';
        dayClasses.forEach(classItem => {
            const card = createClassCard(classItem);
            dayClassesList.appendChild(card);
        });
    }

    function createClassCard(classItem) {
        const card = document.createElement('div');
        card.className = `day-class-card ${classItem.subject.toLowerCase()}`;
        
        card.innerHTML = `
            <div class="day-class-header">
                <div>
                    <div class="day-class-title">${classItem.subject} - ${classItem.turma}</div>
                    <div class="day-class-subject">${classItem.topic}</div>
                </div>
                <div class="day-class-time">
                    <span class="material-symbols-outlined">schedule</span>
                    ${classItem.time}
                </div>
            </div>
            <div class="day-class-professor">
                <span class="material-symbols-outlined">location_on</span>
                ${classItem.room} • ${classItem.students} alunos
            </div>
            <div class="class-actions">
                <button class="btn-view-plan" data-id="${classItem.id}">
                    <span class="material-symbols-outlined">description</span>
                    Ver Detalhes
                </button>
                <button class="btn-view-materials">
                    <span class="material-symbols-outlined">folder</span>
                    Materiais
                </button>
            </div>
        `;
        
        card.addEventListener('click', () => showClassDetails(classItem));
        
        const btnViewPlan = card.querySelector('.btn-view-plan');
        btnViewPlan.addEventListener('click', (e) => {
            e.stopPropagation();
            showClassDetails(classItem);
        });
        
        return card;
    }

    function showDaySchedule(date, dayClasses) {
        const formattedDate = `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
        
        let popupContent = `
            <div class="day-schedule-popup">
                <div class="day-schedule-header">
                    <div class="day-info">
                        <span class="day-date">
                            <span class="material-symbols-outlined">calendar_today</span>
                            ${formattedDate}
                        </span>
                    </div>
                    <h3>Suas Aulas do Dia</h3>
                    <span class="material-symbols-outlined close-popup">close</span>
                </div>
                <div class="day-schedule-content">
        `;
        
        if (dayClasses.length === 0) {
            popupContent += '<p class="no-classes">Nenhuma aula programada para este dia.</p>';
        } else {
            popupContent += '<table class="day-schedule-table"><thead><tr><th>Horário</th><th>Matéria</th><th>Turma</th><th>Tópico</th></tr></thead><tbody>';
            
            dayClasses.forEach(aula => {
                popupContent += `
                    <tr class="clickable-row" data-class-id="${aula.id}">
                        <td>${aula.time}</td>
                        <td>${aula.subject}</td>
                        <td>${aula.turma}</td>
                        <td>${aula.topic}</td>
                    </tr>
                `;
            });
            
            popupContent += '</tbody></table>';
        }
        
        popupContent += `
                </div>
            </div>
        `;
        
        dayScheduleContent.innerHTML = popupContent;
        daySchedulePopup.style.display = 'flex';
        
        // Event listeners para as linhas clicáveis
        const clickableRows = dayScheduleContent.querySelectorAll('.clickable-row');
        clickableRows.forEach(row => {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => {
                const classId = parseInt(row.getAttribute('data-class-id'));
                const classItem = professorClasses.find(c => c.id === classId);
                if (classItem) {
                    daySchedulePopup.style.display = 'none';
                    showClassDetails(classItem);
                }
            });
        });
        
        const closeButton = dayScheduleContent.querySelector('.close-popup');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                daySchedulePopup.style.display = 'none';
            });
        }
    }

    function showClassDetails(classItem) {
        const formattedDate = formatDate(parseLocalDate(classItem.date), 'dd/mm/yyyy');
        
        classDetailContent.innerHTML = `
            <div class="class-detail">
                <div class="class-detail-header">
                    <h3>${classItem.subject} - ${classItem.turma}</h3>
                    <span class="class-turno ${classItem.turno}">${classItem.turno === 'manha' ? 'Manhã' : 'Tarde'}</span>
                </div>
                <div class="class-detail-info">
                    <p><strong>Tópico:</strong> <span>${classItem.topic}</span></p>
                    <p><strong>Data:</strong> <span>${formattedDate}</span></p>
                    <p><strong>Horário:</strong> <span>${classItem.time}</span></p>
                    <p><strong>Local:</strong> <span>${classItem.room}</span></p>
                    <p><strong>Alunos:</strong> <span>${classItem.students}</span></p>
                </div>
                
                <div class="lesson-plan-details">
                    <h4>Objetivos da Aula</h4>
                    <ul>
                        ${classItem.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                    
                    <h4>Conteúdo Programático</h4>
                    <ul>
                        ${classItem.content.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                        <div>
                            <h4>Metodologia</h4>
                            <p>${classItem.methodology}</p>
                        </div>
                        <div>
                            <h4>Recursos</h4>
                            <ul>
                                ${classItem.resources.map(resource => `<li>${resource}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <h4>Avaliação</h4>
                    <p>${classItem.evaluation}</p>
                </div>
            </div>
        `;
        
        classDetailPopup.style.display = 'flex';
    }

    function renderCurriculumPlanning() {
        curriculumContent.innerHTML = '';
        
        Object.keys(curriculumPlanning).forEach(subject => {
            const subjectData = curriculumPlanning[subject];
            const subjectSection = document.createElement('div');
            subjectSection.className = `subject-section ${subject}`;
            
            subjectSection.innerHTML = `
                <div class="subject-header">
                    <div>
                        <div class="subject-title">${subjectData.title}</div>
                        <div class="subject-info">Turmas: ${subjectData.turmas.join(', ')} • ${subjectData.totalAulas} aulas/ano</div>
                    </div>
                    <button class="btn btn-outline">
                        <span class="material-symbols-outlined">edit</span>
                        Editar
                    </button>
                </div>
                <div class="content-timeline">
                    ${subjectData.content.map(item => `
                        <div class="timeline-item ${item.status}">
                            <div class="timeline-header">
                                <div class="timeline-title">
                                    <span class="timeline-status ${item.status}"></span>
                                    ${item.title}
                                </div>
                                <div class="timeline-period">${item.period}</div>
                            </div>
                            <div class="timeline-description">${item.description}</div>
                            <div class="timeline-objectives">
                                ${item.objectives.map(obj => `<span class="objective-tag">${obj}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            curriculumContent.appendChild(subjectSection);
        });
    }

    // ========== FUNÇÕES AUXILIARES ==========

    function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function getMonthName(month) {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return months[month];
    }

    function isToday(date) {
        return isSameDay(date, today);
    }

    function isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    function formatDate(date, format) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        if (format === 'dd/mm/yyyy') {
            return `${day}/${month}/${year}`;
        } else if (format === 'yyyy-mm-dd') {
            return `${year}-${month}-${day}`;
        }
        
        return `${day}/${month}/${year}`;
    }
});