document.addEventListener('DOMContentLoaded', function() {
    
    // ========== FUNÇÃO PARA LER PARÂMETROS DA URL ==========
    function getURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            sala: urlParams.get('sala') || '101',
            ano: urlParams.get('ano') || '3',
            turma: urlParams.get('turma') || 'O'
        };
    }
    
    // ========== ATUALIZAR DADOS DA TURMA BASEADO NOS PARÂMETROS ==========
    function atualizarDadosTurma() {
        const params = getURLParams();
        
        // Atualizar título da página
        const pageTitle = document.querySelector('.page-title h1');
        if (pageTitle) {
            pageTitle.textContent = `SALA ${params.sala} - ${params.ano}º ${params.turma} - IFTP`;
        }
        
        // Atualizar title do documento
        document.title = `Sala ${params.sala} - ${params.ano}º ${params.turma} - Portal do Professor`;
        
        console.log(`Dashboard carregado para: Sala ${params.sala} - ${params.ano}º ${params.turma}`);
    }
    
    // ========== CONFIGURAR BOTÃO VOLTAR ==========
    function configurarBotaoVoltar() {
        const btnBack = document.querySelector('.btn-back-turmas');
        if (btnBack) {
            btnBack.addEventListener('click', function(e) {
                e.preventDefault();
                // Voltar para a página de turmas
                window.location.href = 'turmas.html';
            });
        }
    }

    // ========== DADOS MOCK DA TURMA 3º O ==========
    const turmaData = {
        info: {
            codigo: "SALA 101 - 3º O - IFTP",
            totalAlunos: 42,
            turno: "Tarde",
            horario: "13:00 - 18:20",
            andar: "3º andar"
        },
        metricas: {
            mediaGeral: 8.4,
            frequenciaMedia: 92,
            atividadesPendentes: 5,
            taxaAprovacao: 89
        },
        alunos: [
            {
                id: 1,
                nome: "Ana Silva Santos",
                numero: "01",
                matricula: "0000235662",
                notaFinal: 9.2,
                frequencia: 95,
                status: "aprovado",
                materias: {
                    matematica: 9.5,
                    fisica: 8.8,
                    quimica: 9.0,
                    biologia: 9.5
                }
            },
            {
                id: 2,
                nome: "Bruno Costa Lima",
                numero: "02",
                matricula: "0000235663",
                notaFinal: 7.8,
                frequencia: 88,
                status: "aprovado",
                materias: {
                    matematica: 8.0,
                    fisica: 7.5,
                    quimica: 8.2,
                    biologia: 7.5
                }
            },
            {
                id: 3,
                nome: "Carlos Eduardo Moura",
                numero: "03",
                matricula: "0000235664",
                notaFinal: 6.5,
                frequencia: 85,
                status: "risco",
                materias: {
                    matematica: 7.0,
                    fisica: 5.8,
                    quimica: 6.8,
                    biologia: 6.5
                }
            },
            {
                id: 4,
                nome: "Daniela Ferreira",
                numero: "04",
                matricula: "0000235665",
                notaFinal: 8.9,
                frequencia: 96,
                status: "aprovado",
                materias: {
                    matematica: 9.2,
                    fisica: 8.5,
                    quimica: 9.0,
                    biologia: 9.0
                }
            },
            {
                id: 5,
                nome: "Eduardo Ribeiro",
                numero: "05",
                matricula: "0000235666",
                notaFinal: 5.2,
                frequencia: 72,
                status: "reprovado",
                materias: {
                    matematica: 5.5,
                    fisica: 4.8,
                    quimica: 5.0,
                    biologia: 5.5
                }
            },
            {
                id: 6,
                nome: "Fernanda Oliveira",
                numero: "06",
                matricula: "0000235667",
                notaFinal: 8.1,
                frequencia: 91,
                status: "aprovado",
                materias: {
                    matematica: 8.5,
                    fisica: 7.8,
                    quimica: 8.0,
                    biologia: 8.0
                }
            },
            {
                id: 7,
                nome: "Gabriel Souza",
                numero: "07",
                matricula: "0000235668",
                notaFinal: 7.3,
                frequencia: 89,
                status: "aprovado",
                materias: {
                    matematica: 7.8,
                    fisica: 6.8,
                    quimica: 7.5,
                    biologia: 7.0
                }
            },
            {
                id: 8,
                nome: "Helena Martins",
                numero: "08",
                matricula: "0000235669",
                notaFinal: 9.5,
                frequencia: 98,
                status: "aprovado",
                materias: {
                    matematica: 9.8,
                    fisica: 9.2,
                    quimica: 9.5,
                    biologia: 9.5
                }
            },
            {
                id: 9,
                nome: "Igor Pereira",
                numero: "09",
                matricula: "0000235670",
                notaFinal: 6.8,
                frequencia: 83,
                status: "risco",
                materias: {
                    matematica: 7.2,
                    fisica: 6.0,
                    quimica: 7.0,
                    biologia: 7.0
                }
            },
            {
                id: 10,
                nome: "Julia Rodriguez",
                numero: "10",
                matricula: "0000235671",
                notaFinal: 8.6,
                frequencia: 94,
                status: "aprovado",
                materias: {
                    matematica: 8.8,
                    fisica: 8.2,
                    quimica: 8.8,
                    biologia: 8.6
                }
            }
        ],
        avaliacoes: [
            {
                id: 1,
                nome: "P1 - Prova 1",
                materia: "matematica",
                peso: 3,
                data: "2025-04-15"
            },
            {
                id: 2,
                nome: "P2 - Prova 2",
                materia: "matematica",
                peso: 3,
                data: "2025-05-20"
            },
            {
                id: 3,
                nome: "Trabalho em Grupo",
                materia: "fisica",
                peso: 2,
                data: "2025-05-10"
            }
        ],
        frequenciaDetalhada: {
            "2025-05": {
                totalAulas: 20,
                alunosFrequencia: [
                    { alunoId: 1, presencas: 19, faltas: 1 },
                    { alunoId: 2, presencas: 18, faltas: 2 },
                    { alunoId: 3, presencas: 17, faltas: 3 },
                    { alunoId: 4, presencas: 19, faltas: 1 },
                    { alunoId: 5, presencas: 14, faltas: 6 },
                    { alunoId: 6, presencas: 18, faltas: 2 },
                    { alunoId: 7, presencas: 18, faltas: 2 },
                    { alunoId: 8, presencas: 20, faltas: 0 },
                    { alunoId: 9, presencas: 17, faltas: 3 },
                    { alunoId: 10, presencas: 19, faltas: 1 }
                ]
            },
            "trimestre-1": {
                totalAulas: 60,
                alunosFrequencia: [
                    { alunoId: 1, presencas: 57, faltas: 3 },
                    { alunoId: 2, presencas: 54, faltas: 6 },
                    { alunoId: 3, presencas: 51, faltas: 9 },
                    { alunoId: 4, presencas: 57, faltas: 3 },
                    { alunoId: 5, presencas: 42, faltas: 18 },
                    { alunoId: 6, presencas: 54, faltas: 6 },
                    { alunoId: 7, presencas: 54, faltas: 6 },
                    { alunoId: 8, presencas: 60, faltas: 0 },
                    { alunoId: 9, presencas: 51, faltas: 9 },
                    { alunoId: 10, presencas: 57, faltas: 3 }
                ]
            },
            "trimestre-2": {
                totalAulas: 60,
                alunosFrequencia: [
                    { alunoId: 1, presencas: 58, faltas: 2 },
                    { alunoId: 2, presencas: 55, faltas: 5 },
                    { alunoId: 3, presencas: 52, faltas: 8 },
                    { alunoId: 4, presencas: 58, faltas: 2 },
                    { alunoId: 5, presencas: 44, faltas: 16 },
                    { alunoId: 6, presencas: 55, faltas: 5 },
                    { alunoId: 7, presencas: 55, faltas: 5 },
                    { alunoId: 8, presencas: 60, faltas: 0 },
                    { alunoId: 9, presencas: 52, faltas: 8 },
                    { alunoId: 10, presencas: 58, faltas: 2 }
                ]
            },
            "trimestre-3": {
                totalAulas: 60,
                alunosFrequencia: [
                    { alunoId: 1, presencas: 56, faltas: 4 },
                    { alunoId: 2, presencas: 53, faltas: 7 },
                    { alunoId: 3, presencas: 50, faltas: 10 },
                    { alunoId: 4, presencas: 56, faltas: 4 },
                    { alunoId: 5, presencas: 40, faltas: 20 },
                    { alunoId: 6, presencas: 53, faltas: 7 },
                    { alunoId: 7, presencas: 53, faltas: 7 },
                    { alunoId: 8, presencas: 59, faltas: 1 },
                    { alunoId: 9, presencas: 50, faltas: 10 },
                    { alunoId: 10, presencas: 56, faltas: 4 }
                ]
            }
        }
    };

    // ========== ELEMENTOS DOM ==========
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    // ========== INICIALIZAÇÃO ==========
    function init() {
        // Configurar dados da turma baseado nos parâmetros URL
        atualizarDadosTurma();
        configurarBotaoVoltar();
        
        // Resto da inicialização
        verificarSidebar();
        setupNavigation();
        renderDashboard();
        renderGradesTable();
        renderAttendanceList();
        setupEventListeners();
        
        // Renderizar tabela de frequência após um delay para garantir DOM
        setTimeout(() => {
            console.log('Inicializando tabela de frequência');
            renderAttendanceTable();
        }, 200);
        
        // Observer para monitorar mudanças no sidebar
        const observer = new MutationObserver(verificarSidebar);
        if (sidebar) {
            observer.observe(sidebar, { attributes: true });
        }
    }
    
    function verificarSidebar() {
        if (sidebar && sidebar.classList.contains('active')) {
            body.classList.add('sidebar-active');
        } else {
            body.classList.remove('sidebar-active');
        }
    }
    
    // ========== NAVEGAÇÃO ENTRE ABAS ==========
    function setupNavigation() {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetTab = this.getAttribute('data-tab');
                showTab(targetTab);
                
                // Atualizar navegação ativa
                tabItems.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Botões que navegam para outras abas
        document.querySelectorAll('[data-tab]').forEach(btn => {
            if (!btn.classList.contains('tab-item')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetTab = this.getAttribute('data-tab');
                    showTab(targetTab);
                    
                    // Atualizar navegação ativa
                    tabItems.forEach(t => t.classList.remove('active'));
                    const targetTabItem = document.querySelector(`[data-tab="${targetTab}"].tab-item`);
                    if (targetTabItem) targetTabItem.classList.add('active');
                });
            }
        });
    }
    
    function showTab(tabName) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(`${tabName}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
            
            // Renderizar conteúdo específico quando necessário
            if (tabName === 'relatorios') {
                setTimeout(renderAdvancedCharts, 100);
            } else if (tabName === 'frequencia') {
                console.log('Abrindo aba de frequência');
                setTimeout(() => {
                    renderAttendanceTable();
                }, 100);
            }
        }
    }
    
    // ========== RENDERIZAÇÃO DO DASHBOARD ==========
    function renderDashboard() {
        renderStudentsQuickList();
        renderPerformanceChart();
    }
    
    function renderStudentsQuickList() {
        const container = document.getElementById('students-quick-list');
        if (!container) return;
        
        // Mostrar apenas os primeiros 5 alunos
        const topStudents = turmaData.alunos.slice(0, 5);
        
        container.innerHTML = topStudents.map(aluno => `
            <div class="student-quick-item">
                <div class="student-quick-info">
                    <div class="student-avatar">${aluno.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                    <div class="student-quick-details">
                        <h4>${aluno.nome}</h4>
                        <p>Nº ${aluno.numero} • ${aluno.matricula}</p>
                    </div>
                </div>
                <div class="student-quick-stats">
                    <div class="quick-stat">
                        <span class="quick-stat-value">${aluno.notaFinal}</span>
                        <span class="quick-stat-label">Nota</span>
                    </div>
                    <div class="quick-stat">
                        <span class="quick-stat-value">${aluno.frequencia}%</span>
                        <span class="quick-stat-label">Freq.</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    function renderPerformanceChart() {
        const canvas = document.getElementById('performanceCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Dados para o gráfico por ÁREAS
        const areas = ['Matemática', 'Ciências da\nNatureza', 'Ciências\nHumanas', 'Linguagens'];
        const medias = [8.7, 8.1, 7.9, 8.3]; // Médias fictícias por área
        const colors = ['#4a6fdc', '#17a2b8', '#28a745', '#ffc107'];
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configurações do gráfico
        const padding = 60; // Aumentado para mais espaço
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2) - 20; // Espaço extra para labels
        const barWidth = chartWidth / areas.length;
        const maxValue = 10;
        
        // Desenhar eixos
        ctx.strokeStyle = '#dee2e6';
        ctx.lineWidth = 1;
        
        // Eixo Y
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding - 20);
        ctx.stroke();
        
        // Eixo X
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding - 20);
        ctx.lineTo(canvas.width - padding, canvas.height - padding - 20);
        ctx.stroke();
        
        // Desenhar barras
        medias.forEach((media, index) => {
            const barHeight = (media / maxValue) * chartHeight;
            const x = padding + (index * barWidth) + (barWidth * 0.25); // Mais espaço nas laterais
            const y = canvas.height - padding - 20 - barHeight;
            const width = barWidth * 0.5; // Barras mais estreitas para mais espaço
            
            // Barra
            ctx.fillStyle = colors[index];
            ctx.fillRect(x, y, width, barHeight);
            
            // Valor da média
            ctx.fillStyle = '#343a40';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(media.toString(), x + width/2, y - 5);
            
            // Nome da área (com quebra de linha)
            const areaName = areas[index];
            const lines = areaName.split('\n');
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#6b7280';
            
            lines.forEach((line, lineIndex) => {
                ctx.fillText(line, x + width/2, canvas.height - padding + 5 + (lineIndex * 12));
            });
        });
        
        // Título do gráfico
        ctx.fillStyle = '#343a40';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Média por Área de Conhecimento', canvas.width/2, 20);
        
        // Escala Y
        ctx.fillStyle = '#6c757d';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        for (let i = 0; i <= 10; i += 2) {
            const y = canvas.height - padding - 20 - (i / maxValue) * chartHeight;
            ctx.fillText(i.toString(), padding - 5, y + 3);
        }
    }
    
    // ========== RENDERIZAÇÃO DA SEÇÃO DE ALUNOS (ANTES NOTAS) ==========
    function renderGradesTable() {
        const tableBody = document.getElementById('grades-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = turmaData.alunos.map(aluno => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="student-avatar" style="width: 30px; height: 30px; font-size: 0.8rem;">
                            ${aluno.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                            <strong>${aluno.nome}</strong><br>
                            <small>Nº ${aluno.numero}</small>
                        </div>
                    </div>
                </td>
                <td><strong>${aluno.matricula}</strong></td>
                <td>
                    <input type="number" class="grade-input" min="0" max="10" step="0.1" 
                           value="${aluno.notaFinal}" data-student="${aluno.id}">
                </td>
                <td><strong>${aluno.frequencia}%</strong></td>
                <td>
                    <span class="grade-status ${getGradeStatus(aluno.notaFinal)}">
                        ${getGradeStatusText(aluno.notaFinal)}
                    </span>
                </td>
                <td>
                    <button class="btn-outline" onclick="viewStudentReport(${aluno.id})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                        <span class="material-symbols-outlined" style="font-size: 1rem;">visibility</span>
                        Ver Relatório
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Configurar event listeners para os inputs de nota
        setupGradeInputs();
    }
    
    function setupGradeInputs() {
        const gradeInputs = document.querySelectorAll('.grade-input');
        
        gradeInputs.forEach(input => {
            input.addEventListener('input', function() {
                const studentId = parseInt(this.getAttribute('data-student'));
                const newGrade = parseFloat(this.value);
                const row = this.closest('tr');
                const statusCell = row.querySelector('.grade-status');
                
                // Atualizar status visualmente
                if (!isNaN(newGrade)) {
                    statusCell.className = `grade-status ${getGradeStatus(newGrade)}`;
                    statusCell.textContent = getGradeStatusText(newGrade);
                    
                    // Atualizar dados internos
                    const student = turmaData.alunos.find(a => a.id === studentId);
                    if (student) {
                        student.notaFinal = newGrade;
                    }
                }
            });
            
            input.addEventListener('blur', function() {
                // Validar valor ao sair do campo
                const value = parseFloat(this.value);
                if (isNaN(value) || value < 0) {
                    this.value = 0;
                } else if (value > 10) {
                    this.value = 10;
                }
                this.dispatchEvent(new Event('input'));
            });
        });
    }
    
    function getGradeStatus(nota) {
        if (nota >= 7) return 'aprovado';
        if (nota >= 5) return 'recuperacao';
        return 'reprovado';
    }
    
    function getGradeStatusText(nota) {
        if (nota >= 7) return 'Aprovado';
        if (nota >= 5) return 'Recuperação';
        return 'Reprovado';
    }
    
    // ========== RENDERIZAÇÃO DA SEÇÃO DE FREQUÊNCIA (CORRIGIDA) ==========
    function renderAttendanceTable() {
        const tableBody = document.getElementById('attendance-table-body');
        if (!tableBody) {
            console.log('Elemento attendance-table-body não encontrado');
            return;
        }
        
        // Determinar qual conjunto de dados usar baseado no trimestre selecionado
        const trimesterSelect = document.getElementById('trimester-select');
        let trimestreValue = trimesterSelect?.value || '1';
        
        const areaFiltro = document.getElementById('subject-filter')?.value || 'todas';
        
        console.log('Renderizando tabela de frequência - Trimestre:', trimestreValue, 'Área:', areaFiltro);
        
        const linhasHTML = turmaData.alunos.map(aluno => {
            let presencas = 0;
            let faltas = 0;
            let totalAulas = 0;
            
            if (trimestreValue === 'todos') {
                // Calcular dados de todos os trimestres
                const periodos = ['trimestre-1', 'trimestre-2', 'trimestre-3'];
                let totalPresencas = 0;
                let totalFaltas = 0;
                let totalDeTotalAulas = 0;
                
                periodos.forEach(periodoKey => {
                    const dadosFrequencia = turmaData.frequenciaDetalhada[periodoKey];
                    if (dadosFrequencia) {
                        const frequenciaAluno = dadosFrequencia.alunosFrequencia.find(f => f.alunoId === aluno.id);
                        if (frequenciaAluno) {
                            totalPresencas += frequenciaAluno.presencas;
                            totalFaltas += frequenciaAluno.faltas;
                        } else {
                            // Dados padrão se não encontrar
                            const presencasPadrao = Math.floor(dadosFrequencia.totalAulas * 0.85);
                            totalPresencas += presencasPadrao;
                            totalFaltas += (dadosFrequencia.totalAulas - presencasPadrao);
                        }
                        totalDeTotalAulas += dadosFrequencia.totalAulas;
                    }
                });
                
                presencas = totalPresencas;
                faltas = totalFaltas;
                totalAulas = totalDeTotalAulas;
            } else {
                // Usar dados de um trimestre específico
                let periodoKey = '2025-05'; // padrão
                
                if (trimestreValue === '1') periodoKey = 'trimestre-1';
                else if (trimestreValue === '2') periodoKey = 'trimestre-2';
                else if (trimestreValue === '3') periodoKey = 'trimestre-3';
                
                const dadosFrequencia = turmaData.frequenciaDetalhada[periodoKey];
                
                if (!dadosFrequencia) {
                    console.log('Dados de frequência não encontrados para período:', periodoKey);
                    return '';
                }
                
                const frequenciaAluno = dadosFrequencia.alunosFrequencia.find(f => f.alunoId === aluno.id);
                totalAulas = dadosFrequencia.totalAulas;
                
                if (frequenciaAluno) {
                    presencas = frequenciaAluno.presencas;
                    faltas = frequenciaAluno.faltas;
                } else {
                    // Dados padrão caso não encontre o aluno
                    presencas = Math.floor(totalAulas * 0.85); // 85% de presença padrão
                    faltas = totalAulas - presencas;
                }
            }
            
            // Simular variação por área de conhecimento
            if (areaFiltro !== 'todas') {
                const seed = aluno.id + areaFiltro.charCodeAt(0); // seed baseado no aluno e área
                const variacao = (seed % 20 - 10) / 100; // variação de -10% a +10%
                presencas = Math.max(0, Math.min(totalAulas, Math.round(presencas * (1 + variacao))));
                faltas = totalAulas - presencas;
            }
            
            const percentual = Math.round((presencas / totalAulas) * 100);
            
            let statusFreq = 'normal';
            if (percentual < 75) statusFreq = 'critico';
            else if (percentual < 85) statusFreq = 'atencao';
            
            return `
                <tr data-frequency="${percentual}" data-status="${statusFreq}">
                    <td>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div class="student-avatar" style="width: 30px; height: 30px; font-size: 0.8rem;">
                                ${aluno.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div>
                                <strong>${aluno.nome}</strong><br>
                                <small>Nº ${aluno.numero} • ${aluno.matricula}</small>
                            </div>
                        </div>
                    </td>
                    <td>${totalAulas}</td>
                    <td>${presencas}</td>
                    <td>${faltas}</td>
                    <td><strong>${percentual}%</strong></td>
                    <td>
                        <span class="student-status ${statusFreq === 'normal' ? 'aprovado' : statusFreq === 'atencao' ? 'risco' : 'reprovado'}">
                            ${statusFreq === 'normal' ? 'Normal' : statusFreq === 'atencao' ? 'Atenção' : 'Crítico'}
                        </span>
                    </td>
                </tr>
            `;
        });
        
        // Filtrar linhas vazias
        const linhasValidas = linhasHTML.filter(linha => linha.trim() !== '');
        
        tableBody.innerHTML = linhasValidas.join('');
        console.log('Tabela de frequência renderizada com', linhasValidas.length, 'linhas');
        
        // Aplicar filtros se existirem
        setTimeout(filterAttendanceTable, 100);
    }
    
    // ========== FILTROS DE FREQUÊNCIA (CORRIGIDOS) ==========
    function setupPeriodFilters() {
        const subjectFilter = document.getElementById('subject-filter');
        const trimesterSelect = document.getElementById('trimester-select');
        const attendanceSearch = document.getElementById('attendance-search');
        const attendanceOrderSelect = document.getElementById('attendance-order-select');
        const attendanceAnalysisFilter = document.getElementById('attendance-analysis-filter');
        
        if (subjectFilter) {
            subjectFilter.addEventListener('change', function() {
                console.log('Filtro de matéria alterado para:', this.value);
                renderAttendanceTable();
            });
        }
        
        if (trimesterSelect) {
            trimesterSelect.addEventListener('change', function() {
                console.log('Trimestre alterado para:', this.value);
                renderAttendanceTable();
            });
        }
        
        if (attendanceSearch) {
            attendanceSearch.addEventListener('input', function() {
                console.log('Busca alterada para:', this.value);
                filterAttendanceTable();
            });
        }
        
        if (attendanceOrderSelect) {
            attendanceOrderSelect.addEventListener('change', function() {
                console.log('Ordenação alterada para:', this.value);
                filterAttendanceTable();
            });
        }
        
        if (attendanceAnalysisFilter) {
            attendanceAnalysisFilter.addEventListener('change', function() {
                console.log('Filtro de análise alterado para:', this.value);
                filterAttendanceTable();
            });
        }
    }
    
    function filterAttendanceTable() {
        // Só executar se a tabela já foi renderizada
        const tableBody = document.getElementById('attendance-table-body');
        if (!tableBody || !tableBody.children.length) {
            console.log('Tabela não renderizada ainda, pulando filtro');
            return;
        }
        
        const searchTerm = document.getElementById('attendance-search')?.value.toLowerCase() || '';
        const orderBy = document.getElementById('attendance-order-select')?.value || 'nome';
        const statusFilter = document.getElementById('attendance-analysis-filter')?.value || 'todos';
        const tableRows = Array.from(document.querySelectorAll('#attendance-table-body tr'));
        
        console.log('Filtrando tabela:', { searchTerm, orderBy, statusFilter, totalRows: tableRows.length });
        
        // Filtrar por busca e status
        tableRows.forEach(row => {
            const studentName = row.querySelector('strong')?.textContent.toLowerCase() || '';
            const rowStatus = row.getAttribute('data-status') || '';
            
            const matchesSearch = studentName.includes(searchTerm);
            const matchesFilter = statusFilter === 'todos' || rowStatus === statusFilter;
            
            if (matchesSearch && matchesFilter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Ordenar
        const visibleRows = tableRows.filter(row => row.style.display !== 'none');
        const tbody = document.getElementById('attendance-table-body');
        
        visibleRows.sort((a, b) => {
            let valueA, valueB;
            
            try {
                switch(orderBy) {
                    case 'nome':
                        valueA = a.querySelector('strong')?.textContent || '';
                        valueB = b.querySelector('strong')?.textContent || '';
                        return valueA.localeCompare(valueB);
                    case 'nome-desc':
                        valueA = a.querySelector('strong')?.textContent || '';
                        valueB = b.querySelector('strong')?.textContent || '';
                        return valueB.localeCompare(valueA);
                    case 'frequencia':
                        valueA = parseInt(a.getAttribute('data-frequency')) || 0;
                        valueB = parseInt(b.getAttribute('data-frequency')) || 0;
                        return valueB - valueA; // maior para menor
                    case 'frequencia-desc':
                        valueA = parseInt(a.getAttribute('data-frequency')) || 0;
                        valueB = parseInt(b.getAttribute('data-frequency')) || 0;
                        return valueA - valueB; // menor para maior
                    default:
                        return 0;
                }
            } catch (error) {
                console.error('Erro na ordenação:', error);
                return 0;
            }
        });
        
        // Re-anexar as linhas ordenadas
        visibleRows.forEach(row => tbody.appendChild(row));
        
        console.log('Filtro aplicado. Linhas visíveis:', visibleRows.length);
    }
    
    // ========== RENDERIZAÇÃO DA LISTA DE CHAMADA ==========
    function renderAttendanceList() {
        const container = document.getElementById('attendance-grid');
        if (!container) return;
        
        container.innerHTML = turmaData.alunos.map(aluno => `
            <div class="attendance-item">
                <div class="attendance-student-info">
                    <div class="attendance-avatar">${aluno.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                    <div>
                        <strong>${aluno.nome}</strong><br>
                        <small>Nº ${aluno.numero} • ${aluno.matricula}</small>
                    </div>
                </div>
                <div class="attendance-controls-item">
                    <button class="attendance-btn present" data-student="${aluno.id}" data-status="present">
                        <span class="material-symbols-outlined">check</span>
                        Presente
                    </button>
                    <button class="attendance-btn absent" data-student="${aluno.id}" data-status="absent">
                        <span class="material-symbols-outlined">close</span>
                        Falta
                    </button>
                </div>
            </div>
        `).join('');
        
        // Configurar botões de presença
        setupAttendanceButtons();
        updateAttendanceSummary();
    }
    
    function setupAttendanceButtons() {
        const attendanceBtns = document.querySelectorAll('.attendance-btn');
        
        attendanceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = this.getAttribute('data-student');
                const status = this.getAttribute('data-status');
                
                // Remover active de todos os botões do mesmo aluno
                const studentBtns = document.querySelectorAll(`[data-student="${studentId}"]`);
                studentBtns.forEach(b => b.classList.remove('active'));
                
                // Adicionar active no botão clicado
                this.classList.add('active');
                
                updateAttendanceSummary();
            });
        });
    }
    
    function updateAttendanceSummary() {
        const presentCount = document.querySelectorAll('.attendance-btn.present.active').length;
        const absentCount = document.querySelectorAll('.attendance-btn.absent.active').length;
        
        const presentCountEl = document.getElementById('present-count');
        const absentCountEl = document.getElementById('absent-count');
        
        if (presentCountEl) presentCountEl.textContent = presentCount;
        if (absentCountEl) absentCountEl.textContent = absentCount;
    }
    
    // ========== EVENT LISTENERS ==========
    function setupEventListeners() {
        // Configurar filtros e seletores de período
        setupPeriodFilters();
        
        // Filtros da seção de alunos
        setupStudentFilters();
        
        // Botões de ação
        setupActionButtons();
        
        // Popups
        setupPopups();
        
        // Lista de chamada - marcar todos presentes
        const markAllPresentBtn = document.getElementById('mark-all-present');
        if (markAllPresentBtn) {
            markAllPresentBtn.addEventListener('click', function() {
                document.querySelectorAll('.attendance-btn.present').forEach(btn => {
                    btn.click();
                });
            });
        }
        
        // Data de hoje na lista de chamada
        const attendanceDateInput = document.getElementById('attendance-date');
        if (attendanceDateInput) {
            const today = new Date().toISOString().split('T')[0];
            attendanceDateInput.value = today;
        }
    }
    
    function setupStudentFilters() {
        const searchInput = document.getElementById('student-search');
        const orderSelect = document.getElementById('order-select');
        const analysisFilter = document.getElementById('analysis-filter');
        
        if (searchInput) {
            searchInput.addEventListener('input', filterStudents);
        }
        
        if (orderSelect) {
            orderSelect.addEventListener('change', filterStudents);
        }
        
        if (analysisFilter) {
            analysisFilter.addEventListener('change', filterStudents);
        }
    }
    
    function filterStudents() {
        const searchTerm = document.getElementById('student-search')?.value.toLowerCase() || '';
        const orderBy = document.getElementById('order-select')?.value || 'nome';
        const analysisFilter = document.getElementById('analysis-filter')?.value || 'todos';
        const tableRows = Array.from(document.querySelectorAll('#grades-table-body tr'));
        
        // Filtrar por busca e análise
        tableRows.forEach(row => {
            const studentName = row.querySelector('strong').textContent.toLowerCase();
            const gradeInput = row.querySelector('.grade-input');
            const grade = parseFloat(gradeInput.value);
            
            let studentStatus = 'aprovado';
            if (grade < 5) studentStatus = 'reprovado';
            else if (grade < 7) studentStatus = 'risco';
            
            const matchesSearch = studentName.includes(searchTerm);
            const matchesFilter = analysisFilter === 'todos' || studentStatus === analysisFilter;
            
            if (matchesSearch && matchesFilter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Ordenar
        const visibleRows = tableRows.filter(row => row.style.display !== 'none');
        const tbody = document.getElementById('grades-table-body');
        
        visibleRows.sort((a, b) => {
            let valueA, valueB;
            
            switch(orderBy) {
                case 'nome':
                    valueA = a.querySelector('strong').textContent;
                    valueB = b.querySelector('strong').textContent;
                    return valueA.localeCompare(valueB);
                case 'nome-desc':
                    valueA = a.querySelector('strong').textContent;
                    valueB = b.querySelector('strong').textContent;
                    return valueB.localeCompare(valueA);
                case 'desempenho':
                    valueA = parseFloat(a.querySelector('.grade-input').value);
                    valueB = parseFloat(b.querySelector('.grade-input').value);
                    return valueB - valueA; // maior para menor
                case 'desempenho-desc':
                    valueA = parseFloat(a.querySelector('.grade-input').value);
                    valueB = parseFloat(b.querySelector('.grade-input').value);
                    return valueA - valueB; // menor para maior
                default:
                    return 0;
            }
        });
        
        // Re-anexar as linhas ordenadas
        visibleRows.forEach(row => tbody.appendChild(row));
    }
    
    // ========== CONFIGURAÇÃO DOS BOTÕES DE AÇÃO (CORRIGIDA) ==========
    function setupActionButtons() {
        console.log('Configurando botões de ação...');
        
        // Botão de ver calendário da turma - CORRIGIDO
        const viewCalendarBtn = document.getElementById('view-calendar-btn');
        console.log('Botão view-calendar-btn encontrado:', !!viewCalendarBtn);
        
        if (viewCalendarBtn) {
            viewCalendarBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir comportamento padrão
                console.log('Clique no botão calendário detectado!');
                
                // Obter parâmetros atuais da turma
                const params = getURLParams();
                console.log('Parâmetros da turma:', params);
                
                // Criar parâmetros para o calendário
                const calendarParams = new URLSearchParams({
                    sala: params.sala,
                    ano: params.ano,
                    turma: params.turma,
                    view: 'turma' // Indicar que é visualização específica da turma
                });
                
                const calendarUrl = `calendario.html?${calendarParams.toString()}`;
                console.log(`Navegando para calendário da turma: ${params.ano}º ${params.turma} - Sala ${params.sala}`);
                console.log('URL do calendário:', calendarUrl);
                
                // Redirecionar para o calendário com os parâmetros da turma
                window.location.href = calendarUrl;
            });
        } else {
            console.error('Botão view-calendar-btn não encontrado no DOM');
        }

        // Botões de exportação
        const exportReportBtn = document.getElementById('export-report-btn');
        const exportDetailedReportBtn = document.getElementById('export-detailed-report-btn');
        const exportAttendanceBtn = document.getElementById('export-attendance-btn');
        
        [exportReportBtn, exportDetailedReportBtn, exportAttendanceBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Gerando...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Pronto!';
                        this.style.backgroundColor = '#22c55e';
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.style.backgroundColor = '';
                            this.disabled = false;
                            alert('Relatório exportado com sucesso!');
                        }, 2000);
                    }, 2000);
                });
            }
        });
        
        // Outros botões de ação
        const actionButtons = [
            { id: 'save-draft-btn', message: 'Alterações salvas com sucesso!' },
            { id: 'submit-grades-btn', message: 'Notas enviadas para aprovação!', confirm: true }
        ];
        
        actionButtons.forEach(btnConfig => {
            const btn = document.getElementById(btnConfig.id);
            if (btn) {
                btn.addEventListener('click', function() {
                    if (btnConfig.confirm) {
                        if (confirm('Deseja confirmar esta ação? Ela não poderá ser desfeita.')) {
                            alert(btnConfig.message);
                        }
                    } else {
                        alert(btnConfig.message);
                    }
                });
            }
        });
    }
    
    function setupPopups() {
        // Fechar popups
        document.querySelectorAll('.close-popup, .btn-cancel').forEach(btn => {
            btn.addEventListener('click', function() {
                const popup = this.closest('.popup-overlay');
                if (popup) popup.style.display = 'none';
            });
        });
        
        // Fechar popup clicando fora
        document.querySelectorAll('.popup-overlay').forEach(popup => {
            popup.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        });
        
        // Form de nova avaliação
        const newAssessmentForm = document.getElementById('new-assessment-form');
        if (newAssessmentForm) {
            newAssessmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('assessment-name').value;
                const subject = document.getElementById('assessment-subject').value;
                const weight = document.getElementById('assessment-weight').value;
                const date = document.getElementById('assessment-date').value;
                
                if (!name || !subject) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }
                
                alert('Nova avaliação criada com sucesso!');
                document.getElementById('new-assessment-popup').style.display = 'none';
                this.reset();
            });
        }
    }
    
    // ========== RENDERIZAÇÃO DOS GRÁFICOS AVANÇADOS (RELATÓRIOS) ==========
    function renderAdvancedCharts() {
        renderEvolutionChart();
        renderDistributionChart();
        renderCorrelationChart();
        renderComparisonChart();
    }
    
    function renderEvolutionChart() {
        const canvas = document.getElementById('evolutionChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Dados fictícios de evolução por bimestre
        const bimestres = ['1º Bim', '2º Bim', '3º Bim', '4º Bim'];
        const medias = [7.8, 8.1, 8.4, 8.6];
        
        drawLineChart(ctx, canvas, bimestres, medias, 'Evolução das Médias por Bimestre');
    }
    
    function renderDistributionChart() {
        const canvas = document.getElementById('distributionChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Distribuição de notas
        const ranges = ['0-4', '4-6', '6-8', '8-10'];
        const counts = [2, 8, 20, 12];
        const colors = ['#ef4444', '#f59e0b', '#06b6d4', '#22c55e'];
        
        drawBarChart(ctx, canvas, ranges, counts, colors, 'Distribuição de Notas');
    }
    
    function renderCorrelationChart() {
        const canvas = document.getElementById('correlationChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Correlação frequência vs desempenho
        const students = turmaData.alunos;
        drawScatterPlot(ctx, canvas, students, 'Frequência vs Desempenho');
    }
    
    function renderComparisonChart() {
        const canvas = document.getElementById('comparisonChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Comparação com outras turmas
        const turmas = ['3º A', '3º B', '3º O', '3º C'];
        const medias = [7.9, 8.1, 8.4, 7.6];
        const colors = ['#6b7280', '#6b7280', '#4a6fdc', '#6b7280'];
        
        drawBarChart(ctx, canvas, turmas, medias, colors, 'Comparativo entre Turmas');
    }
    
    // ========== FUNÇÕES AUXILIARES PARA GRÁFICOS ==========
    function drawLineChart(ctx, canvas, labels, data, title) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        const maxValue = Math.max(...data) + 1;
        
        // Eixos
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Linha
        ctx.strokeStyle = '#4a6fdc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = canvas.height - padding - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Pontos
            ctx.fillStyle = '#4a6fdc';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Labels
            ctx.fillStyle = '#374151';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x, canvas.height - padding + 15);
            ctx.fillText(value.toString(), x, y - 10);
        });
        
        ctx.stroke();
        
        // Título
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width/2, 20);
    }
    
    function drawBarChart(ctx, canvas, labels, data, colors, title) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        const barWidth = chartWidth / labels.length;
        const maxValue = Math.max(...data) + 1;
        
        // Eixos
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Barras
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + (index * barWidth) + (barWidth * 0.2);
            const y = canvas.height - padding - barHeight;
            const width = barWidth * 0.6;
            
            ctx.fillStyle = colors[index] || colors[0];
            ctx.fillRect(x, y, width, barHeight);
            
            // Valores
            ctx.fillStyle = '#374151';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), x + width/2, y - 5);
            ctx.fillText(labels[index], x + width/2, canvas.height - padding + 15);
        });
        
        // Título
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width/2, 20);
    }
    
    function drawScatterPlot(ctx, canvas, students, title) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 40;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        
        // Eixos
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Pontos
        students.forEach(student => {
            const x = padding + (student.frequencia / 100) * chartWidth;
            const y = canvas.height - padding - (student.notaFinal / 10) * chartHeight;
            
            ctx.fillStyle = student.status === 'aprovado' ? '#22c55e' : 
                           student.status === 'risco' ? '#f59e0b' : '#ef4444';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Labels dos eixos
        ctx.fillStyle = '#374151';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Frequência (%)', canvas.width/2, canvas.height - 5);
        
        ctx.save();
        ctx.translate(15, canvas.height/2);
        ctx.rotate(-Math.PI/2);
        ctx.fillText('Nota Final', 0, 0);
        ctx.restore();
        
        // Título
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width/2, 20);
    }
    
    // ========== FUNÇÕES GLOBAIS ==========
    window.viewStudentReport = function(studentId) {
        // Redireciona sempre para relatorio.html
        window.location.href = '../pages/relatorio.html';
    };

    
    // ========== FUNÇÃO DE DEBUG ==========
    window.debugAttendance = function() {
        console.log('=== DEBUG FREQUÊNCIA ===');
        console.log('1. Elemento da tabela existe?', !!document.getElementById('attendance-table-body'));
        console.log('2. Dados de frequência disponíveis:', Object.keys(turmaData.frequenciaDetalhada));
        console.log('3. Número de alunos:', turmaData.alunos.length);
        console.log('4. Aba de frequência ativa?', document.getElementById('frequencia-content')?.classList.contains('active'));
        
        const trimesterSelect = document.getElementById('trimester-select');
        const selectedTrimester = trimesterSelect?.value || 'não encontrado';
        
        console.log('5. Filtros atuais:', {
            subjectFilter: document.getElementById('subject-filter')?.value || 'todas',
            trimesterSelect: selectedTrimester,
            attendanceSearch: document.getElementById('attendance-search')?.value || '',
            orderSelect: document.getElementById('attendance-order-select')?.value || 'nome',
            analysisFilter: document.getElementById('attendance-analysis-filter')?.value || 'todos'
        });
        
        // Mostrar exemplo de cálculo para "todos os trimestres"
        if (selectedTrimester === 'todos') {
            console.log('6. Calculando dados consolidados para todos os trimestres...');
            const primeiroAluno = turmaData.alunos[0];
            let totalPresencas = 0, totalFaltas = 0, totalAulas = 0;
            
            ['trimestre-1', 'trimestre-2', 'trimestre-3'].forEach(periodo => {
                const dados = turmaData.frequenciaDetalhada[periodo];
                if (dados) {
                    const freqAluno = dados.alunosFrequencia.find(f => f.alunoId === primeiroAluno.id);
                    if (freqAluno) {
                        totalPresencas += freqAluno.presencas;
                        totalFaltas += freqAluno.faltas;
                    }
                    totalAulas += dados.totalAulas;
                }
            });
            
            console.log(`   Exemplo (${primeiroAluno.nome}):`, {
                totalAulas,
                totalPresencas,
                totalFaltas,
                percentual: Math.round((totalPresencas / totalAulas) * 100) + '%'
            });
        }
        
        // Forçar renderização
        renderAttendanceTable();
    };
    
    // ========== FUNÇÃO DE DEBUG PARA BOTÃO CALENDÁRIO ==========
    window.debugCalendar = function() {
        console.log('=== DEBUG BOTÃO CALENDÁRIO ===');
        console.log('1. Botão existe?', !!document.getElementById('view-calendar-btn'));
        console.log('2. Parâmetros URL:', getURLParams());
        console.log('3. Event listeners do botão:', document.getElementById('view-calendar-btn'));
        
        // Testar clique programático
        const btn = document.getElementById('view-calendar-btn');
        if (btn) {
            console.log('4. Testando clique programático...');
            btn.click();
        }
    };
    
    // Chamar inicialização
    init();
    
    console.log('Dashboard da turma inicializado com sucesso!');
    console.log('Para debug da tabela de frequência, execute: debugAttendance()');
    console.log('Para debug do botão calendário, execute: debugCalendar()');
});