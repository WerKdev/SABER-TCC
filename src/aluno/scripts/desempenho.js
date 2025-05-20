// Dados para o gráfico de notas
const data = {
    "1° Trimestre": {
        subjects: ["RED", "NAT", "HUM", "MAT", "LING"],
        studentScores: [7.5, 5.8, 6.2, 6.5, 7.2],
        classAverage: [6.4, 6.7, 5.9, 5.8, 6.2]
    },
    "2° Trimestre": {
        subjects: ["RED", "NAT", "HUM", "MAT", "LING"],
        studentScores: [7.8, 6.2, 6.5, 6.8, 7.5],
        classAverage: [6.6, 6.9, 6.1, 6.0, 6.4]
    },
    "3° Trimestre": {
        subjects: ["RED", "NAT", "HUM", "MAT", "LING"],
        studentScores: [8.0, 6.5, 6.8, 7.0, 7.8],
        classAverage: [6.8, 7.0, 6.3, 6.2, 6.6]
    }
};

// Dados completos de faltas organizados por trimestre
const dadosCompletos = {
    "2025": {
        "Ano Todo": {
            "Matemática": { faltas: 19, limite: 24, percentual: 79 },
            "Ciências da Natureza": { faltas: 9, limite: 18, percentual: 50 },
            "Ciências Humanas": { faltas: 3, limite: 15, percentual: 20 },
            "Linguagens": { faltas: 6, limite: 21, percentual: 28 },
            "Banco de dados": { faltas: 0, limite: 15, percentual: 0 }
        },
        "Trimestre 1": {
            "Matemática": { faltas: 7, limite: 8, percentual: 87 },
            "Ciências da Natureza": { faltas: 3, limite: 6, percentual: 50 },
            "Ciências Humanas": { faltas: 1, limite: 5, percentual: 20 },
            "Linguagens": { faltas: 2, limite: 7, percentual: 28 },
            "Banco de dados": { faltas: 0, limite: 5, percentual: 0 }
        },
        "Trimestre 2": {
            "Matemática": { faltas: 8, limite: 8, percentual: 100 },
            "Ciências da Natureza": { faltas: 4, limite: 6, percentual: 67 },
            "Ciências Humanas": { faltas: 1, limite: 5, percentual: 20 },
            "Linguagens": { faltas: 3, limite: 7, percentual: 43 },
            "Banco de dados": { faltas: 0, limite: 5, percentual: 0 }
        },
        "Trimestre 3": {
            "Matemática": { faltas: 4, limite: 8, percentual: 50 },
            "Ciências da Natureza": { faltas: 2, limite: 6, percentual: 33 },
            "Ciências Humanas": { faltas: 1, limite: 5, percentual: 20 },
            "Linguagens": { faltas: 1, limite: 7, percentual: 14 },
            "Banco de dados": { faltas: 0, limite: 5, percentual: 0 }
        }
    }
};

// Dados de evolução de faltas por mês, organizado por trimestre
const dadosEvolucaoMensal = {
    "2025": {
        "Ano Todo": [2, 4, 3, 7, 5, 2, 0, 3, 5, 4, 2, 0],
        "Trimestre 1": [2, 4, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0],
        "Trimestre 2": [0, 0, 0, 0, 5, 2, 0, 3, 0, 0, 0, 0],
        "Trimestre 3": [0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 2, 0]
    }
};

// Dados para os gráficos de faltas
const faltasData = {
    mensal: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Faltas por Mês',
                data: [2, 4, 3, 7, 5, 2, 0, 3, 5, 4, 2, 0],
                borderColor: '#0c142b',
                backgroundColor: 'rgba(12, 20, 43, 0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    },
    disciplinas: {
        labels: ['Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Linguagens', 'Banco de dados'],
        datasets: [
            {
                label: 'Faltas por Disciplina',
                data: [19, 9, 3, 6, 0],
                backgroundColor: [
                    '#ef4444', // Matemática - Vermelho (Crítico)
                    '#f59e0b', // Ciências da Natureza - Amarelo (Atenção)
                    '#22c55e', // Ciências Humanas - Verde (Bom)
                    '#f59e0b', // Linguagens - Amarelo (Atenção)
                    '#22c55e'  // Banco de dados - Verde (Bom)
                ],
                borderWidth: 1
            }
        ]
    }
};

