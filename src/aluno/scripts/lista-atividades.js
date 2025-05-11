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
            deadline: 'Data de entrega: 20 de mai., 23:59',
            isLate: false
        },
        {
            type: 'submitted',
            title: 'Atividade de Exemplo 2',
            deadline: 'Item postado: 5 de mai.',
            isLate: false
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
    
    // Determinar o status baseado no tipo de atividade
    let statusText = 'Aguardando envio';
    let statusClass = 'waiting';
    
    if (activity.type === 'submitted') {
        statusText = 'Entregue';
        statusClass = 'completed';
    } else if (activity.isLate) {
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

// Função para mostrar menu de opções
function showOptionsMenu(button) {
    // Remove menu existente se houver
    const existingMenu = document.querySelector('.options-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    // Verificar se a atividade já está concluída
    const activityItem = button.closest('.activity-item');
    const statusElement = activityItem.querySelector('.activity-status');
    const isCompleted = statusElement && statusElement.classList.contains('completed');
    
    // Criar menu
    const menu = document.createElement('div');
    menu.className = 'options-menu';
    menu.innerHTML = `
        <ul>
            <li data-action="view">
                <span class="material-symbols-outlined">visibility</span>
                Visualizar detalhes
            </li>
            ${isCompleted ? `
            <li data-action="cancel-submission">
                <span class="material-symbols-outlined">cancel</span>
                Cancelar envio
            </li>
            ` : `
            <li data-action="complete">
                <span class="material-symbols-outlined">check_circle</span>
                Marcar como concluído
            </li>
            `}
            <li data-action="copy-link">
                <span class="material-symbols-outlined">link</span>
                Copiar link
            </li>
        </ul>
    `;
    
    // Adicionar ao item da atividade para posicionamento relativo
    activityItem.style.position = 'relative';
    activityItem.appendChild(menu);
    
    // Posicionar menu em relação ao botão
    const buttonRect = button.getBoundingClientRect();
    const itemRect = activityItem.getBoundingClientRect();
    
    // Calcular posição relativa ao item
    const relativeLeft = buttonRect.left - itemRect.left;
    const relativeTop = buttonRect.bottom - itemRect.top + 5;
    
    // Aplicar posicionamento
    menu.style.left = `${relativeLeft - 180}px`; // 180 para alinhar à direita do botão
    menu.style.top = `${relativeTop}px`;
    
    // Verificar se o menu sai da tela e ajustar se necessário
    setTimeout(() => {
        const menuRect = menu.getBoundingClientRect();
        
        // Ajustar se sair pela direita
        if (menuRect.right > window.innerWidth) {
            menu.style.left = 'auto';
            menu.style.right = '0px';
        }
        
        // Ajustar se sair por baixo
        if (menuRect.bottom > window.innerHeight) {
            menu.style.top = `${relativeTop - menuRect.height - buttonRect.height - 10}px`;
        }
    }, 0);
    
    // Adicionar animação de entrada
    menu.style.animation = 'fadeIn 0.15s ease-out';
    
    // Adicionar event listeners para as ações
    const items = menu.querySelectorAll('li');
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.dataset.action;
            handleMenuAction(action, button.closest('.activity-item'));
            menu.remove();
        });
    });
    
    // Fechar menu ao clicar fora
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.style.animation = 'fadeOut 0.15s ease-out';
                setTimeout(() => {
                    if (menu.parentNode) {
                        menu.remove();
                    }
                }, 150);
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

// Função para lidar com as ações do menu
function handleMenuAction(action, activityItem) {
    const activityTitle = activityItem.querySelector('h4').textContent;
    
    switch(action) {
        case 'view':
            console.log('Visualizando detalhes de:', activityTitle);
            // Redirecionar para página de detalhes
            break;
        case 'complete':
            showCompleteConfirmPopup(activityItem);
            break;
        case 'cancel-submission':
            showCancelConfirmPopup(activityItem);
            break;
        case 'copy-link':
            console.log('Copiando link da atividade:', activityTitle);
            // Lógica para copiar o link para a área de transferência
            const link = window.location.origin + '/atividade/' + encodeURIComponent(activityTitle);
            copyToClipboard(link);
            break;
    }
}

