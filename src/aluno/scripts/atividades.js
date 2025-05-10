document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const tabButtons = document.querySelectorAll('.tab-button');
    const activityCards = document.querySelectorAll('.activity-card');
    const statusSelect = document.getElementById('status-select');
    const materiaSelect = document.getElementById('materia-select');
    const prazoSelect = document.getElementById('prazo-select');
    const searchInput = document.getElementById('search-input');
    const feedbackButtons = document.querySelectorAll('.btn-feedback');
    const feedbackPopup = document.getElementById('feedback-popup');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    
    // Encontrar o botão "Lista de atividades"
    const listaAtividadesBtn = document.querySelector('.btn-primary');
    if (listaAtividadesBtn) {
        // Adicionar evento de clique para redirecionamento
        listaAtividadesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirecionar para a página de lista de atividades
            window.location.href = 'lista-atividades.html';
        });
    }
    
    // Filtrar atividades por abas
    function filterByTab(tabType) {
        activityCards.forEach(card => {
            if (tabType === 'todas' || card.dataset.status === tabType || 
                (tabType === 'hoje' && card.dataset.due === 'hoje') ||
                (tabType === 'pendentes' && card.dataset.status === 'pendente') ||
                (tabType === 'concluidas' && card.dataset.status === 'concluida')) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filtrar atividades por seleção
    function filterActivities() {
        const statusFilter = statusSelect.value;
        const materiaFilter = materiaSelect.value;
        const prazoFilter = prazoSelect.value;
        const searchFilter = searchInput.value.toLowerCase();
        
        activityCards.forEach(card => {
            const statusMatch = statusFilter === 'todas' || card.dataset.status === statusFilter;
            const materiaMatch = materiaFilter === 'todas' || card.dataset.subject === materiaFilter;
            const prazoMatch = prazoFilter === 'todos' || card.dataset.due === prazoFilter;
            const title = card.querySelector('.activity-title').textContent.toLowerCase();
            const description = card.querySelector('.activity-description').textContent.toLowerCase();
            const searchMatch = title.includes(searchFilter) || description.includes(searchFilter);
            
            if (statusMatch && materiaMatch && prazoMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event listeners para as abas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            // Filtra as atividades pela aba selecionada
            filterByTab(button.dataset.tab);
        });
    });
    
    // Event listeners para os filtros
    statusSelect.addEventListener('change', filterActivities);
    materiaSelect.addEventListener('change', filterActivities);
    prazoSelect.addEventListener('change', filterActivities);
    
    // Event listener para pesquisa com debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterActivities, 300);
    });
    
    // Ações rápidas nos cards
    const quickActionButtons = document.querySelectorAll('.btn-quick-action');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityCard = this.closest('.activity-card');
            const activityId = activityCard.dataset.id;
            window.location.href = `atividade-status.html?id=${activityId}&action=submit`;
        });
    });
    
    // Configurar dados dinâmicos no popup de feedback
    function updateFeedbackPopup(activityData) {
        const feedbackInfo = feedbackPopup.querySelector('.feedback-info');
        if (feedbackInfo) {
            const titleElement = feedbackInfo.querySelector('h3');
            if (titleElement) {
                titleElement.textContent = activityData.title || 'Atividade';
            }
            
            const gradeValue = feedbackInfo.querySelector('.grade-value');
            if (gradeValue) {
                gradeValue.textContent = activityData.grade || '0.0';
            }
        }
    }
    
    // Abrir popup de feedback
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Fecha qualquer popup aberto anteriormente
            if (feedbackPopup.style.display === 'block') {
                feedbackPopup.style.display = 'none';
            }
            
            // Encontra o card da atividade
            const card = this.closest('.activity-card');
            const activityTitle = card.querySelector('.activity-title').textContent;
            const activitySubject = card.querySelector('.activity-subject').textContent;
            const gradeElement = card.querySelector('.grade');
            const gradeText = gradeElement ? gradeElement.textContent.match(/[\d.]+/)[0] : '0.0';
            
            // Atualiza os dados do popup
            updateFeedbackPopup({
                title: `${activityTitle} - ${activitySubject}`,
                grade: gradeText
            });
            
            // Garante que o popup esteja no body
            document.body.appendChild(feedbackPopup);
            
            // Remove qualquer classe de overlay remanescente
            feedbackPopup.classList.remove('popup-overlay');
            
            // Posiciona o popup
            const buttonRect = this.getBoundingClientRect();
            
            // Define estilos para o popup usando position fixed
            feedbackPopup.style.position = 'fixed';
            feedbackPopup.style.display = 'block';
            feedbackPopup.style.width = '400px';
            
            // Calcula dimensões do popup
            const popupRect = feedbackPopup.getBoundingClientRect();
            
            // Decide se mostra em cima ou embaixo do botão baseado na posição na tela
            let top;
            let left = buttonRect.left;
            
            // Se o botão estiver na metade superior da tela, abre para baixo
            // Se estiver na metade inferior, abre para cima
            const isInTopHalf = buttonRect.top < window.innerHeight / 2;
            
            if (isInTopHalf) {
                // Abre para baixo
                top = buttonRect.bottom + 10;
                // Verifica se ultrapassa o bottom da tela
                if (top + popupRect.height > window.innerHeight - 20) {
                    // Se não couber embaixo, abre em cima
                    top = buttonRect.top - popupRect.height - 10;
                }
            } else {
                // Abre para cima
                top = buttonRect.top - popupRect.height - 10;
                // Verifica se ultrapassa o top da tela
                if (top < 20) {
                    // Se não couber em cima, abre embaixo
                    top = buttonRect.bottom + 10;
                }
            }
            
            // Ajusta para não sair da tela horizontalmente
            if (left + popupRect.width > window.innerWidth) {
                left = window.innerWidth - popupRect.width - 20;
            }
            
            // Garantir que não saia da tela pela esquerda
            if (left < 10) {
                left = 10;
            }
            
            // Aplica as posições
            feedbackPopup.style.top = top + 'px';
            feedbackPopup.style.left = left + 'px';
            feedbackPopup.style.zIndex = '1000';
        });
    });
    
    // Fechar popup ao clicar no X
    closePopupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const popup = this.closest('#feedback-popup');
            if (popup) {
                popup.style.display = 'none';
            }
        });
    });
    
    // Fechar popup ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (feedbackPopup.style.display === 'block') {
            const isClickInside = feedbackPopup.contains(e.target);
            const isClickOnButton = e.target.closest('.btn-feedback');
            
            if (!isClickInside && !isClickOnButton) {
                feedbackPopup.style.display = 'none';
            }
        }
    });

    // Fechar popup ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && feedbackPopup.style.display === 'block') {
            feedbackPopup.style.display = 'none';
        }
    });

    // Função para ajustar altura dos cards
    function adjustCardHeights() {
        const cards = document.querySelectorAll('.activity-card');
        if (cards.length === 0) return;
        
        // Reset heights
        cards.forEach(card => {
            card.style.height = '';
        });
        
        // Encontrar a altura máxima
        let maxHeight = 0;
        cards.forEach(card => {
            const height = card.getBoundingClientRect().height;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        // Aplicar a altura máxima
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }

    // Executar ao carregar a página
    setTimeout(adjustCardHeights, 100);

    // Executar ao redimensionar
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustCardHeights, 250);
    });

    // Ajustar após mudanças de filtro
    const originalFilterActivities = window.filterActivities || filterActivities;
    window.filterActivities = function() {
        originalFilterActivities.apply(this, arguments);
        setTimeout(adjustCardHeights, 100);
    }

    // Ajustar após mudanças de aba
    const originalFilterByTab = window.filterByTab || filterByTab;
    window.filterByTab = function(tabType) {
        originalFilterByTab.apply(this, arguments);
        setTimeout(adjustCardHeights, 100);
    }
});