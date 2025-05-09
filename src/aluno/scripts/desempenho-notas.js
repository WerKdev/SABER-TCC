document.addEventListener("DOMContentLoaded", function() {
    
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");

    menuIconSidebar.addEventListener("click", function() {
        sidebar.classList.toggle("active");
    });

    const menuIconMobile = document.getElementById("menu-icon-mobile");

    menuIconMobile.addEventListener("click", function() {
        sidebar.classList.toggle("active"); 
    });

    const notificationsIcon = document.getElementById("notifications-icon");
    const notificationsPopup = document.getElementById("notifications-popup");
    
    notificationsIcon.addEventListener("click", function(event) {
        notificationsPopup.style.display = 
            (notificationsPopup.style.display === "none" || notificationsPopup.style.display === "") ? "block" : "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!notificationsPopup.contains(event.target) && event.target !== notificationsIcon) {
            notificationsPopup.style.display = "none";
        }
    });

    const userIcon = document.getElementById("user-icon");
    const userIconPopup = document.getElementById("user-icon-popup");

    userIcon.addEventListener("click", function(event) {
        userIconPopup.style.display = 
            (userIconPopup.style.display === "none" || userIconPopup.style.display === "") ? "block" : "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!userIconPopup.contains(event.target) && event.target !== userIcon) {
            userIconPopup.style.display = "none";
        }
    });

    function checkWindowSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        }
    }

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize(); 
});
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

// Variável para armazenar a instância do gráfico
let performanceChart;

// Inicializar o gráfico quando a página carregar
window.onload = function() {
    updateChart();
};

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
// Função para salvar o gráfico como imagem
function saveAsImage() {
    const canvas = document.getElementById('performanceChart');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'desempenho.png';
    link.click();
}