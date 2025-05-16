document.addEventListener("DOMContentLoaded", function() {
    
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        const performanceChart = new Chart(performanceCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['POO', 'Banco de Dados', 'Estrutura de Dados', 'IA', 'Eng. Software', 'Ética em TI'],
                datasets: [{
                    label: 'Sua Nota',
                    data: [9.5, 8.8, 7.2, 8.0, 8.2, 8.7],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }, {
                    label: 'Média da Turma',
                    data: [8.1, 7.8, 6.9, 7.3, 7.5, 8.2],
                    backgroundColor: 'rgba(191, 219, 254, 0.8)',
                    borderColor: 'rgba(191, 219, 254, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
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
    if (progressCtx) {
        const progressChart = new Chart(progressCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Fev', 'Mar', 'Abr', 'Mai'],
                datasets: [{
                    label: 'Sua Média',
                    data: [8.0, 8.2, 8.3, 8.4],
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    borderColor: 'rgba(30, 64, 175, 1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(30, 64, 175, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }, {
                    label: 'Média da Turma',
                    data: [7.2, 7.3, 7.4, 7.5],
                    backgroundColor: 'rgba(147, 197, 253, 0.1)',
                    borderColor: 'rgba(147, 197, 253, 1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'rgba(147, 197, 253, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 5,
                        max: 10,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                }
            }
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
    if (attendanceCtx) {
        const attendanceData = {
            labels: ['POO', 'Banco de Dados', 'Estrutura de Dados', 'IA', 'Eng. Software', 'Ética em TI'],
            datasets: [{
                label: 'Presenças',
                data: [6, 6, 5, 5, 5, 5],
                backgroundColor: 'rgba(37, 99, 235, 0.8)'
            }, {
                label: 'Presenças Tardias',
                data: [0, 0, 1, 0, 1, 1],
                backgroundColor: 'rgba(96, 165, 250, 0.8)'
            }, {
                label: 'Faltas',
                data: [0, 0, 1, 1, 1, 1],
                backgroundColor: 'rgba(191, 219, 254, 0.8)'
            }]
        };
        
        const attendanceChart = new Chart(attendanceCtx.getContext('2d'), {
            type: 'bar',
            data: attendanceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
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
                    <div class="legend-color" style="background-color: rgba(37, 99, 235, 0.8)"></div>
                    <span>Presenças</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: rgba(96, 165, 250, 0.8)"></div>
                    <span>Presenças Tardias</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: rgba(191, 219, 254, 0.8)"></div>
                    <span>Faltas</span>
                </div>
            `;
            legendContainer.innerHTML = legendHTML;
        }
    }
    
    // Activities Completion Chart
    const activitiesCtx = document.getElementById('activitiesChart');
    if (activitiesCtx) {
        const activitiesChart = new Chart(activitiesCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Entregues no Prazo', 'Entregues com Atraso', 'Não Entregues', 'Pendentes'],
                datasets: [{
                    data: [28, 3, 1, 4],
                    backgroundColor: [
                        'rgba(30, 64, 175, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(96, 165, 250, 0.8)',
                        'rgba(219, 234, 254, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                layout: {
                    padding: {
                        bottom: 10 // Adiciona um pouco de espaço abaixo do gráfico
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom', // Move a legenda para baixo
                        align: 'center',    // Centraliza a legenda horizontalmente
                        labels: {
                            usePointStyle: true, // Usa estilo de ponto em vez de quadrados
                            boxWidth: 10,       // Tamanho menor dos pontos
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Novo gráfico: Carga de Estudos Semanal
    const studyLoadCtx = document.getElementById('studyLoadChart');
    if (studyLoadCtx) {
        const studyLoadChart = new Chart(studyLoadCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                datasets: [
                    {
                        label: 'IA',
                        data: [2, 3, 2, 1, 2, 1, 1],
                        backgroundColor: 'rgba(37, 99, 235, 0.8)'
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
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Horas'
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 11
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
    
    // Function to check window size for responsive design
    function checkWindowSize() {
        if (window.innerWidth <= 768) {
            if (sidebar) sidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', checkWindowSize);
    checkWindowSize();
});