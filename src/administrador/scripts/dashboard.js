document.addEventListener("DOMContentLoaded", function() {
    
    // Função para obter cores do gráfico com base no tema (claro/escuro)
    function getChartThemeColors() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        return {
            grid: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            ticks: isDarkTheme ? '#cbd5e1' : '#475569',
            legend: isDarkTheme ? '#f8fafc' : '#0f172a',
        };
    }

    // --- GRÁFICO 1: Desempenho Geral da Escola ---
    const desempenhoCtx = document.getElementById('desempenhoGeralChart');
    if (desempenhoCtx) {
        const colors = getChartThemeColors();
        new Chart(desempenhoCtx, {
            type: 'line',
            data: {
                labels: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
                datasets: [{
                    label: 'Média Geral de Notas',
                    data: [7.5, 7.8, 7.7, 8.1, 8.0, 8.2, 8.4],
                    borderColor: '#0048a5',
                    backgroundColor: 'rgba(0, 72, 165, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 6,
                        grid: { color: colors.grid },
                        ticks: { color: colors.ticks }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: colors.ticks }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: colors.legend }
                    }
                }
            }
        });
    }

    // --- GRÁFICO 2: Distribuição de Alunos por Série ---
    const distribuicaoCtx = document.getElementById('distribuicaoAlunosChart');
    if (distribuicaoCtx) {
        const colors = getChartThemeColors();
        new Chart(distribuicaoCtx, {
            type: 'doughnut',
            data: {
                labels: ['Fundamental I', 'Fundamental II', 'Ensino Médio'],
                datasets: [{
                    data: [450, 520, 277],
                    backgroundColor: ['#0048a5', '#42a5f5', '#bbdefb'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: colors.legend }
                    }
                }
            }
        });
    }

    // --- GRÁFICO 3: Uso dos Módulos da Plataforma ---
    const usoCtx = document.getElementById('usoPlataformaChart');
    if (usoCtx) {
        const colors = getChartThemeColors();
        new Chart(usoCtx, {
            type: 'bar',
            data: {
                labels: ['Relatórios', 'Atividades', 'Redações', 'Materiais', 'Comunicação'],
                datasets: [{
                    label: 'Nº de Interações (Mês)',
                    data: [230, 850, 420, 600, 310],
                    backgroundColor: '#0062cc',
                    borderRadius: 4,
                    barThickness: 25,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        grid: { display: false },
                        ticks: { color: colors.ticks }
                    },
                    x: {
                        grid: { color: colors.grid },
                        ticks: { color: colors.ticks }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    console.log("Dashboard do Administrador Institucional carregado e gráficos renderizados.");
});