// Variável para armazenar a instância do gráfico
let performanceChart;
let faltasMensalChart;
let faltasDisciplinaChart;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o sistema de abas
    initTabs();
    
    // Inicializar o gráfico de notas
    updateChart();
    
    // Inicializar o sistema de faltas
    initFaltas();
    
    // Inicializar tooltips personalizados
    initTooltips();
});

// Função para inicializar o sistema de navegação por abas
function initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    
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
            
            // Inicializa visualizações específicas da aba
            if (tabId === 'notas' && !performanceChart) {
                updateChart();
            } else if (tabId === 'faltas') {
                // Garantir que os elementos de faltas sejam atualizados
                setTimeout(() => {
                    initFaltas();
                }, 100);
            }
        });
    });
}

// Função para atualizar o gráfico com base nas opções selecionadas
function updateChart() {
    const etapa = document.getElementById('etapa').value;
    const comparar = document.getElementById('comparar').value;
    
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Se já existir um gráfico, destruí-lo antes de criar um novo
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    const currentData = data[etapa];
    const datasets = [
        {
            label: 'Nota do Aluno',
            data: currentData.studentScores,
            backgroundColor: 'rgba(40, 167, 69, 0.8)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
        },
        {
            label: 'Média da Turma',
            data: currentData.classAverage,
            backgroundColor: 'rgba(255, 193, 7, 0.8)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
        }
    ];
    
    // Adicionar dados de comparação se selecionado
    if (comparar !== 'Nenhum' && comparar !== etapa) {
        const compareData = data[comparar];
        datasets.push({
            label: `Aluno (${comparar})`,
            data: compareData.studentScores,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            borderDash: [5, 5]
        });
    }
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: currentData.subjects,
            datasets: datasets
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Estatísticas de Desempenho'
                }
            },
            layout: {
                padding: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }
            },
            barThickness: 25,
            barPercentage: 0.5
        }
    });
}

// Inicializar o sistema de faltas
function initFaltas() {
    // Criar a tabela dinâmica com as disciplinas
    atualizarTabelaFaltas();
    
    // Inicializar os filtros de faltas
    const anoSelect = document.getElementById('ano');
    const trimestreSelect = document.getElementById('trimestre');
    const disciplinaSelect = document.getElementById('disciplina');
    const saveFaltasBtn = document.querySelector('.save-faltas-button');
    
    if (anoSelect) anoSelect.addEventListener('change', atualizarTabelaFaltas);
    if (trimestreSelect) trimestreSelect.addEventListener('change', atualizarTabelaFaltas);
    if (disciplinaSelect) disciplinaSelect.addEventListener('change', atualizarTabelaFaltas);
    if (saveFaltasBtn) saveFaltasBtn.addEventListener('click', salvarTabelaFaltas);
    
    // Inicializar os gráficos de faltas
    initFaltasCharts();
}

