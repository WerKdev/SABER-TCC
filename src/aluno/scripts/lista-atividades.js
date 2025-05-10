document.addEventListener("DOMContentLoaded", function() {
    // Inicializar o gráfico
    initActivityChart();
    
    // Event listener para o campo de busca
    const searchInput = document.querySelector('.activity-search');
    searchInput.addEventListener('input', function(e) {
        filterActivities(e.target.value);
    });
    
    // Event listener para o botão "Ver mais"
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        loadMoreActivities();
    });
    
    // Event listener para os itens de atividade
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityTitle = this.querySelector('h4').textContent;
            // Redirecionar para a página de detalhes da atividade ou abrir em modal
            console.log('Atividade clicada:', activityTitle);
        });
    });
    
    // Event listener para os botões de menu de opções
    const moreOptionsButtons = document.querySelectorAll('.more-options');
    moreOptionsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que o clique propague para o item da atividade
            showOptionsMenu(this);
        });
    });
});

// Função para inicializar o gráfico de pizza
function initActivityChart() {
    const ctx = document.getElementById('activities-chart');
    if (!ctx) return;
    
    const entregues = 16;
    const total = 20;
    const naoEntregues = total - entregues;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Entregues', 'Não Entregues'],
            datasets: [{
                data: [entregues, naoEntregues],
                backgroundColor: ['#0048A5', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Função para filtrar atividades
function filterActivities(searchTerm) {
    const activityItems = document.querySelectorAll('.activity-item');
    searchTerm = searchTerm.toLowerCase();
    
    activityItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const deadline = item.querySelector('.activity-deadline').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || deadline.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Função para carregar mais atividades
function loadMoreActivities() {
    // Aqui você implementaria a lógica para carregar mais atividades do backend
    console.log('Carregando mais atividades...');
    
    // Exemplo de adição de mais atividades (simulado)
    const activitiesList = document.querySelector('.activities-list-wrapper');
    const newActivities = [
        {
            type: 'pending',
            title: 'Atividade de Exemplo 1',
            deadline: 'Data de entrega: 20 de mai., 23:59'
        },
        {
            type: 'submitted',
            title: 'Atividade de Exemplo 2',
            deadline: 'Item postado: 5 de mai.'
        }
    ];
    
    newActivities.forEach(activity => {
        const activityItem = createActivityElement(activity);
        activitiesList.insertBefore(activityItem, document.querySelector('.load-more-btn'));
    });
}

// Função para criar um elemento de atividade
function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    
    div.innerHTML = `
        <span class="material-symbols-outlined activity-type-icon ${activity.type === 'submitted' ? 'submitted' : 'pending'}">
            ${activity.type === 'submitted' ? 'assignment' : 'description'}
        </span>
        <div class="activity-details">
            <h4>${activity.title}</h4>
            <span class="activity-deadline">${activity.deadline}</span>
        </div>
        <span class="material-symbols-outlined more-options">more_vert</span>
    `;
    
    // Adicionar event listeners
    div.addEventListener('click', function() {
        console.log('Atividade clicada:', activity.title);
    });
    
    div.querySelector('.more-options').addEventListener('click', function(e) {
        e.stopPropagation();
        showOptionsMenu(this);
    });
    
    return div;
}

// Função para mostrar menu de opções
function showOptionsMenu(button) {
    // Aqui você implementaria a lógica para mostrar um menu de opções
    console.log('Menu de opções clicado');
    
    // Exemplo básico de menu de opções
    const existingMenu = document.querySelector('.options-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement('div');
    menu.className = 'options-menu';
    menu.innerHTML = `
        <ul>
            <li>Visualizar detalhes</li>
            <li>Marcar como concluído</li>
            <li>Remover</li>
        </ul>
    `;
    
    menu.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 1000;
        min-width: 160px;
    `;
    
    button.parentElement.style.position = 'relative';
    button.parentElement.appendChild(menu);
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && e.target !== button) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
}


// Função para criar um elemento de atividade
function createActivityElement(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    
    // Determinar o status baseado no tipo de atividade
    let statusText = 'Aguardando envio';
    let statusClass = 'waiting';
    
    if (activity.type === 'submitted') {
        statusText = 'Entregue';
        statusClass = 'completed';
    } else if (activity.isLate) {  // Você precisaria adicionar essa propriedade na atividade
        statusText = 'Atrasado';
        statusClass = 'late';
    }
    
    div.innerHTML = `
        <span class="material-symbols-outlined activity-type-icon ${activity.type === 'submitted' ? 'submitted' : 'pending'}">
            ${activity.type === 'submitted' ? 'assignment' : 'description'}
        </span>
        <div class="activity-details">
            <h4>${activity.title}</h4>
            <span class="activity-deadline">${activity.deadline}</span>
        </div>
        <span class="activity-status ${statusClass}">${statusText}</span>
        <span class="material-symbols-outlined more-options">more_vert</span>
    `;
    
    // Adicionar event listeners
    div.addEventListener('click', function() {
        console.log('Atividade clicada:', activity.title);
    });
    
    div.querySelector('.more-options').addEventListener('click', function(e) {
        e.stopPropagation();
        showOptionsMenu(this);
    });
    
    return div;
}