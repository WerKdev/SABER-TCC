document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo das aulas (em produção viria do backend)
    const classes = [
        {
            id: 1,
            title: 'Álgebra Linear',
            subject: 'Matemática',
            professor: 'Prof. Carlos Silva',
            date: '2025-05-12',
            time: '13:00 - 13:50',
            turno: 'tarde',
            room: 'Sala 201',
            description: 'Estudo de sistemas lineares e matrizes.',
            content: [
                'Matrizes e determinantes',
                'Sistemas de equações lineares',
                'Espaços vetoriais',
                'Transformações lineares'
            ],
            materials: [
                'Livro: Álgebra Linear com Aplicações - Howard Anton',
                'Apostila disponível no portal'
            ],
            activities: [
                'Resolução de exercícios em grupo',
                'Lista de exercícios para casa'
            ]
        },
        {
            id: 2,
            title: 'Programação Orientada a Objetos',
            subject: 'Ciência da Computação',
            professor: 'Profa. Marta Rocha',
            date: '2025-05-12',
            time: '14:00 - 14:50',
            turno: 'tarde',
            room: 'Laboratório 3',
            description: 'Conceitos fundamentais de OOP usando Java.',
            content: [
                'Classes e objetos',
                'Herança e polimorfismo',
                'Interfaces e classes abstratas',
                'Tratamento de exceções'
            ],
            materials: [
                'Slides da aula',
                'Código de exemplo no GitHub'
            ],
            activities: [
                'Desenvolvimento de mini-projeto',
                'Exercícios práticos no laboratório'
            ]
        },
        {
            id: 3,
            title: 'Literatura Brasileira',
            subject: 'Português',
            professor: 'Prof. André Santos',
            date: '2025-05-13',
            time: '09:00 - 09:50',
            turno: 'manha',
            room: 'Sala 105',
            description: 'Modernismo brasileiro - Segunda fase.',
            content: [
                'Contexto histórico',
                'Principais autores',
                'Análise de obras representativas',
                'Características do período'
            ],
            materials: [
                'Livro: Literatura Brasileira - Alfredo Bosi',
                'Textos selecionados para leitura prévia'
            ],
            activities: [
                'Discussão em grupo',
                'Análise de poemas selecionados'
            ]
        },
        {
            id: 4,
            title: 'Física Quântica',
            subject: 'Física',
            professor: 'Prof. Ricardo Alves',
            date: '2025-05-15',
            time: '10:00 - 10:50',
            turno: 'manha',
            room: 'Laboratório 1',
            description: 'Introdução aos conceitos da física quântica.',
            content: [
                'Dualidade onda-partícula',
                'Princípio da incerteza',
                'Equação de Schrödinger',
                'Aplicações tecnológicas'
            ],
            materials: [
                'Apresentação de slides',
                'Artigos científicos selecionados'
            ],
            activities: [
                'Demonstração experimental',
                'Resolução de problemas teóricos'
            ]
        },
    ];

    // Configuração de horários das aulas
    const horarios = {
        manha: [
            '7:00 - 7:50',
            '7:50 - 8:40',
            '8:40 - 9:30',
            'Intervalo',
            '9:50 - 10:40',
            '10:40 - 11:30',
            '11:30 - 12:20'
        ],
        tarde: [
            '13:00 - 13:50',
            '13:50 - 14:40',
            '14:40 - 15:30',
            'Intervalo',
            '15:50 - 16:40',
            '16:40 - 17:30',
            '17:30 - 18:20'
        ]
    };

    // Definir grade horária semanal (cronograma)
    const cronogramaAulas = {
        manha: {
            'domingo': [],
            'segunda': [
                { id: 101, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                { id: 102, title: 'Português', professor: 'Prof. André Santos' },
                { id: 103, title: 'Química', professor: 'Profa. Beatriz Lima' },
                'Intervalo',
                { id: 104, title: 'Física', professor: 'Prof. Ricardo Alves' },
                { id: 105, title: 'História', professor: 'Profa. Clara Mendes' },
                { id: 106, title: 'Filosofia', professor: 'Profa. Amanda Dias' }
            ],
            'terca': [
                { id: 107, title: 'Português', professor: 'Prof. André Santos' },
                { id: 108, title: 'Geografia', professor: 'Prof. Rodrigo Matos' },
                { id: 109, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                'Intervalo',
                { id: 110, title: 'Biologia', professor: 'Prof. Marcelo Costa' },
                { id: 111, title: 'História', professor: 'Profa. Clara Mendes' },
                { id: 112, title: 'Sociologia', professor: 'Prof. Renato Lopes' }
            ],
            'quarta': [
                { id: 113, title: 'Física', professor: 'Prof. Ricardo Alves' },
                { id: 114, title: 'Química', professor: 'Profa. Beatriz Lima' },
                { id: 115, title: 'Educação Física', professor: 'Prof. Fernando Gomes' },
                'Intervalo',
                { id: 116, title: 'Inglês', professor: 'Prof. Daniel Costa' },
                { id: 117, title: 'Arte', professor: 'Profa. Sofia Oliveira' },
                { id: 118, title: 'Literatura', professor: 'Prof. André Santos' }
            ],
            'quinta': [
                { id: 119, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                { id: 120, title: 'Biologia', professor: 'Prof. Marcelo Costa' },
                { id: 121, title: 'Física', professor: 'Prof. Ricardo Alves' },
                'Intervalo',
                { id: 122, title: 'Português', professor: 'Prof. André Santos' },
                { id: 123, title: 'Sociologia', professor: 'Prof. Renato Lopes' },
                { id: 124, title: 'Redação', professor: 'Profa. Mariana Costa' }
            ],
            'sexta': [
                { id: 125, title: 'Geografia', professor: 'Prof. Rodrigo Matos' },
                { id: 126, title: 'Química', professor: 'Profa. Beatriz Lima' },
                { id: 127, title: 'História', professor: 'Profa. Clara Mendes' },
                'Intervalo',
                { id: 128, title: 'Filosofia', professor: 'Profa. Amanda Dias' },
                { id: 129, title: 'Português', professor: 'Prof. André Santos' },
                { id: 130, title: 'Informática', professor: 'Prof. Marcos Oliveira' }
            ],
            'sabado': []
        },
        tarde: {
            'domingo': [],
            'segunda': [
                { id: 201, title: 'Álgebra Linear', professor: 'Prof. Carlos Silva' },
                { id: 202, title: 'Programação Orientada a Objetos', professor: 'Profa. Marta Rocha' },
                { id: 203, title: 'Banco de Dados', professor: 'Prof. Lucas Martins' },
                'Intervalo',
                { id: 204, title: 'Estrutura de Dados', professor: 'Prof. Pedro Alves' },
                { id: 205, title: 'Desenvolvimento Web', professor: 'Profa. Carla Santos' },
                { id: 206, title: 'Inteligência Artificial', professor: 'Prof. Marcos Oliveira' }
            ],
            'terca': [
                { id: 207, title: 'Cálculo', professor: 'Profa. Renata Lima' },
                { id: 208, title: 'Algoritmos', professor: 'Prof. Roberto Cruz' },
                { id: 209, title: 'Engenharia de Software', professor: 'Profa. Juliana Costa' },
                'Intervalo',
                { id: 210, title: 'Sistemas Operacionais', professor: 'Prof. Eduardo Gomes' },
                { id: 211, title: 'Arquitetura de Computadores', professor: 'Prof. Gustavo Lima' },
                { id: 212, title: 'Matemática Discreta', professor: 'Prof. Felipe Santos' }
            ],
            'quarta': [
                { id: 213, title: 'Programação Mobile', professor: 'Prof. Rafael Sousa' },
                { id: 214, title: 'Redes de Computadores', professor: 'Profa. Camila Oliveira' },
                { id: 215, title: 'Segurança da Informação', professor: 'Prof. Thiago Moreira' },
                'Intervalo',
                { id: 216, title: 'Computação em Nuvem', professor: 'Prof. Diego Silva' },
                { id: 217, title: 'Programação Paralela', professor: 'Profa. Fernanda Costa' },
                { id: 218, title: 'Compiladores', professor: 'Prof. Bruno Almeida' }
            ],
            'quinta': [
                { id: 219, title: 'Desenvolvimento de Jogos', professor: 'Prof. Leonardo Nunes' },
                { id: 220, title: 'Gerência de Projetos', professor: 'Profa. Daniela Cardoso' },
                { id: 221, title: 'Interação Humano-Computador', professor: 'Prof. Vicente Ferreira' },
                'Intervalo',
                { id: 222, title: 'Big Data', professor: 'Prof. Gabriel Martins' },
                { id: 223, title: 'Machine Learning', professor: 'Profa. Teresa Gomes' },
                { id: 224, title: 'Realidade Virtual', professor: 'Prof. Igor Sampaio' }
            ],
            'sexta': [
                { id: 225, title: 'Sistemas Distribuídos', professor: 'Prof. José Pereira' },
                { id: 226, title: 'Processamento de Imagens', professor: 'Profa. Cristina Alves' },
                { id: 227, title: 'Ética em Computação', professor: 'Prof. Henrique Lima' },
                'Intervalo',
                { id: 228, title: 'Computação Gráfica', professor: 'Profa. Elisa Castro' },
                { id: 229, title: 'Projeto Integrador', professor: 'Prof. Ricardo Mendes' },
                { id: 230, title: 'Empreendedorismo', professor: 'Profa. Patricia Torres' }
            ],
            'sabado': []
        }
    };

    // Variáveis globais
    let currentDate = new Date(); // Data atual do sistema
    const today = new Date(); // Data atual do sistema
    let selectedDate = null;
    let currentFilter = 'todos';

    
    // Recupera o turno salvo do localStorage ou usa 'manha' como padrão
    let currentTurno = localStorage.getItem('selectedTurno') || 'manha';

    // Elementos DOM
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthYear = document.getElementById('current-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const selectedDateTitle = document.getElementById('selected-date-title');
    const dayClassesList = document.getElementById('day-classes-list');
    const turnoFilter = document.getElementById('c');
    const todayBtn = document.getElementById('today-btn');
    const classDetailPopup = document.getElementById('class-detail-popup');
    const classDetailContent = document.getElementById('class-detail-content');
    const lessonPlanPopup = document.getElementById('lesson-plan-popup');
    const lessonPlanContent = document.getElementById('lesson-plan-content');
    const closePopups = document.querySelectorAll('.close-popup');
    const turnoCronograma = document.getElementById('turno-cronograma');
    const cronogramaTable = document.getElementById('cronograma-tbody');
    const tabItems = document.querySelectorAll('.tab-item');

    // Função auxiliar para parsing correto de datas
    function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    // Preencher o calendário com aulas do cronograma
    function preencherCalendarioCronograma() {
        // Para cada dia do mês atual, adicionar aulas do cronograma
        const mesAtual = currentDate.getMonth();
        const anoAtual = currentDate.getFullYear();
        const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();
        
        // Array de mapas de dia da semana
        const daysMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        
        // Percorrer todos os dias do mês
        for (let dia = 1; dia <= ultimoDia; dia++) {
            const data = new Date(anoAtual, mesAtual, dia);
            const diaSemana = data.getDay(); // 0-6 (Domingo-Sábado)
            const nomeDiaSemana = daysMap[diaSemana];
            
            // Se houver aulas para esse dia da semana, adicionar ao array de classes
            if (cronogramaAulas.manha[nomeDiaSemana].length > 0 || cronogramaAulas.tarde[nomeDiaSemana].length > 0) {
                // Para o turno da manhã
                cronogramaAulas.manha[nomeDiaSemana].forEach((aula, index) => {
                    if (aula !== 'Intervalo' && typeof aula === 'object') {
                        classes.push({
                            id: aula.id + (dia * 1000), // ID único
                            title: aula.title,
                            subject: aula.title, // Usar o título como matéria
                            professor: aula.professor,
                            date: `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
                            time: horarios.manha[index],
                            turno: 'manha',
                            room: 'Sala a definir',
                            description: `Aula regular de ${aula.title}`,
                            content: ['Conteúdo programático a ser definido pelo professor'],
                            materials: ['Materiais serão disponibilizados pelo professor'],
                            activities: ['Atividades a serem definidas']
                        });
                    }
                });
                
                // Para o turno da tarde
                cronogramaAulas.tarde[nomeDiaSemana].forEach((aula, index) => {
                    if (aula !== 'Intervalo' && typeof aula === 'object') {
                        classes.push({
                            id: aula.id + (dia * 1000), // ID único
                            title: aula.title,
                            subject: aula.title, // Usar o título como matéria
                            professor: aula.professor,
                            date: `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
                            time: horarios.tarde[index],
                            turno: 'tarde',
                            room: 'Sala a definir',
                            description: `Aula regular de ${aula.title}`,
                            content: ['Conteúdo programático a ser definido pelo professor'],
                            materials: ['Materiais serão disponibilizados pelo professor'],
                            activities: ['Atividades a serem definidas']
                        });
                    }
                });
            }
        }
    }

    // Inicialização
    preencherCalendarioCronograma();
    renderCalendar();
    // Renderizar as aulas do dia atual (hoje) na lista abaixo do calendário
    // mas SEM abrir o popup
    selectedDate = new Date(today);
    renderDayClasses(selectedDate);
    initTabs();
    
    // Definir o valor do seletor baseado no valor salvo
    if (turnoCronograma) {
        turnoCronograma.value = currentTurno;
        renderCronograma(currentTurno);
    }

    // Inicializar sistema de abas
    function initTabs() {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const tabId = this.getAttribute('data-tab');
                
                // Remove classe ativa de todas as abas e conteúdos
                document.querySelectorAll('.tab-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Adiciona classe ativa à aba clicada e conteúdo correspondente
                this.classList.add('active');
                document.getElementById(`${tabId}-content`).classList.add('active');
                
                // Se a aba selecionada for o cronograma, renderizar
                if (tabId === 'cronograma') {
                    renderCronograma(currentTurno);
                }
            });
        });
    }

    // Event Listeners
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
        // Apenas renderiza as aulas para o dia de hoje na lista abaixo do calendário
        renderDayClasses(selectedDate);
    });

    turnoFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderCalendar();
        if (selectedDate) {
            renderDayClasses(selectedDate);
        }
    });

    // Corrigir o event listener para o seletor de turno do cronograma
    if (turnoCronograma) {
        turnoCronograma.addEventListener('change', (e) => {
            currentTurno = e.target.value;
            // Salvar a preferência no localStorage
            localStorage.setItem('selectedTurno', currentTurno);
            renderCronograma(currentTurno);
        });
    }

    // Event listener para fechar o popup
    closePopups.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            classDetailPopup.style.display = 'none';
            lessonPlanPopup.style.display = 'none';
        });
    });

    // Fechar popups ao clicar fora deles
    [classDetailPopup, lessonPlanPopup].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    });

    // Fechar popup com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            classDetailPopup.style.display = 'none';
            lessonPlanPopup.style.display = 'none';
        }
    });

    // Funções principais
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Atualizar título do mês/ano
        currentMonthYear.textContent = `${getMonthName(month)} ${year}`;
        
        // Limpar dias existentes
        calendarDays.innerHTML = '';
        
        // Primeiro dia do mês
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
        const remainingDays = 42 - calendarDays.children.length; // 6 semanas
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            const dayElement = createDayElement(date, true);
            calendarDays.appendChild(dayElement);
        }

        // Selecionar o dia atual ou selecionado (apenas visualmente, sem abrir popup)
        if (selectedDate) {
            const dayElements = document.querySelectorAll('.calendar-day');
            dayElements.forEach(dayEl => {
                const dateAttr = dayEl.getAttribute('data-date');
                if (dateAttr === formatDate(selectedDate, 'yyyy-mm-dd')) {
                    // Apenas marca visualmente o dia sem acionar o click
                    dayEl.classList.add('selected');
                    // Renderiza as aulas para este dia na lista abaixo do calendário
                    renderDayClasses(selectedDate);
                }
            });
        }
    }

    function createDayElement(date, otherMonth = false) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.setAttribute('data-date', formatDate(date, 'yyyy-mm-dd'));
        dayElement.setAttribute('data-day-of-week', date.getDay()); // Armazena o dia da semana (0-6)
        
        if (otherMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Verificar se é hoje
        if (isToday(date)) {
            dayElement.classList.add('today');
        }
        
        // Verificar se está selecionado
        if (selectedDate && isSameDay(date, selectedDate)) {
            dayElement.classList.add('selected');
        }
        
        // Número do dia
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        // Aulas do dia
        const dayClasses = getClassesForDate(date);
        if (dayClasses.length > 0) {
            // Indicadores de pontos
            const indicators = document.createElement('div');
            indicators.className = 'class-indicators';
            
            // Verificar turnos únicos para mostrar indicadores
            const turnos = [...new Set(dayClasses.map(cls => cls.turno))];
            
            turnos.forEach(turno => {
                const dot = document.createElement('div');
                dot.className = `class-dot ${turno}`;
                indicators.appendChild(dot);
            });
            
            dayElement.appendChild(indicators);
            
            // Mostrar apenas a primeira aula
            if (dayClasses.length > 0) {
                const firstClass = dayClasses[0];
                const miniCard = document.createElement('div');
                miniCard.className = `class-mini-card ${firstClass.turno}`;
                miniCard.textContent = firstClass.title;
                dayElement.appendChild(miniCard);
                
                // Adicionar o botão "Ver mais" se houver mais de uma aula
                if (dayClasses.length > 1) {
                    const verMaisBtn = document.createElement('div');
                    verMaisBtn.className = 'ver-mais-btn';
                    verMaisBtn.innerHTML = '<button>Ver plano de aula →</button>';
                    verMaisBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Obter o dia da semana (0-6, onde 0 é domingo)
                        const dayOfWeek = date.getDay();
                        
                        // Mapear o dia da semana para o formato usado no cronograma
                        const daysMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
                        const dayName = daysMap[dayOfWeek];
                        
                        // Mostrar o cronograma deste dia específico
                        showDaySchedule(dayName, date);
                    });
                    dayElement.appendChild(verMaisBtn);
                }
            }
        }
        
        // Click handler - mostrar cronograma do dia da semana APENAS quando explicitamente clicado
        dayElement.addEventListener('click', () => {
            // Remove a seleção visual de todos os dias
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            // Adiciona a seleção visual a este dia
            dayElement.classList.add('selected');
            // Atualiza a data selecionada
            selectedDate = new Date(date);
            
            // Renderiza as aulas para este dia na lista abaixo do calendário
            renderDayClasses(selectedDate);
            
            // NÃO abre automaticamente o popup do cronograma do dia
            // Isso só será feito quando o usuário clicar no botão "Ver plano de aula"
        });
        
        return dayElement;
    }

    // Nova função para mostrar o cronograma de um dia específico com design aprimorado
    function showDaySchedule(dayName, date) {
        // Formatação da data para exibição
        const formattedDate = `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
        
        // Determinar qual turno mostrar (baseado no filtro atual ou no localStorage)
        const turnoToShow = currentFilter !== 'todos' ? currentFilter : (localStorage.getItem('selectedTurno') || 'manha');
        
        // Obter aulas do cronograma para este dia
        const daySchedule = cronogramaAulas[turnoToShow][dayName] || [];
        
        // Mapear nomes de dias para versões com iniciais maiúsculas
        const dayNameMap = {
            'domingo': 'Domingo',
            'segunda': 'Segunda',
            'terca': 'Terça',
            'quarta': 'Quarta',
            'quinta': 'Quinta',
            'sexta': 'Sexta',
            'sabado': 'Sábado'
        };
        
        // Criar o conteúdo do popup
        let popupContent = `
            <div class="day-schedule-popup">
                <div class="day-schedule-header">
                    <div class="day-info">
                        <span class="day-turno ${turnoToShow}">
                            ${turnoToShow === 'manha' ? 'Manhã' : 'Tarde'}
                        </span>
                        <span class="day-date">
                            <span class="material-symbols-outlined">calendar_today</span>
                            ${formattedDate}
                        </span>
                    </div>
                    <h3>Cronograma de Aulas - ${dayNameMap[dayName]}</h3>
                    <span class="material-symbols-outlined close-popup">close</span>
                </div>
                <div class="day-schedule-content">
        `;
        
        if (daySchedule.length === 0) {
            popupContent += '<p class="no-classes">Nenhuma aula programada para este dia.</p>';
        } else {
            popupContent += '<table class="day-schedule-table"><thead><tr><th>Horário</th><th>Disciplina</th><th>Professor</th></tr></thead><tbody>';
            
            // Adicionar cada aula à tabela
            horarios[turnoToShow].forEach((horario, index) => {
                const aula = daySchedule[index];
                
                if (horario === 'Intervalo') {
                    popupContent += `<tr class="intervalo"><td colspan="3">Intervalo</td></tr>`;
                } else if (aula && typeof aula === 'object') {
                    popupContent += `
                        <tr>
                            <td>${horario}</td>
                            <td>${aula.title}</td>
                            <td>${aula.professor}</td>
                        </tr>
                    `;
                } else {
                    popupContent += `
                        <tr>
                            <td>${horario}</td>
                            <td colspan="2">-</td>
                        </tr>
                    `;
                }
            });
            
            popupContent += '</tbody></table>';
        }
        
        popupContent += `
                </div>
                <div class="day-schedule-actions">
                    <button class="btn-ver-todas" id="btn-ver-todas">
                        Ver Cronograma Completo
                    </button>
                </div>
            </div>
        `;
        
        // Preencher e mostrar o popup
        lessonPlanContent.innerHTML = popupContent;
        lessonPlanPopup.style.display = 'flex';
        
        // Adicionar event listener para o botão de ver cronograma completo
        document.getElementById('btn-ver-todas').addEventListener('click', () => {
            lessonPlanPopup.style.display = 'none';
            
            // Mudar para a aba de cronograma
            const cronogramaTab = document.querySelector('.tab-item[data-tab="cronograma"]');
            if (cronogramaTab) {
                cronogramaTab.click();
            }
        });
        
        // Adicionar event listener para o botão de fechar
        const closeButton = lessonPlanContent.querySelector('.close-popup');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                lessonPlanPopup.style.display = 'none';
            });
        }
    }

    function getClassesForDate(date) {
        let filteredClasses = classes.filter(classItem => {
            const classDate = parseLocalDate(classItem.date);
            return isSameDay(classDate, date);
        });
        
        if (currentFilter !== 'todos') {
            filteredClasses = filteredClasses.filter(classItem => 
                classItem.turno === currentFilter
            );
        }
        
        return filteredClasses;
    }

    function renderDayClasses(date) {
        const formattedDate = `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
        selectedDateTitle.textContent = `Aulas - ${formattedDate}`;
        
        const dayClasses = getClassesForDate(date);
        
        if (dayClasses.length === 0) {
            dayClassesList.innerHTML = '<p class="no-classes">Nenhuma aula para este dia.</p>';
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
        card.className = `day-class-card ${classItem.turno}`;
        
        card.innerHTML = `
            <div class="day-class-header">
                <div>
                    <div class="day-class-title">${classItem.title}</div>
                    <div class="day-class-subject">${classItem.subject}</div>
                </div>
                <div class="day-class-time">
                    <span class="material-symbols-outlined">schedule</span>
                    ${classItem.time}
                </div>
            </div>
            <div class="day-class-professor">
                <span class="material-symbols-outlined">person</span>
                ${classItem.professor}
            </div>
            <div class="class-actions">
                <button class="btn-view-plan" onclick="event.stopPropagation();" data-id="${classItem.id}">
                    <span class="material-symbols-outlined">description</span>
                    Ver Plano de Aula
                </button>
                <button class="btn-view-materials" onclick="event.stopPropagation();">
                    <span class="material-symbols-outlined">folder</span>
                    Materiais
                </button>
            </div>
        `;
        
        // Event listener para o cartão inteiro
        card.addEventListener('click', () => showClassDetails(classItem));
        
        // Event listener específico para o botão de plano de aula
        const btnViewPlan = card.querySelector('.btn-view-plan');
        btnViewPlan.addEventListener('click', (e) => {
            e.stopPropagation();
            showLessonPlan(classItem);
        });
        
        return card;
    }

    function showClassDetails(classItem) {
        const formattedDate = formatDate(parseLocalDate(classItem.date), 'dd/mm/yyyy');
        
        classDetailContent.innerHTML = `
            <div class="class-detail">
                <div class="class-detail-header">
                    <h3>${classItem.title}</h3>
                    <span class="class-turno ${classItem.turno}">${classItem.turno === 'manha' ? 'Manhã' : 'Tarde'}</span>
                </div>
                <div class="class-detail-info">
                    <p><strong>Matéria:</strong> <span>${classItem.subject}</span></p>
                    <p><strong>Professor:</strong> <span>${classItem.professor}</span></p>
                    <p><strong>Data:</strong> <span>${formattedDate}</span></p>
                    <p><strong>Horário:</strong> <span>${classItem.time}</span></p>
                    <p><strong>Local:</strong> <span>${classItem.room}</span></p>
                    <p><strong>Descrição:</strong> <span>${classItem.description}</span></p>
                </div>
                <div class="class-detail-actions">
                    <button class="btn-primary view-plan-btn" data-id="${classItem.id}">
                        <span class="material-symbols-outlined">description</span>
                        Ver Plano de Aula
                    </button>
                </div>
            </div>
        `;
        
        // Adicionar event listener para o botão de plano de aula
        const viewPlanBtn = classDetailContent.querySelector('.view-plan-btn');
        if (viewPlanBtn) {
            viewPlanBtn.addEventListener('click', () => {
                classDetailPopup.style.display = 'none';
                showLessonPlan(classItem);
            });
        }
        
        classDetailPopup.style.display = 'flex';
    }

    function showLessonPlan(classItem) {
        lessonPlanContent.innerHTML = `
            <div class="lesson-plan-detail">
                <div class="lesson-plan-header">
                    <h3>${classItem.title}</h3>
                    <span class="class-turno ${classItem.turno}">${classItem.turno === 'manha' ? 'Manhã' : 'Tarde'}</span>
                </div>
                <div class="lesson-plan-info">
                    <p><strong>Matéria:</strong> <span>${classItem.subject}</span></p>
                    <p><strong>Professor:</strong> <span>${classItem.professor}</span></p>
                    <p><strong>Descrição:</strong> <span>${classItem.description}</span></p>
                </div>
                
                <div class="lesson-plan-details">
                    <h4>Conteúdo Programático</h4>
                    <ul>
                        ${classItem.content.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h4>Materiais de Apoio</h4>
                    <ul>
                        ${classItem.materials.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h4>Atividades Propostas</h4>
                    <ul>
                        ${classItem.activities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="class-plan-table">
                    <h4>Cronograma da Aula</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Horário</th>
                                <th>Atividade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10 min</td>
                                <td>Introdução e revisão da aula anterior</td>
                            </tr>
                            <tr>
                                <td>20 min</td>
                                <td>Apresentação do novo conteúdo</td>
                            </tr>
                            <tr>
                                <td>15 min</td>
                                <td>Exercícios de fixação</td>
                            </tr>
                            <tr>
                                <td>5 min</td>
                                <td>Dúvidas e encerramento</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="lesson-plan-actions">
                    <button class="btn-primary" onclick="window.location.href='materiais.html?id=${classItem.id}'">
                        <span class="material-symbols-outlined">folder</span>
                        Acessar Materiais da Aula
                    </button>
                </div>
            </div>
        `;
        
        lessonPlanPopup.style.display = 'flex';
    }

    function renderCronograma(turno) {
        if (!cronogramaTable) return;
        
        cronogramaTable.innerHTML = '';
        
        const horariosTurno = horarios[turno];
        const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        
        // Para cada horário, criar uma linha na tabela
        horariosTurno.forEach((horario, index) => {
            const row = document.createElement('tr');
            
            // Coluna de horário
            const tdHorario = document.createElement('td');
            tdHorario.className = 'horario';
            tdHorario.textContent = horario;
            
            // Se for intervalo, adicionar classe especial
            if (horario === 'Intervalo') {
                tdHorario.classList.add('intervalo');
            }
            
            row.appendChild(tdHorario);
            
            // Para cada dia da semana, adicionar célula com aula (se houver)
            diasSemana.forEach(dia => {
                const td = document.createElement('td');
                
                // Se for intervalo, estender para todos os dias
                if (horario === 'Intervalo') {
                    td.textContent = 'Intervalo';
                    td.classList.add('intervalo');
                } else {
                    // Verificar se há aula neste horário e dia
                    const aula = cronogramaAulas[turno][dia][index];
                    
                    if (aula && typeof aula === 'object') {
                        td.classList.add('has-class');
                        
                        const classCell = document.createElement('div');
                        classCell.className = `class-cell ${turno}`;
                        classCell.innerHTML = `
                            <div class="class-cell-title">${aula.title}</div>
                            <div class="class-cell-professor">${aula.professor}</div>
                        `;
                        
                        // Evento de clique para mostrar detalhes da aula
                        classCell.addEventListener('click', () => {
                            // Criar objeto de aula temporário para exibir no popup
                            const tempClass = {
                                id: aula.id,
                                title: aula.title,
                                subject: aula.title, // Usar o título como matéria (simplificação)
                                professor: aula.professor,
                                date: formatDate(new Date(), 'yyyy-mm-dd'), // Data atual como placeholder
                                time: horario,
                                turno: turno,
                                room: 'Sala a definir',
                                description: `Aula regular de ${aula.title}`,
                                content: ['Conteúdo programático a ser definido pelo professor'],
                                materials: ['Materiais serão disponibilizados pelo professor'],
                                activities: ['Atividades a serem definidas']
                            };
                            
                            showClassDetails(tempClass);
                        });
                        
                        td.appendChild(classCell);
                    }
                }
                
                row.appendChild(td);
            });
            
            cronogramaTable.appendChild(row);
        });
    }

    // Funções auxiliares
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

    // Função auxiliar para capitalizar a primeira letra
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Adiciona a função ao escopo global para ser chamada do HTML
    window.showAllSchedules = function() {
        // Fechar o popup
        lessonPlanPopup.style.display = 'none';
        
        // Mudar para a aba de cronograma
        const cronogramaTab = document.querySelector('.tab-item[data-tab="cronograma"]');
        if (cronogramaTab) {
            cronogramaTab.click();
        }
    };
});