// Função para atualizar a tabela de faltas com base nos filtros
function atualizarTabelaFaltas() {
    const anoSelecionado = document.getElementById('ano').value;
    const periodoSelecionado = document.getElementById('trimestre').value;
    const disciplinaSelecionada = document.getElementById('disciplina').value;
    
    // Obter dados para o período selecionado
    const dadosPeriodo = dadosCompletos[anoSelecionado][periodoSelecionado];
    if (!dadosPeriodo) return;
    
    // Limpar tabela atual
    const tbody = document.querySelector('.stats-table tbody');
    tbody.innerHTML = '';
    
    // Mapeamento de valores do select para nomes de disciplinas
    const mapeamentoDisciplinas = {
        'matematica': 'Matemática',
        'ciencias': 'Ciências da Natureza',
        'humanas': 'Ciências Humanas',
        'linguagens': 'Linguagens',
        'banco': 'Banco de dados'
    };
    
    // Filtrar disciplinas se necessário
    const disciplinas = Object.keys(dadosPeriodo);
    let disciplinasFiltradas = disciplinas;
    
    if (disciplinaSelecionada !== 'todas') {
        // Se uma disciplina específica foi selecionada, procurar pelo nome mapeado
        const nomeDisciplina = mapeamentoDisciplinas[disciplinaSelecionada];
        if (nomeDisciplina) {
            disciplinasFiltradas = disciplinas.filter(d => d === nomeDisciplina);
        }
    }
    
    // Variáveis para calcular totais
    let totalFaltas = 0;
    let totalPermitidas = 0;
    let disciplinaCritica = '';
    let maiorPercentual = 0;
    
    // Popular a tabela com os dados filtrados
    disciplinasFiltradas.forEach(disciplina => {
        const dados = dadosPeriodo[disciplina];
        if (!dados) return;
        
        // Acumular totais
        totalFaltas += dados.faltas;
        totalPermitidas += dados.limite;
        
        // Verificar disciplina crítica
        if (dados.percentual > maiorPercentual) {
            maiorPercentual = dados.percentual;
            disciplinaCritica = disciplina;
        }
        
        // Definir status baseado no percentual
        let statusClass = 'status-good';
        if (dados.percentual >= 75) {
            statusClass = 'status-danger';
        } else if (dados.percentual >= 50) {
            statusClass = 'status-warning';
        }
        
        // Criar a linha da tabela
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${disciplina}</td>
            <td>${dados.faltas}</td>
            <td>${dados.percentual}%</td>
            <td>${dados.limite}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill ${statusClass}" style="width: ${dados.percentual}%"></div>
                </div>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Atualizar informações de resumo
    atualizarResumoFaltas(totalFaltas, totalPermitidas, disciplinaCritica, dadosPeriodo);
    
    // Atualizar os gráficos de faltas
    atualizarGraficosFaltas(periodoSelecionado, disciplinaSelecionada);
    
    // Adicionar evento de clique às linhas da tabela
    const linhasTabela = document.querySelectorAll('.stats-table tbody tr');
    linhasTabela.forEach(linha => {
        linha.addEventListener('click', function() {
            // Remover classe ativa de todas as linhas
            linhasTabela.forEach(r => r.classList.remove('active-row'));
            
            // Adicionar classe ativa à linha clicada
            this.classList.add('active-row');
            
            // Mostrar detalhes desta disciplina
            const disciplina = this.querySelector('td:first-child').textContent;
            mostrarDetalhesDisciplina(disciplina);
        });
    });
}

// Função para atualizar o resumo lateral de faltas
function atualizarResumoFaltas(totalFaltas, totalPermitidas, disciplinaCritica, dadosPeriodo) {
    // Atualizar contadores
    document.querySelector('.total-faltas').textContent = totalFaltas;
    document.querySelector('.permitidas').textContent = `de ${totalPermitidas} permitidas`;
    
    // Atualizar barra de progresso
    const percentualTotal = Math.min(100, Math.round((totalFaltas / totalPermitidas) * 100));
    const progressoTotal = document.getElementById('progresso-total');
    progressoTotal.style.width = `${percentualTotal}%`;
    
    // Atualizar classe de status do progresso
    progressoTotal.classList.remove('status-good', 'status-warning', 'status-danger');
    if (percentualTotal >= 75) {
        progressoTotal.classList.add('status-danger');
    } else if (percentualTotal >= 50) {
        progressoTotal.classList.add('status-warning');
    } else {
        progressoTotal.classList.add('status-good');
    }
    
    // Atualizar informação de disciplina crítica
    const elementoDisciplinaCritica = document.querySelector('.critica-nome');
    const elementoAvisoCritico = document.querySelector('.critica-aviso');
    
    if (disciplinaCritica && dadosPeriodo[disciplinaCritica]) {
        elementoDisciplinaCritica.textContent = disciplinaCritica;
        
        const dadosCriticos = dadosPeriodo[disciplinaCritica];
        const faltasRestantes = Math.max(0, dadosCriticos.limite - dadosCriticos.faltas);
        
        if (dadosCriticos.faltas >= dadosCriticos.limite) {
            elementoAvisoCritico.textContent = 'Limite máximo de faltas atingido. Situação crítica!';
        } else {
            elementoAvisoCritico.textContent = `Você só pode ter no máximo mais ${faltasRestantes} faltas nessa matéria`;
        }
    } else {
        elementoDisciplinaCritica.textContent = 'Nenhuma';
        elementoAvisoCritico.textContent = 'Sem disciplinas críticas no momento.';
    }
}

// Função para inicializar os gráficos da seção de faltas
function initFaltasCharts() {
    // Gráfico de evolução mensal de faltas
    const ctxMensal = document.getElementById('faltasMensalChart');
    if (ctxMensal) {
        if (faltasMensalChart) {
            faltasMensalChart.destroy();
        }
        
        faltasMensalChart = new Chart(ctxMensal, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Faltas por Mês',
                    data: dadosEvolucaoMensal["2025"]["Ano Todo"],
                    borderColor: '#0c142b',
                    backgroundColor: 'rgba(12, 20, 43, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Evolução de Faltas ao Longo do Ano'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Faltas'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // Gráfico de faltas por disciplina
    const ctxDisciplina = document.getElementById('faltasDisciplinaChart');
    if (ctxDisciplina) {
        if (faltasDisciplinaChart) {
            faltasDisciplinaChart.destroy();
        }
        
        faltasDisciplinaChart = new Chart(ctxDisciplina, {
            type: 'bar',
            data: {
                labels: faltasData.disciplinas.labels,
                datasets: [{
                    label: 'Faltas por Disciplina',
                    data: faltasData.disciplinas.datasets[0].data,
                    backgroundColor: faltasData.disciplinas.datasets[0].backgroundColor,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Faltas por Disciplina'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 25,
                        title: {
                            display: true,
                            text: 'Número de Faltas'
                        }
                    }
                }
            }
        });
    }
}

// Função para atualizar os gráficos com base nos filtros
function atualizarGraficosFaltas(periodoSelecionado, disciplinaSelecionada) {
    const anoSelecionado = document.getElementById('ano').value;
    
    // Mapeamento de valores do select para nomes de disciplinas
    const mapeamentoDisciplinas = {
        'matematica': 'Matemática',
        'ciencias': 'Ciências da Natureza',
        'humanas': 'Ciências Humanas',
        'linguagens': 'Linguagens',
        'banco': 'Banco de dados'
    };
    
    // Atualizar o gráfico de evolução mensal
    if (faltasMensalChart) {
        // Obter dados de evolução mensal para o período selecionado
        const dadosMensais = dadosEvolucaoMensal[anoSelecionado][periodoSelecionado];
        
        // Se a disciplina específica for selecionada, filtrar os dados (simulação)
        let dadosFiltrados = [...dadosMensais];
        if (disciplinaSelecionada !== 'todas') {
            // Aplicar fatores de multiplicação específicos por disciplina
            switch (disciplinaSelecionada) {
                case 'matematica':
                    dadosFiltrados = dadosMensais.map(value => Math.ceil(value * 0.7));
                    break;
                case 'ciencias':
                    dadosFiltrados = dadosMensais.map(value => Math.ceil(value * 0.3));
                    break;
                case 'humanas':
                    dadosFiltrados = dadosMensais.map(value => Math.ceil(value * 0.2));
                    break;
                case 'linguagens':
                    dadosFiltrados = dadosMensais.map(value => Math.ceil(value * 0.4));
                    break;
                case 'banco':
                    dadosFiltrados = dadosMensais.map(() => 0); // Sem faltas para banco de dados
                    break;
                default:
                    // Manter dados originais
                    break;
            }
        }
        
        faltasMensalChart.data.datasets[0].data = dadosFiltrados;
        faltasMensalChart.update();
    }
    
    // Atualizar o gráfico de faltas por disciplina
    if (faltasDisciplinaChart) {
        // Obter dados do período selecionado
        const dadosPeriodo = dadosCompletos[anoSelecionado][periodoSelecionado];
        
        // Preparar dados para o gráfico
        const disciplinas = Object.keys(dadosPeriodo);
        const dadosGrafico = {
            labels: [],
            data: [],
            backgroundColor: []
        };
        
        // Filtrar dados se necessário
        let disciplinasFiltradas = disciplinas;
        
        if (disciplinaSelecionada !== 'todas') {
            // Se uma disciplina específica foi selecionada, procurar pelo nome mapeado
            const nomeDisciplina = mapeamentoDisciplinas[disciplinaSelecionada];
            if (nomeDisciplina) {
                disciplinasFiltradas = disciplinas.filter(d => d === nomeDisciplina);
            }
        }
        
        // Preparar dados para o gráfico
        disciplinasFiltradas.forEach(disciplina => {
            const dados = dadosPeriodo[disciplina];
            if (!dados) return;
            
            dadosGrafico.labels.push(disciplina);
            dadosGrafico.data.push(dados.faltas);
            
            // Determinar cor com base no percentual
            let cor = '#22c55e'; // Verde (bom)
            if (dados.percentual >= 75) {
                cor = '#ef4444'; // Vermelho (crítico)
            } else if (dados.percentual >= 50) {
                cor = '#f59e0b'; // Amarelo (atenção)
            }
            
            dadosGrafico.backgroundColor.push(cor);
        });
        
        // Ordenar os dados por número de faltas (do maior para o menor)
        const indices = dadosGrafico.data.map((_, i) => i);
        indices.sort((a, b) => dadosGrafico.data[b] - dadosGrafico.data[a]);
        
        // Reordenar os arrays com base nos índices ordenados
        const labelsOrdenados = indices.map(i => dadosGrafico.labels[i]);
        const dadosOrdenados = indices.map(i => dadosGrafico.data[i]);
        const coresOrdenadas = indices.map(i => dadosGrafico.backgroundColor[i]);
        
        // Limitar a exibição a 5 disciplinas (todas as disciplinas originais)
        const limite = Math.min(5, labelsOrdenados.length);
        
        // Atualizar o gráfico
        faltasDisciplinaChart.data.labels = labelsOrdenados.slice(0, limite);
        faltasDisciplinaChart.data.datasets[0].data = dadosOrdenados.slice(0, limite);
        faltasDisciplinaChart.data.datasets[0].backgroundColor = coresOrdenadas.slice(0, limite);
        faltasDisciplinaChart.update();
    }
}

// Função para mostrar detalhes de uma disciplina selecionada
function mostrarDetalhesDisciplina(disciplina) {
    const detalhesContainer = document.getElementById('detalhes-disciplina');
    
    if (detalhesContainer) {
        // Simulação de dados de faltas específicas
        const datasFaltas = [
            { data: '12/03/2025', justificada: true, motivo: 'Atestado médico' },
            { data: '25/03/2025', justificada: false, motivo: '' },
            { data: '08/04/2025', justificada: false, motivo: '' },
            { data: '22/04/2025', justificada: true, motivo: 'Participação em evento escolar' }
        ];
        
        // Criar o conteúdo HTML dos detalhes
        let html = `<h3>Detalhes de Faltas: ${disciplina}</h3>
                    <p>Lista de datas:</p>
                    <ul>`;
        
        datasFaltas.forEach(falta => {
            const statusFalta = falta.justificada ? 
                `<span class="falta-justificada">Justificada</span> (${falta.motivo})` : 
                `<span class="falta-nao-justificada">Não justificada</span>`;
            
            html += `<li>${falta.data} - ${statusFalta}</li>`;
        });
        
        html += `</ul>`;
        
        // Atualizar e exibir o contêiner de detalhes
        detalhesContainer.innerHTML = html;
        detalhesContainer.style.display = 'block';
    }
}

// Função para salvar a tabela de faltas como imagem
function salvarTabelaFaltas() {
    // Utilizando html2canvas para converter a tabela em uma imagem
    html2canvas(document.querySelector('.faltas-container')).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'faltas.png';
        link.click();
    });
}

// Função para salvar o gráfico como imagem
function saveAsImage() {
    const canvas = document.getElementById('performanceChart');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'desempenho.png';
    link.click();
}

// Função para inicializar tooltips personalizados
function initTooltips() {
    // Tooltips para as barras de progresso de faltas
    const barras = document.querySelectorAll('.progress-bar');
    
    barras.forEach(barra => {
        const fill = barra.querySelector('.progress-fill');
        if (fill) {
            const width = fill.style.width || '0%';
            const porcentagem = parseFloat(width);
            
            let message = '';
            if (porcentagem > 75) {
                message = 'Situação crítica: Risco de reprovação por faltas!';
            } else if (porcentagem > 50) {
                message = 'Atenção: Acima da média de faltas recomendada.';
            } else {
                message = 'Situação normal: Quantidade de faltas dentro do esperado.';
            }
            
            barra.setAttribute('title', message);
            barra.setAttribute('data-tooltip', message);
            
            // Criar um tooltip simples ao passar o mouse
            barra.addEventListener('mouseover', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = message;
                document.body.appendChild(tooltip);
                
                // Posicionar o tooltip
                const rect = barra.getBoundingClientRect();
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.opacity = '1';
                
                // Armazenar referência ao tooltip
                barra.tooltip = tooltip;
            });
            
            barra.addEventListener('mouseout', function(e) {
                if (barra.tooltip) {
                    document.body.removeChild(barra.tooltip);
                    barra.tooltip = null;
                }
            });
        }
    });
}
