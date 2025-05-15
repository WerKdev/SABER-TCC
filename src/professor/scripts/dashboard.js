document.addEventListener("DOMContentLoaded", function() {
    
    // Dados para os gráficos - modificado para 3 trimestres
    const performanceDataByClass = {
        'all': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.9, 7.3, 7.6]
        },
        '601': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.2, 7.6, 8.0]
        },
        '602': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.1, 7.5, 7.9]
        },
        '701': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.7, 7.1, 7.5]
        },
        '702': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [9.0, 7.0, 7.4]
        },
        '801': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.9, 7.3, 7.7]
        },
        '901': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.0, 7.4, 7.8]
        },
        '1001': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.1, 7.5, 7.9]
        },
        '2001': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.2, 7.6, 8.0]
        },
        '3001': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.3, 7.7, 8.1]
        }
    };

    const distributionDataByClass = {
        'all': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [15, 25, 30, 46, 14]
        },
        '601': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 2, 5, 10, 15]
        },
        '602': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 1, 6, 11, 14]
        },
        '701': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [2, 4, 8, 10, 6]
        },
        '702': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 3, 9, 11, 5]
        },
        '801': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 2, 7, 13, 7]
        },
        '901': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 3, 6, 12, 9]
        },
        '1001': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 3, 6, 14, 8]
        },
        '2001': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 2, 5, 15, 10]
        },
        '3001': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 1, 4, 16, 11]
        }
    };

    const performanceDataByGrade = {
        'all': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.9, 7.3, 7.6]
        },
        'fund1': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.3, 7.6, 7.8]
        },
        'fund2': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.2, 7.5, 7.7]
        },
        'fund3': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.1, 7.4, 7.6]
        },
        'fund4': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.0, 7.3, 7.5]
        },
        'fund5': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.9, 7.2, 7.4]
        },
        'fund6': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.1, 7.5, 7.8]
        },
        'fund7': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.8, 7.2, 7.5]
        },
        'fund8': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.9, 7.3, 7.6]
        },
        'fund9': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.0, 7.4, 7.7]
        },
        'medio1': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [6.8, 7.3, 7.6]
        },
        'medio2': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.0, 7.5, 7.8]
        },
        'medio3': {
            labels: ['1º Trimestre', '2º Trimestre', '3º Trimestre'],
            data: [7.2, 7.6, 7.9]
        }
    };

    const distributionDataByGrade = {
        'all': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [10, 25, 30, 50, 17]
        },
        'fund1': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 1, 3, 15, 13]
        },
        'fund2': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 1, 4, 14, 12]
        },
        'fund3': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 2, 5, 13, 11]
        },
        'fund4': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 2, 6, 12, 10]
        },
        'fund5': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 2, 7, 11, 9]
        },
        'fund6': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 1, 5, 14, 12]
        },
        'fund7': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 3, 8, 11, 7]
        },
        'fund8': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 3, 7, 12, 7]
        },
        'fund9': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 2, 7, 13, 8]
        },
        'medio1': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [2, 4, 9, 10, 5]
        },
        'medio2': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [1, 3, 8, 11, 7]
        },
        'medio3': {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            data: [0, 2, 6, 13, 9]
        }
    };
    
    // Mapeamento de turmas por ano escolar
    const classesByGrade = {
        'all': ['all', '601', '602', '701', '702', '801', '901', '1001', '2001', '3001'],
        'fund1': ['all'],
        'fund2': ['all'],
        'fund3': ['all'],
        'fund4': ['all'],
        'fund5': ['all'],
        'fund6': ['all', '601', '602'],
        'fund7': ['all', '701', '702'],
        'fund8': ['all', '801'],
        'fund9': ['all', '901'],
        'medio1': ['all', '1001'],
        'medio2': ['all', '2001'],
        'medio3': ['all', '3001']
    };
    
    // Mapeamento dos nomes de exibição das turmas
    const classDisplayNames = {
        'all': 'Todas as Turmas',
        '601': '6º Ano - Turma 01',
        '602': '6º Ano - Turma 02',
        '701': '7º Ano - Turma 01',
        '702': '7º Ano - Turma 02',
        '801': '8º Ano - Turma 01',
        '901': '9º Ano - Turma 01',
        '1001': '1º EM - Turma 01',
        '2001': '2º EM - Turma 01',
        '3001': '3º EM - Turma 01'
    };
    
    // Inicialização dos gráficos
    let performanceChart;
    let gradesDistributionChart;
    
    const performanceCtx = document.getElementById('performanceChart');
    const gradesDistributionCtx = document.getElementById('gradesDistributionChart');
    
    if (performanceCtx) {
        performanceChart = new Chart(performanceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: performanceDataByClass['all'].labels,
                datasets: [{
                    label: 'Média da Turma',
                    data: performanceDataByClass['all'].data,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 5,
                        max: 10
                    }
                }
            }
        });
    }
    
    if (gradesDistributionCtx) {
        gradesDistributionChart = new Chart(gradesDistributionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: distributionDataByClass['all'].labels,
                datasets: [{
                    label: 'Número de Alunos',
                    data: distributionDataByClass['all'].data,
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(249, 115, 22, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: window.innerWidth > 480,
                        position: 'top',
                        labels: {
                            boxWidth: 10,
                            font: {
                                size: window.innerWidth < 768 ? 10 : 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: window.innerWidth < 768 ? 10 : 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: window.innerWidth < 768 ? 10 : 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Função para atualizar o seletor de turmas com base no ano escolar selecionado
    function updateClassSelector(gradeSelect, classSelect) {
        const selectedGrade = gradeSelect.value;
        const availableClasses = classesByGrade[selectedGrade] || classesByGrade['all'];
        
        // Limpa as opções atuais
        while (classSelect.firstChild) {
            classSelect.removeChild(classSelect.firstChild);
        }
        
        // Adiciona as novas opções
        availableClasses.forEach(classId => {
            const option = document.createElement('option');
            option.value = classId;
            option.textContent = classDisplayNames[classId];
            classSelect.appendChild(option);
        });
        
        // Define o valor padrão como 'all'
        classSelect.value = 'all';
    }
    
    // Função para atualizar os gráficos com base nos filtros selecionados
    function updateCharts() {
        const performanceClassSelect = document.getElementById('performance-class-select');
        const performanceGradeSelect = document.getElementById('performance-grade-select');
        const distributionClassSelect = document.getElementById('distribution-class-select');
        const distributionGradeSelect = document.getElementById('distribution-grade-select');
        
        // Atualizar o gráfico de desempenho
        if (performanceChart && performanceClassSelect && performanceGradeSelect) {
            const selectedClass = performanceClassSelect.value;
            const selectedGrade = performanceGradeSelect.value;
            
            // Priorize a seleção de turma específica sobre o ano escolar
            let performanceData;
            if (selectedClass !== 'all' && performanceDataByClass[selectedClass]) {
                performanceData = performanceDataByClass[selectedClass];
            } else if (selectedGrade !== 'all' && performanceDataByGrade[selectedGrade]) {
                performanceData = performanceDataByGrade[selectedGrade];
            } else {
                performanceData = performanceDataByClass['all'];
            }
            
            performanceChart.data.labels = performanceData.labels;
            performanceChart.data.datasets[0].data = performanceData.data;
            performanceChart.update();
        }
        
        // Atualizar o gráfico de distribuição de notas
        if (gradesDistributionChart && distributionClassSelect && distributionGradeSelect) {
            const selectedClass = distributionClassSelect.value;
            const selectedGrade = distributionGradeSelect.value;
            
            let distributionData;
            if (selectedClass !== 'all' && distributionDataByClass[selectedClass]) {
                distributionData = distributionDataByClass[selectedClass];
            } else if (selectedGrade !== 'all' && distributionDataByGrade[selectedGrade]) {
                distributionData = distributionDataByGrade[selectedGrade];
            } else {
                distributionData = distributionDataByClass['all'];
            }
            
            gradesDistributionChart.data.labels = distributionData.labels;
            gradesDistributionChart.data.datasets[0].data = distributionData.data;
            gradesDistributionChart.update();
        }
    }
    
    // Adicionar event listeners para os selects
    const performanceClassSelect = document.getElementById('performance-class-select');
    const performanceGradeSelect = document.getElementById('performance-grade-select');
    const distributionClassSelect = document.getElementById('distribution-class-select');
    const distributionGradeSelect = document.getElementById('distribution-grade-select');
    
    // Event listeners para mudanças nos selects de ano escolar (atualiza os selects de turma)
    if (performanceGradeSelect && performanceClassSelect) {
        performanceGradeSelect.addEventListener('change', function() {
            updateClassSelector(performanceGradeSelect, performanceClassSelect);
            updateCharts();
        });
    }
    
    if (distributionGradeSelect && distributionClassSelect) {
        distributionGradeSelect.addEventListener('change', function() {
            updateClassSelector(distributionGradeSelect, distributionClassSelect);
            updateCharts();
        });
    }
    
    // Event listeners para mudanças nos selects de turma (atualiza apenas os gráficos)
    if (performanceClassSelect) {
        performanceClassSelect.addEventListener('change', updateCharts);
    }
    
    if (distributionClassSelect) {
        distributionClassSelect.addEventListener('change', updateCharts);
    }
    
    // Inicializar os selects de turma com base nos selects de ano escolar
    if (performanceGradeSelect && performanceClassSelect) {
        updateClassSelector(performanceGradeSelect, performanceClassSelect);
    }
    
    if (distributionGradeSelect && distributionClassSelect) {
        updateClassSelector(distributionGradeSelect, distributionClassSelect);
    }
    
    // Função para verificar o tamanho da janela
    function checkWindowSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        }
    }
    
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
});