// Função para mostrar popup de confirmação para marcar como concluído
function showCompleteConfirmPopup(activityItem) {
    // Remove popup existente se houver
    const existingPopup = document.querySelector('.complete-confirm-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Criar popup
    const popup = document.createElement('div');
    popup.className = 'popup-overlay complete-confirm-popup';
    popup.innerHTML = `
        <div class="popup confirm-popup">
            <div class="popup-header">
                <h2>Marcar como concluída?</h2>
                <span class="material-symbols-outlined close-popup">close</span>
            </div>
            <div class="popup-content">
                <p>Tem certeza que deseja marcar esta atividade como concluída?</p>
                <div class="popup-actions">
                    <button type="button" class="btn-cancel">Cancelar</button>
                    <button type="button" class="btn-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Adicionar event listeners
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-cancel').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-confirm').addEventListener('click', () => {
        markAsCompleted(activityItem);
        popup.remove();
    });
    
    // Fechar ao clicar fora do popup
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

// Função para mostrar popup de confirmação para cancelar envio
function showCancelConfirmPopup(activityItem) {
    // Remove popup existente se houver
    const existingPopup = document.querySelector('.cancel-confirm-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Criar popup
    const popup = document.createElement('div');
    popup.className = 'popup-overlay cancel-confirm-popup';
    popup.innerHTML = `
        <div class="popup confirm-popup">
            <div class="popup-header">
                <h2>Cancelar o envio?</h2>
                <span class="material-symbols-outlined close-popup">close</span>
            </div>
            <div class="popup-content">
                <p>Cancele o envio para adicionar ou alterar anexos. Não se esqueça de enviar a atividade novamente depois de concluir a alteração.</p>
                <div class="popup-actions">
                    <button type="button" class="btn-cancel">Cancelar</button>
                    <button type="button" class="btn-confirm">Cancelar envio</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Adicionar event listeners
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-cancel').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-confirm').addEventListener('click', () => {
        cancelSubmission(activityItem);
        popup.remove();
    });
    
    // Fechar ao clicar fora do popup
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

// Função para marcar atividade como concluída
function markAsCompleted(activityItem) {
    // Atualizar o status
    const statusElement = activityItem.querySelector('.activity-status');
    statusElement.textContent = 'Entregue';
    statusElement.className = 'activity-status completed';
    
    // Atualizar o ícone
    const iconElement = activityItem.querySelector('.activity-type-icon');
    iconElement.className = 'material-symbols-outlined activity-type-icon submitted';
    iconElement.textContent = 'assignment';
    
    // Aqui você faria uma chamada para a API para atualizar o status no backend
    console.log('Atividade marcada como concluída:', activityItem.querySelector('h4').textContent);
}

// Função para cancelar envio
function cancelSubmission(activityItem) {
    // Atualizar o status
    const statusElement = activityItem.querySelector('.activity-status');
    statusElement.textContent = 'Aguardando envio';
    statusElement.className = 'activity-status waiting';
    
    // Atualizar o ícone
    const iconElement = activityItem.querySelector('.activity-type-icon');
    iconElement.className = 'material-symbols-outlined activity-type-icon pending';
    iconElement.textContent = 'description';
    
    // Aqui você faria uma chamada para a API para atualizar o status no backend
    console.log('Envio cancelado:', activityItem.querySelector('h4').textContent);
}

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            // Fallback para método antigo
            copyToClipboardFallback(text);
        });
    } else {
        // Fallback para navegadores mais antigos
        copyToClipboardFallback(text);
    }
}

// Fallback para copiar texto em navegadores mais antigos
function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Link copiado para a área de transferência!');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showToast('Erro ao copiar o link');
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificação toast
function showToast(message) {
    // Remove toast existente se houver
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Criar toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remover toast após 3 segundos
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}