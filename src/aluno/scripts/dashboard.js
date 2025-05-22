document.addEventListener("DOMContentLoaded", function() {
    
    // Função para obter configurações responsivas dos gráficos
    function getResponsiveChartOptions(type = 'bar') {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        const baseOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: !isSmallMobile,
                    position: 'top',
                    labels: {
                        boxWidth: isMobile ? 8 : 12,
                        font: {
                            size: isSmallMobile ? 10 : isMobile ? 11 : 12
                        },
                        padding: isMobile ? 10 : 20,
                        usePointStyle: true
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: isSmallMobile ? 9 : isMobile ? 10 : 12
                        },
                        maxRotation: isMobile ? 45 : 0
                    },
                    grid: {
                        display: type === 'line'
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: isSmallMobile ? 9 : isMobile ? 10 : 12
                        }
                    },
                    grid: {
                        color: isDarkMode() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.8)'
                    }
                }
            }
        };
        
        if (type === 'line') {
            baseOptions.scales.y.beginAtZero = false;
            baseOptions.scales.y.min = 5;
            baseOptions.scales.y.max = 10;
        } else if (type === 'bar') {
            baseOptions.scales.y.beginAtZero = true;
        }
        
        return baseOptions;
    }
    
    // Função para verificar se está em modo escuro
    function isDarkMode() {
        return document.body.classList.contains('dark-theme');
    }
    
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    let performanceChart;
    if (performanceCtx) {
        performanceChart = new Chart(performanceCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['POO', 'Banco de Dados', 'Estrutura de Dados', 'IA', 'Eng. Software', 'Ética em TI'],
                datasets: [{
                    label: 'Sua Nota',
                    data: [9.5, 8.8, 7.2, 8.0, 8.2, 8.7],
                    backgroundColor: 'rgba(0, 72, 165, 0.8)',
                    borderColor: 'rgba(0, 72, 165, 1)',
                    borderWidth: 1,
                    borderRadius: window.innerWidth <= 480 ? 3 : 6
                }, {
                    label: 'Média da Turma',
                    data: [8.1, 7.8, 6.9, 7.3, 7.5, 8.2],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: window.innerWidth <= 480 ? 3 : 6
                }]
            },
            options: {
                ...getResponsiveChartOptions('bar'),
                scales: {
                    ...getResponsiveChartOptions('bar').scales,
                    y: {
                        ...getResponsiveChartOptions('bar').scales.y,
                        max: 10
                    }
                }
            }
        });
        
        // Filter event
        const performancePeriodSelect = document.getElementById('performance-period-select');
        if (performancePeriodSelect) {
            performancePeriodSelect.addEventListener('change', function() {
                const period = this.value;
                let labels, yourData, classData;
                
                if (period === 'current') {
                    labels = ['POO', 'Banco de Dados', 'Estrutura de Dados', 'IA', 'Eng. Software', 'Ética em TI'];
                    yourData = [9.5, 8.8, 7.2, 8.0, 8.2, 8.7];
                    classData = [8.1, 7.8, 6.9, 7.3, 7.5, 8.2];
                } else if (period === 'previous') {
                    labels = ['Programação Web', 'Cálculo II', 'Arquitetura', 'Algoritmos', 'Redes', 'IHC'];
                    yourData = [8.7, 7.5, 9.0, 8.3, 7.8, 9.2];
                    classData = [7.6, 6.8, 7.9, 7.2, 7.0, 8.0];
                } else {
                    labels = ['POO', 'Banco de Dados', 'Estrutura de Dados', 'IA', 'Eng. Software', 'Ética em TI', 'Programação Web', 'Cálculo II', 'Arquitetura', 'Algoritmos', 'Redes', 'IHC'];
                    yourData = [9.5, 8.8, 7.2, 8.0, 8.2, 8.7, 8.7, 7.5, 9.0, 8.3, 7.8, 9.2];
                    classData = [8.1, 7.8, 6.9, 7.3, 7.5, 8.2, 7.6, 6.8, 7.9, 7.2, 7.0, 8.0];
                }
                
                performanceChart.data.labels = labels;
                performanceChart.data.datasets[0].data = yourData;
                performanceChart.data.datasets[1].data = classData;
                performanceChart.update();
            });
        }
    }
    
    // Progress Chart
    const progressCtx = document.getElementById('progressChart');
    let progressChart;
    if (progressCtx) {
        progressChart = new Chart(progressCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Fev', 'Mar', 'Abr', 'Mai'],
                datasets: [{
                    label: 'Sua Média',
                    data: [8.0, 8.2, 8.3, 8.4],
                    backgroundColor: 'rgba(0, 72, 165, 0.1)',
                    borderColor: 'rgba(0, 72, 165, 1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(0, 72, 165, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: window.innerWidth <= 480 ? 3 : 5
                }, {
                    label: 'Média da Turma',
                    data: [7.2, 7.3, 7.4, 7.5],
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: window.innerWidth <= 480 ? 3 : 5
                }]
            },
            options: getResponsiveChartOptions('line')
        });
        
        // Filter event
        const progressPeriodSelect = document.getElementById('progress-period-select');
        if (progressPeriodSelect) {
            progressPeriodSelect.addEventListener('change', function() {
                const period = this.value;
                let labels, yourData, classData;
                
                if (period === 'semester') {
                    labels = ['Fev', 'Mar', 'Abr', 'Mai'];
                    yourData = [8.0, 8.2, 8.3, 8.4];
                    classData = [7.2, 7.3, 7.4, 7.5];
                } else if (period === 'year') {
                    labels = ['Ago/2024', 'Set/2024', 'Out/2024', 'Nov/2024', 'Dez/2024', 'Jan/2025', 'Fev/2025', 'Mar/2025', 'Abr/2025', 'Mai/2025'];
                    yourData = [7.8, 7.9, 8.0, 8.0, 8.1, 8.1, 8.2, 8.2, 8.3, 8.4];
                    classData = [7.0, 7.0, 7.1, 7.1, 7.2, 7.2, 7.3, 7.3, 7.4, 7.5];
                } else {
                    labels = ['1º Sem/2023', '2º Sem/2023', '1º Sem/2024', '2º Sem/2024', '1º Sem/2025'];
                    yourData = [7.2, 7.5, 7.8, 8.1, 8.4];
                    classData = [6.8, 6.9, 7.0, 7.2, 7.5];
                }
                
                progressChart.data.labels = labels;
                progressChart.data.datasets[0].data = yourData;
                progressChart.data.datasets[1].data = classData;
                progressChart.update();
            });
        }
    }
    
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    let attendanceChart;
    if (attendanceCtx) {
        const attendanceData = {
            labels: ['POO', 'Banco de Dados', 'Estrutura de Dados', 'IA', 'Eng. Software', 'Ética em TI'],
            datasets: [{
                label: 'Presenças',
                data: [6, 6, 5, 5, 5, 5],
                backgroundColor: 'rgba(0, 72, 165, 0.8)'
            }, {
                label: 'Presenças Tardias',
                data: [0, 0, 1, 0, 1, 1],
                backgroundColor: 'rgba(59, 130, 246, 0.8)'
            }, {
                label: 'Faltas',
                data: [0, 0, 1, 1, 1, 1],
                backgroundColor: 'rgba(147, 197, 253, 0.8)'
            }]
        };
        
        attendanceChart = new Chart(attendanceCtx.getContext('2d'), {
            type: 'bar',
            data: attendanceData,
            options: {
                ...getResponsiveChartOptions('bar'),
                scales: {
                    ...getResponsiveChartOptions('bar').scales,
                    x: {
                        ...getResponsiveChartOptions('bar').scales.x,
                        stacked: true
                    },
                    y: {
                        ...getResponsiveChartOptions('bar').scales.y,
                        stacked: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        // Create legend manually
        const legendContainer = document.getElementById('attendanceChartLegend');
        if (legendContainer) {
            const legendHTML = `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: rgba(0, 72, 165, 0.8)"></div>
                    <span>Presenças</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: rgba(59, 130, 246, 0.8)"></div>
                    <span>Presenças Tardias</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: rgba(147, 197, 253, 0.8)"></div>
                    <span>Faltas</span>
                </div>
            `;
            legendContainer.innerHTML = legendHTML;
        }
    }
    
    // Activities Completion Chart
    const activitiesCtx = document.getElementById('activitiesChart');
    let activitiesChart;
    if (activitiesCtx) {
        activitiesChart = new Chart(activitiesCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Entregues no Prazo', 'Entregues com Atraso', 'Não Entregues', 'Pendentes'],
                datasets: [{
                    data: [28, 3, 1, 4],
                    backgroundColor: [
                        'rgba(0, 72, 165, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(147, 197, 253, 0.8)',
                        'rgba(203, 213, 225, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: window.innerWidth <= 480 ? 2 : 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                layout: {
                    padding: {
                        bottom: 10
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            usePointStyle: true,
                            boxWidth: window.innerWidth <= 480 ? 8 : 10,
                            padding: window.innerWidth <= 480 ? 10 : 15,
                            font: {
                                size: window.innerWidth <= 480 ? 10 : 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Study Load Chart
    const studyLoadCtx = document.getElementById('studyLoadChart');
    let studyLoadChart;
    if (studyLoadCtx) {
        studyLoadChart = new Chart(studyLoadCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                datasets: [
                    {
                        label: 'IA',
                        data: [2, 3, 2, 1, 2, 1, 1],
                        backgroundColor: 'rgba(0, 72, 165, 0.8)'
                    },
                    {
                        label: 'POO',
                        data: [1, 2, 1, 2, 1, 0, 0],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)'
                    },
                    {
                        label: 'Banco de Dados',
                        data: [2, 1, 1, 2, 2, 0, 0],
                        backgroundColor: 'rgba(96, 165, 250, 0.8)'
                    },
                    {
                        label: 'Estrutura de Dados',
                        data: [1, 1, 2, 1, 1, 1, 0],
                        backgroundColor: 'rgba(147, 197, 253, 0.8)'
                    },
                    {
                        label: 'Outras',
                        data: [1, 1, 0, 1, 1, 1, 0],
                        backgroundColor: 'rgba(191, 219, 254, 0.8)'
                    }
                ]
            },
            options: {
                ...getResponsiveChartOptions('bar'),
                scales: {
                    ...getResponsiveChartOptions('bar').scales,
                    x: {
                        ...getResponsiveChartOptions('bar').scales.x,
                        stacked: true
                    },
                    y: {
                        ...getResponsiveChartOptions('bar').scales.y,
                        stacked: true,
                        max: 10,
                        title: {
                            display: window.innerWidth > 768,
                            text: 'Horas'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: window.innerWidth <= 768 ? 'bottom' : 'top',
                        labels: {
                            usePointStyle: true,
                            padding: window.innerWidth <= 480 ? 10 : 15,
                            font: {
                                size: window.innerWidth <= 480 ? 10 : 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            footer: function(tooltipItems) {
                                let sum = 0;
                                tooltipItems.forEach(function(tooltipItem) {
                                    sum += tooltipItem.parsed.y;
                                });
                                return 'Total: ' + sum + ' horas';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Função para atualizar gráficos no redimensionamento
    function updateChartsOnResize() {
        const charts = [performanceChart, progressChart, attendanceChart, activitiesChart, studyLoadChart];
        
        charts.forEach(chart => {
            if (chart) {
                // Atualizar opções responsivas
                if (chart.config.type === 'line') {
                    chart.options = getResponsiveChartOptions('line');
                    chart.data.datasets.forEach(dataset => {
                        dataset.pointRadius = window.innerWidth <= 480 ? 3 : 5;
                    });
                } else if (chart.config.type === 'bar') {
                    chart.options = getResponsiveChartOptions('bar');
                    chart.data.datasets.forEach(dataset => {
                        if (dataset.borderRadius !== undefined) {
                            dataset.borderRadius = window.innerWidth <= 480 ? 3 : 6;
                        }
                    });
                } else if (chart.config.type === 'doughnut') {
                    chart.data.datasets.forEach(dataset => {
                        dataset.borderRadius = window.innerWidth <= 480 ? 2 : 3;
                    });
                    chart.options.plugins.legend.labels.boxWidth = window.innerWidth <= 480 ? 8 : 10;
                    chart.options.plugins.legend.labels.padding = window.innerWidth <= 480 ? 10 : 15;
                    chart.options.plugins.legend.labels.font.size = window.innerWidth <= 480 ? 10 : 12;
                }
                
                // Atualizar estilo específico do Study Load Chart
                if (chart === studyLoadChart) {
                    chart.options.plugins.legend.position = window.innerWidth <= 768 ? 'bottom' : 'top';
                    chart.options.scales.y.title.display = window.innerWidth > 768;
                }
                
                chart.update();
            }
        });
    }
    
    // Função para atualizar cores dos gráficos no modo escuro
    function updateChartsForDarkMode(isDark) {
        const charts = [performanceChart, progressChart, attendanceChart, activitiesChart, studyLoadChart];
        
        charts.forEach(chart => {
            if (chart && chart.options.scales) {
                const textColor = isDark ? '#cbd5e1' : '#475569';
                const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.8)';
                
                if (chart.options.scales.y) {
                    chart.options.scales.y.ticks = {
                        ...chart.options.scales.y.ticks,
                        color: textColor
                    };
                    
                    chart.options.scales.y.grid = {
                        ...chart.options.scales.y.grid,
                        color: gridColor
                    };
                }
                
                if (chart.options.scales.x) {
                    chart.options.scales.x.ticks = {
                        ...chart.options.scales.x.ticks,
                        color: textColor
                    };
                }
                
                if (chart.options.plugins && chart.options.plugins.legend) {
                    chart.options.plugins.legend.labels = {
                        ...chart.options.plugins.legend.labels,
                        color: textColor
                    };
                }
                
                chart.update();
            }
        });
    }
    
    // Event listener para redimensionamento
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateChartsOnResize();
        }, 250);
    }
    
    window.addEventListener("resize", handleResize);
    
    // Sistema de tema escuro
    const themeToggle = document.getElementById('theme-toggle');
    
    // Função para aplicar o tema
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.checked = false;
        }
        
        // Atualizar gráficos para o novo tema
        setTimeout(() => {
            updateChartsForDarkMode(isDark);
        }, 100);
    }
    
    // Carregar tema salvo
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            applyTheme(true);
        } else if (savedTheme === 'light') {
            applyTheme(false);
        } else {
            // Verificar preferência do sistema
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDarkScheme);
        }
    }
    
    // Event listener para o toggle de tema
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const isDark = this.checked;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            applyTheme(isDark);
        });
    }
    
    // Carregar tema ao iniciar
    loadSavedTheme();
});