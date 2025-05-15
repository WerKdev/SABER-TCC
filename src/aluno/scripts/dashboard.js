// Portal do Aluno - Script com melhorias de responsividade
document.addEventListener("DOMContentLoaded", function() {

    // Obter opções responsivas com base no tamanho da tela
    function getResponsiveOptions(defaultOptions = {}) {
        const screenWidth = window.innerWidth;
        
        // Definir tamanhos e configurações com base no tamanho da tela
        const fontSizes = {
            small: screenWidth < 576 ? 10 : 12,
            medium: screenWidth < 576 ? 12 : 14,
            large: screenWidth < 576 ? 14 : 16
        };
        
        const spacing = {
            padding: screenWidth < 576 ? 5 : 10,
            margin: screenWidth < 576 ? 8 : 15
        };
        
        const legendPosition = screenWidth < 576 ? 'bottom' : 'top';
        
        // Mesclar com opções padrão
        return {
            responsive: true,
            maintainAspectRatio: false,
            onResize: (chart, size) => {
                setTimeout(() => chart.update(), 0);
            },
            plugins: {
                legend: {
                    position: legendPosition,
                    align: 'center',
                    labels: {
                        boxWidth: screenWidth < 576 ? 8 : 12,
                        padding: spacing.padding,
                        font: {
                            size: fontSizes.small
                        }
                    }
                },
                tooltip: {
                    bodyFont: {
                        size: fontSizes.small
                    },
                    titleFont: {
                        size: fontSizes.medium
                    },
                    padding: spacing.padding,
                    displayColors: screenWidth >= 576
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: fontSizes.small
                        }
                    },
                    grid: {
                        display: screenWidth >= 576
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: fontSizes.small
                        }
                    }
                }
            }
        };
    }
    
    // ===== GRÁFICOS RESPONSIVOS =====
    // 1. Gráfico de Performance (Evolução de Notas)
    const performanceCtx = document.getElementById('performanceChart');
    
    if (performanceCtx) {
        // Opções específicas do gráfico
        const performanceOptions = {
            type: 'line',
            data: {
                labels: ['1° Trimestre', '2° Trimestre', '3° Trimestre'],
                datasets: [{
                    label: 'Minhas Notas',
                    data: [7.2, 7.5, 8.2],
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: isMobile ? 1.5 : 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Média da Turma',
                    data: [7.0, 7.2, 7.6],
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: isMobile ? 1.5 : 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                ...getResponsiveOptions(),
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 5,
                        max: 10,
                        ticks: {
                            stepSize: isMobile ? 2 : 1,
                            font: {
                                size: isMobile ? 10 : 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: isMobile ? 10 : 12
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function(tooltipItems) {
                                return tooltipItems[0].label;
                            },
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw.toFixed(1);
                            }
                        }
                    }
                }
            }
        };
        
        // Criar o gráfico
        performanceChart = new Chart(performanceCtx.getContext('2d'), performanceOptions);
        
        // Filtro de disciplinas para o gráfico de desempenho
        const performanceSubjectSelect = document.getElementById('performance-subject-select');
        
        // Dados de desempenho por disciplina
        const performanceDataBySubject = {
            'all': {
                student: [7.2, 7.5, 8.2],
                class: [7.0, 7.2, 7.6]
            },
            'math': {
                student: [6.8, 7.0, 7.5],
                class: [6.3, 6.5, 6.8]
            },
            'physics': {
                student: [6.2, 6.5, 7.0],
                class: [6.4, 6.7, 7.0]
            },
            'chemistry': {
                student: [7.0, 7.0, 7.5],
                class: [6.7, 6.8, 7.0]
            },
            'biology': {
                student: [7.6, 7.8, 8.2],
                class: [7.2, 7.3, 7.6]
            },
            'portuguese': {
                student: [8.2, 8.3, 8.5],
                class: [7.2, 7.2, 7.4]
            },
            'history': {
                    student: [8.6, 8.8, 9.2],
                    class: [7.3, 7.5, 7.7]
                },
                'geography': {
                    student: [8.0, 8.0, 8.3],
                    class: [7.1, 7.3, 7.5]
                }
            };
            
        // Adicionar event listener ao filtro
        if (performanceSubjectSelect) {
            performanceSubjectSelect.addEventListener('change', function() {
                const selectedSubject = this.value;
                const subjectData = performanceDataBySubject[selectedSubject] || performanceDataBySubject['all'];
                
                performanceChart.data.datasets[0].data = subjectData.student;
                performanceChart.data.datasets[1].data = subjectData.class;
                performanceChart.update();
            });
        }
    }
    
     // 2. Gráfico de Distribuição (Notas do Trimestre)
     const distributionCtx = document.getElementById('distributionChart');
    
     if (distributionCtx) {
         // Dados das notas por disciplina e trimestre
         const studentGradesByTerm = {
             'current': [7.5, 6.8, 8.5, 9.0, 7.2], // Matemática, Física, Português, História, Química
             'term1': [7.0, 6.3, 8.2, 8.6, 6.9],
             'term2': [7.3, 6.5, 8.4, 8.8, 7.0],
             'term3': [7.8, 7.2, 8.8, 9.2, 7.5]
         };
         
         // Labels para as disciplinas
         const disciplineLabels = ['Matemática', 'Física', 'Português', 'História', 'Química'];
         
         // Cores para cada disciplina
         const disciplineColors = [
             'rgba(59, 130, 246, 0.7)',  // Matemática - Azul
             'rgba(16, 185, 129, 0.7)',  // Física - Verde
             'rgba(245, 158, 11, 0.7)',  // Português - Laranja
             'rgba(139, 92, 246, 0.7)',  // História - Roxo
             'rgba(239, 68, 68, 0.7)'    // Química - Vermelho
         ];
         
         // Opções específicas do gráfico
         const distributionOptions = {
             type: 'bar',
             data: {
                 labels: disciplineLabels,
                 datasets: [{
                     label: 'Nota',
                     data: studentGradesByTerm['current'],
                     backgroundColor: disciplineColors,
                     borderWidth: 0,
                     borderRadius: isMobile ? 2 : 4,
                     maxBarThickness: 50
                 }]
             },
             options: {
                 ...getResponsiveOptions(),
                 scales: {
                     y: {
                         beginAtZero: false,
                         min: 5,
                         max: 10,
                         ticks: {
                             stepSize: isMobile ? 2 : 1,
                             font: {
                                 size: isMobile ? 10 : 12
                             }
                         }
                     },
                     x: {
                         ticks: {
                             font: {
                                 size: isMobile ? 9 : 11
                             },
                             maxRotation: isMobile ? 45 : 0,
                             minRotation: isMobile ? 45 : 0
                         }
                     }
                 },
                 plugins: {
                     tooltip: {
                         callbacks: {
                             title: function(tooltipItems) {
                                 return 'Disciplina: ' + tooltipItems[0].label;
                             },
                             label: function(context) {
                                 return 'Nota: ' + context.raw.toFixed(1);
                             }
                         }
                     }
                 }
             }
         };
         
         // Criar o gráfico
         distributionChart = new Chart(distributionCtx.getContext('2d'), distributionOptions);
         
         // Filtro para o período
         const distributionPeriodSelect = document.getElementById('distribution-period-select');
         
         // Atualização do gráfico com base no período selecionado
         function updateDistributionChart() {
             if (!distributionPeriodSelect) return;
             
             const selectedPeriod = distributionPeriodSelect.value;
             
             // Atualiza os dados
             distributionChart.data.datasets[0].data = studentGradesByTerm[selectedPeriod];
             
             // Atualiza o título
             distributionChart.data.datasets[0].label = 'Nota do ' + 
                 distributionPeriodSelect.options[distributionPeriodSelect.selectedIndex].text;
             
             // Atualiza o gráfico
             distributionChart.update();
         }
         
         // Adicionar evento ao filtro
         if (distributionPeriodSelect) {
             distributionPeriodSelect.addEventListener('change', updateDistributionChart);
         }
         
         // Adicionar linha de média mínima para aprovação (7.0)
         const addApprovalLine = function(chart) {
             if (!chart) return;
             
             const ctx = chart.ctx;
             const yAxis = chart.scales.y;
             const approvalLineY = yAxis.getPixelForValue(7.0);
             
             ctx.save();
             ctx.beginPath();
             ctx.setLineDash([5, 5]);
             ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
             ctx.lineWidth = 2;
             ctx.moveTo(yAxis.left, approvalLineY);
             ctx.lineTo(yAxis.right, approvalLineY);
             ctx.stroke();
             
             // Adicionar texto para a linha (só para telas maiores)
             if (window.innerWidth > 480) {
                 ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
                 ctx.font = (isMobile ? '10px' : '12px') + ' Arial';
                 ctx.fillText('Média para Aprovação (7.0)', yAxis.right - (isMobile ? 150 : 180), approvalLineY - 5);
             }
             ctx.restore();
         };
         
         // Adicionar plugin para desenhar a linha
         distributionChart.options.plugins.afterDraw = addApprovalLine;
     }
     
     // 3. Gráfico de Frequência
     const attendanceCtx = document.getElementById('attendanceChart');
     
     if (attendanceCtx) {
         // Opções específicas do gráfico
         const attendanceOptions = {
             type: 'bar',
             data: {
                 labels: ['Fevereiro', 'Março', 'Abril', 'Maio'],
                 datasets: [{
                     label: 'Minhas Presenças (%)',
                     data: [92, 95, 90, 93],
                     backgroundColor: 'rgba(59, 130, 246, 0.7)',
                     borderColor: 'rgba(59, 130, 246, 1)',
                     borderWidth: 1,
                     borderRadius: isMobile ? 2 : 4,
                     maxBarThickness: 40
                 }, {
                     label: 'Média da Turma (%)',
                     data: [90, 92, 88, 91],
                     backgroundColor: 'rgba(16, 185, 129, 0.7)',
                     borderColor: 'rgba(16, 185, 129, 1)',
                     borderWidth: 1,
                     borderRadius: isMobile ? 2 : 4,
                     maxBarThickness: 40
                 }]
             },
             options: {
                 ...getResponsiveOptions(),
                 scales: {
                     y: {
                         beginAtZero: false,
                         min: 70,
                         max: 100,
                         ticks: {
                             stepSize: isMobile ? 10 : 5,
                             font: {
                                 size: isMobile ? 10 : 12
                             }
                         }
                     },
                     x: {
                         ticks: {
                             font: {
                                 size: isMobile ? 10 : 12
                             }
                         }
                     }
                 },
                 plugins: {
                     tooltip: {
                         mode: 'index',
                         intersect: false
                     }
                 }
             }
         };
         
         // Criar o gráfico
         attendanceChart = new Chart(attendanceCtx.getContext('2d'), attendanceOptions);
         
         // Dados de frequência por disciplina
         const attendanceDataBySubject = {
             'all': {
                 student: [92, 95, 90, 93],
                 class: [90, 92, 88, 91]
             },
             'math': {
                 student: [90, 92, 88, 92],
                 class: [88, 90, 87, 89]
             },
             'physics': {
                 student: [88, 90, 85, 88],
                 class: [85, 88, 84, 87]
             },
             'chemistry': {
                 student: [85, 88, 82, 85],
                 class: [83, 86, 82, 84]
             },
             'biology': {
                 student: [95, 97, 93, 94],
                 class: [92, 94, 90, 92]
             },
             'portuguese': {
                 student: [98, 100, 95, 95],
                 class: [93, 95, 92, 94]
             },
             'history': {
                 student: [100, 100, 98, 98],
                 class: [95, 97, 94, 96]
             },
             'geography': {
                 student: [95, 98, 92, 94],
                 class: [92, 95, 90, 93]
             }
         };
         
         // Filtro de disciplinas
         const attendanceSubjectSelect = document.getElementById('attendance-subject-select');
         
         // Adicionar evento ao filtro
         if (attendanceSubjectSelect) {
             attendanceSubjectSelect.addEventListener('change', function() {
                 const selectedSubject = this.value;
                 const subjectData = attendanceDataBySubject[selectedSubject] || attendanceDataBySubject['all'];
                 
                 attendanceChart.data.datasets[0].data = subjectData.student;
                 attendanceChart.data.datasets[1].data = subjectData.class;
                 attendanceChart.update();
             });
         }
     }
     
     // 4. Gráfico Radar de Habilidades
     const skillsRadarCtx = document.getElementById('skillsRadarChart');
     
     if (skillsRadarCtx) {
         // Opções específicas do gráfico
         const skillsRadarOptions = {
             type: 'radar',
             data: {
                 labels: ['Escrita', 'Leitura', 'Matemática', 'Ciências', 'Oratória', 'Trabalho em Equipe', 'Resolução de Problemas'],
                 datasets: [{
                     label: 'Meu Desempenho',
                     data: [8.5, 9.0, 7.5, 8.0, 7.2, 8.5, 8.0],
                     backgroundColor: 'rgba(59, 130, 246, 0.2)',
                     borderColor: 'rgba(59, 130, 246, 1)',
                     borderWidth: isMobile ? 1.5 : 2,
                     pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                     pointBorderColor: '#fff',
                     pointHoverBackgroundColor: '#fff',
                     pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
                     pointRadius: isMobile ? 2 : 3,
                     pointHoverRadius: isMobile ? 3 : 4
                 }, {
                     label: 'Média da Turma',
                     data: [7.5, 7.8, 7.2, 7.5, 6.8, 7.5, 7.3],
                     backgroundColor: 'rgba(16, 185, 129, 0.2)',
                     borderColor: 'rgba(16, 185, 129, 1)',
                     borderWidth: isMobile ? 1.5 : 2,
                     pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                     pointBorderColor: '#fff',
                     pointHoverBackgroundColor: '#fff',
                     pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
                     pointRadius: isMobile ? 2 : 3,
                     pointHoverRadius: isMobile ? 3 : 4
                 }]
             },
             options: {
                 ...getResponsiveOptions(),
                 scales: {
                     r: {
                         angleLines: {
                             display: true,
                             color: 'rgba(0, 0, 0, 0.1)'
                         },
                         grid: {
                             color: 'rgba(0, 0, 0, 0.1)'
                         },
                         pointLabels: {
                             font: {
                                 size: isMobile ? 9 : 11
                             }
                         },
                         suggestedMin: 0,
                         suggestedMax: 10,
                         ticks: {
                             stepSize: 2,
                             backdropPadding: isMobile ? 2 : 5,
                             font: {
                                 size: isMobile ? 8 : 10
                             }
                         }
                     }
                 },
                 plugins: {
                     tooltip: {
                         callbacks: {
                             label: function(context) {
                                 return context.dataset.label + ': ' + context.raw + '/10';
                             }
                         }
                     }
                 }
             }
         };
         
         // Criar o gráfico
         skillsRadarChart = new Chart(skillsRadarCtx.getContext('2d'), skillsRadarOptions);
     }
     
     // ===== DADOS E TABELA DE DESEMPENHO POR DISCIPLINA =====
     // Dados de desempenho por disciplina e trimestre
     const performanceDataByTerm = {
         'all': {
             'matematica': { nota: 7.5, media: 6.8, frequencia: '90%', status: 'Bom', atividades: '25/30' },
             'fisica': { nota: 6.8, media: 7.0, frequencia: '88%', status: 'Regular', atividades: '22/28' },
             'portugues': { nota: 8.5, media: 7.2, frequencia: '95%', status: 'Excelente', atividades: '30/32' },
             'historia': { nota: 9.0, media: 7.6, frequencia: '98%', status: 'Excelente', atividades: '28/28' },
             'quimica': { nota: 7.2, media: 6.8, frequencia: '85%', status: 'Bom', atividades: '20/25' }
         },
         'term1': {
             'matematica': { nota: 7.0, media: 6.5, frequencia: '88%', status: 'Bom', atividades: '8/10' },
             'fisica': { nota: 6.3, media: 6.8, frequencia: '85%', status: 'Regular', atividades: '7/9' },
             'portugues': { nota: 8.2, media: 7.0, frequencia: '92%', status: 'Bom', atividades: '10/10' },
             'historia': { nota: 8.6, media: 7.3, frequencia: '95%', status: 'Excelente', atividades: '9/9' },
             'quimica': { nota: 6.9, media: 6.5, frequencia: '82%', status: 'Regular', atividades: '6/8' }
         },
         'term2': {
             'matematica': { nota: 7.3, media: 6.7, frequencia: '90%', status: 'Bom', atividades: '8/10' },
             'fisica': { nota: 6.5, media: 6.9, frequencia: '87%', status: 'Regular', atividades: '7/9' },
             'portugues': { nota: 8.4, media: 7.1, frequencia: '94%', status: 'Excelente', atividades: '10/11' },
             'historia': { nota: 8.8, media: 7.5, frequencia: '98%', status: 'Excelente', atividades: '9/9' },
             'quimica': { nota: 7.0, media: 6.7, frequencia: '85%', status: 'Bom', atividades: '7/8' }
         },
         'term3': {
             'matematica': { nota: 7.8, media: 7.0, frequencia: '92%', status: 'Bom', atividades: '9/10' },
             'fisica': { nota: 7.2, media: 7.1, frequencia: '90%', status: 'Bom', atividades: '8/10' },
             'portugues': { nota: 8.8, media: 7.3, frequencia: '97%', status: 'Excelente', atividades: '10/11' },
             'historia': { nota: 9.2, media: 7.8, frequencia: '100%', status: 'Excelente', atividades: '10/10' },
             'quimica': { nota: 7.5, media: 7.0, frequencia: '88%', status: 'Bom', atividades: '7/9' }
         }
     };
     
     // Função para atualizar a tabela com base no trimestre selecionado
     function updatePerformanceTable(term) {
         const data = performanceDataByTerm[term];
         if (!data) return;
         
         const rows = document.querySelectorAll('.performance-table tbody tr');
         if (rows.length < 5) return;
         
         // Atualizar dados para Matemática
         updateTableRow(rows[0], data.matematica);
         
         // Atualizar dados para Física
         updateTableRow(rows[1], data.fisica);
         
         // Atualizar dados para Português
         updateTableRow(rows[2], data.portugues);
         
         // Atualizar dados para História
         updateTableRow(rows[3], data.historia);
         
         // Atualizar dados para Química
         updateTableRow(rows[4], data.quimica);
     }
     
     // Função auxiliar para atualizar uma linha da tabela
     function updateTableRow(row, data) {
         if (!row || !data) return;
         
         const cells = row.querySelectorAll('td');
         if (cells.length < 6) return;
         
         // Atualizar nota
         cells[1].textContent = data.nota;
         
         // Atualizar média da turma
         const mediaCell = row.querySelector('.hide-small:nth-of-type(3)');
         if (mediaCell) mediaCell.textContent = data.media;
         
         // Atualizar frequência
         const freqCell = row.querySelector('.hide-small:nth-of-type(4)');
         if (freqCell) freqCell.textContent = data.frequencia;
         
         // Atualizar status
         const statusBadge = cells[4].querySelector('.status-badge');
         if (statusBadge) {
             statusBadge.textContent = data.status;
             statusBadge.className = `status-badge status-${getStatusClass(data.status)}`;
         }
         
         // Atualizar atividades
         const ativCell = row.querySelector('.hide-mobile');
         if (ativCell) ativCell.textContent = data.atividades;
     }
     
     // Função para obter a classe CSS do status
     function getStatusClass(status) {
         switch(status.toLowerCase()) {
             case 'excelente':
                 return 'excellent';
             case 'bom':
                 return 'good';
             case 'regular':
                 return 'regular';
             default:
                 return 'needs-improvement';
         }
     }
     
     // Criar e adicionar o filtro de trimestre para a tabela de desempenho
     const performanceSection = document.querySelector('.performance-section');
     
     if (performanceSection) {
         // Criar o container do filtro
         const filterContainer = document.createElement('div');
         filterContainer.className = 'chart-filters';
         filterContainer.style.marginBottom = '15px';
         
         // Criar o grupo de filtro
         const filterGroup = document.createElement('div');
         filterGroup.className = 'filter-group';
         
         // Criar a label
         const label = document.createElement('label');
         label.htmlFor = 'performance-term-select';
         label.textContent = 'Trimestre:';
         
         // Criar o select
         const select = document.createElement('select');
         select.id = 'performance-term-select';
         select.className = 'filter-select';
         
         // Opções do select
         const options = [
             { value: 'all', text: 'Todos os Trimestres' },
             { value: 'term1', text: '1° Trimestre' },
             { value: 'term2', text: '2° Trimestre' },
             { value: 'term3', text: '3° Trimestre' }
         ];
         
         // Adicionar as opções ao select
         options.forEach(option => {
             const optionElement = document.createElement('option');
             optionElement.value = option.value;
             optionElement.textContent = option.text;
             select.appendChild(optionElement);
         });
         
         // Adicionar evento de mudança
         select.addEventListener('change', function() {
             updatePerformanceTable(this.value);
         });
         
         // Montar a estrutura do filtro
         filterGroup.appendChild(label);
         filterGroup.appendChild(select);
         filterContainer.appendChild(filterGroup);
         
         // Inserir o filtro antes da tabela
         const title = performanceSection.querySelector('h3');
         if (title) {
             title.insertAdjacentElement('afterend', filterContainer);
         }
     }
     
     // ===== FUNÇÕES DE RESPONSIVIDADE =====
     // Função para redimensionar os gráficos
     function resizeCharts() {
         const charts = [performanceChart, distributionChart, attendanceChart, skillsRadarChart];
         
         charts.forEach(chart => {
             if (chart) {
                 chart.resize();
                 chart.update();
             }
         });
     }
     
     // Otimizar gráficos para o tamanho atual da tela
     function updateChartsForScreenSize() {
         const isMobile = window.innerWidth < 768;
         const isSmall = window.innerWidth < 576;
         
         // Ajustar opções de todos os gráficos com base no tamanho da tela
         if (performanceChart) {
             performanceChart.options.plugins.legend.position = isSmall ? 'bottom' : 'top';
             performanceChart.options.scales.y.ticks.stepSize = isSmall ? 2 : 1;
             performanceChart.update();
         }
         
         if (distributionChart) {
             distributionChart.options.plugins.legend.display = !isSmall;
             distributionChart.options.scales.x.ticks.maxRotation = isSmall ? 45 : 0;
             distributionChart.update();
             // Reativar o plugin para a linha de aprovação
             addApprovalLine(distributionChart);
         }
         
         if (attendanceChart) {
             attendanceChart.options.plugins.legend.position = isSmall ? 'bottom' : 'top';
             attendanceChart.options.scales.y.ticks.stepSize = isSmall ? 10 : 5;
             attendanceChart.update();
         }
         
         if (skillsRadarChart) {
             skillsRadarChart.options.scales.r.pointLabels.font.size = isSmall ? 9 : 11;
             skillsRadarChart.options.scales.r.ticks.font.size = isSmall ? 8 : 10;
             skillsRadarChart.update();
         }
     }
     
     // ===== EVENTOS DE JANELA =====
     // Adicionar evento de redimensionamento
     window.addEventListener("resize", function() {
         checkWindowSize();
         
         // Usar debounce para evitar atualizações excessivas durante o redimensionamento
         clearTimeout(window.resizeTimer);
         window.resizeTimer = setTimeout(function() {
             updateChartsForScreenSize();
             resizeCharts();
         }, 250);
     });
     
     // Inicializar verificação de tamanho da janela
     checkWindowSize();
     
     // Adicionar suporte a gestos touch para os gráficos
     function addTouchSupportToCharts() {
         const chartContainers = document.querySelectorAll('.chart-container');
         
         chartContainers.forEach(container => {
             // Variáveis para o toque
             let touchStartX = 0;
             let touchStartY = 0;
             
             // Evento de início de toque
             container.addEventListener('touchstart', function(e) {
                 const touch = e.touches[0];
                 touchStartX = touch.clientX;
                 touchStartY = touch.clientY;
             }, false);
             
             // Evento de movimento durante o toque
             container.addEventListener('touchmove', function(e) {
                 // Prevenir rolagem da página durante gestos de zoom/pan nos gráficos
                 if (e.touches.length > 1) {
                     e.preventDefault();
                 }
             }, { passive: false });
             
             // Evento de fim de toque
             container.addEventListener('touchend', function(e) {
                 const touch = e.changedTouches[0];
                 const deltaX = touch.clientX - touchStartX;
                 const deltaY = touch.clientY - touchStartY;
                 
                 // Detectar gesto horizontal significativo
                 if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
                     // Buscar selects de período nas proximidades
                     const chartCard = container.closest('.chart-card');
                     if (!chartCard) return;
                     
                     const periodSelect = chartCard.querySelector('select[id*="period"]');
                     if (periodSelect) {
                         const currentIndex = periodSelect.selectedIndex;
                         
                         if (deltaX > 0 && currentIndex > 0) {
                             // Deslize para a direita - período anterior
                             periodSelect.selectedIndex = currentIndex - 1;
                             periodSelect.dispatchEvent(new Event('change'));
                         } else if (deltaX < 0 && currentIndex < periodSelect.options.length - 1) {
                             // Deslize para a esquerda - próximo período
                             periodSelect.selectedIndex = currentIndex + 1;
                             periodSelect.dispatchEvent(new Event('change'));
                         }
                     }
                 }
             }, false);
         });
     }
     
     // Ativar suporte a gestos depois que os gráficos são inicializados
     setTimeout(addTouchSupportToCharts, 1000);
     
     // Forçar uma atualização inicial do tamanho dos gráficos
     setTimeout(function() {
         updateChartsForScreenSize();
         resizeCharts();
     }, 200);
 });