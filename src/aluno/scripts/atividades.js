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

    // Encontrar o botão "Ver Calendário"
    const verCalendarioBtn = document.querySelector('.btn-secondary');
    if (verCalendarioBtn) {
        verCalendarioBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'calendario-atividades.html';
        });
    }
    
    // Encontrar o botão "Lista de atividades"
    const listaAtividadesBtn = document.querySelector('.btn-primary');
    if (listaAtividadesBtn) {
        listaAtividadesBtn.addEventListener('click', function(e) {
            e.preventDefault();
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
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
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
            
            // Se o popup já está aberto para este botão, fecha
            if (feedbackPopup.style.display === 'block' && 
                feedbackPopup.dataset.activeButton === this.dataset.buttonId) {
                feedbackPopup.style.display = 'none';
                feedbackPopup.dataset.activeButton = null;
                return;
            }
            
            // Fecha qualquer popup aberto anteriormente
            feedbackPopup.style.display = 'none';
            feedbackPopup.dataset.activeButton = null;
            
            // Gera um ID único para o botão se não tiver
            if (!this.dataset.buttonId) {
                this.dataset.buttonId = 'btn-' + Date.now();
            }
            feedbackPopup.dataset.activeButton = this.dataset.buttonId;
            
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
            
            // Anexa o popup ao body
            document.body.appendChild(feedbackPopup);
            
            // Define estilos do popup
            feedbackPopup.style.position = 'absolute';
            feedbackPopup.style.display = 'block';
            
            // Posiciona o popup
            const buttonRect = this.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Calcula posição absoluta incluindo scroll
            let top = buttonRect.bottom + scrollTop + 10;
            let left = buttonRect.left + scrollLeft;
            
            // Define posição inicial
            feedbackPopup.style.top = top + 'px';
            feedbackPopup.style.left = left + 'px';
            
            // Ajusta posição após renderização
            setTimeout(() => {
                const popupRect = feedbackPopup.getBoundingClientRect();
                
                // Verifica se ultrapassa os limites da viewport
                if (popupRect.bottom > window.innerHeight - 20) {
                    // Se não cabe embaixo, abre em cima
                    top = buttonRect.top + scrollTop - popupRect.height - 10;
                    feedbackPopup.style.top = top + 'px';
                }
                
                if (popupRect.right > window.innerWidth - 20) {
                    // Se sai pela direita, alinha à direita do botão
                    left = buttonRect.right + scrollLeft - popupRect.width;
                    feedbackPopup.style.left = left + 'px';
                }
                
                if (left < 10) {
                    feedbackPopup.style.left = '10px';
                }
            }, 0);
        });
    });
    
    // Fechar popup ao clicar no X
    closePopupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const popup = this.closest('#feedback-popup');
            if (popup) {
                popup.style.display = 'none';
                popup.dataset.activeButton = null;
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
                feedbackPopup.dataset.activeButton = null;
            }
        }
    });

    // Fechar popup ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && feedbackPopup.style.display === 'block') {
            feedbackPopup.style.display = 'none';
            feedbackPopup.dataset.activeButton = null;
        }
    });

    function preserveCardLayout() {
        const cards = document.querySelectorAll('.activity-card');
        
        cards.forEach(card => {
            // Garante que o card mantenha sua estrutura
            card.style.minHeight = '280px';
            card.style.height = '280px';
            
            // Garante que as actions fiquem no final
            const actions = card.querySelector('.activity-actions');
            if (actions) {
                actions.style.gridRow = '5';
            }
        });
    }

    // Chame esta função após aplicar filtros
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button') || 
            e.target.closest('.tab-button')) {
            setTimeout(preserveCardLayout, 10);
        }
    });

    function fixCardLayout() {
        const cards = document.querySelectorAll('.activity-card');
        
        cards.forEach(card => {
            // Garante estrutura correta
            let body = card.querySelector('.activity-body');
            if (!body) {
                // Cria o container body se não existir
                body = document.createElement('div');
                body.className = 'activity-body';
                
                // Move o conteúdo para dentro do body
                const content = card.querySelector('.activity-content');
                if (content && content.parentNode === card) {
                    body.appendChild(content);
                    // Insere o body após o header
                    const header = card.querySelector('.activity-header');
                    if (header) {
                        header.insertAdjacentElement('afterend', body);
                    }
                }
            }
            
            // Força posições absolutas
            const meta = card.querySelector('.activity-meta');
            const actions = card.querySelector('.activity-actions');
            
            if (meta) {
                meta.style.position = 'absolute';
                meta.style.bottom = '75px';
                meta.style.left = '0';
                meta.style.right = '0';
                meta.style.height = '60px';
            }
            
            if (actions) {
                actions.style.position = 'absolute';
                actions.style.bottom = '0';
                actions.style.left = '0';
                actions.style.right = '0';
                actions.style.height = '75px';
                actions.style.backgroundColor = card.closest('body').classList.contains('dark-theme') 
                    ? 'var(--background-elemento-escuro)' 
                    : 'white';
            }
        });
    }

    // Executa quando a página carrega
    document.addEventListener('DOMContentLoaded', fixCardLayout);

    // Executa após mudanças nos filtros
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button') || 
            e.target.classList.contains('select-field') ||
            e.target.closest('.tab-button') ||
            e.target.closest('.select-field')) {
            setTimeout(fixCardLayout, 10);
        }
    });

    // Observa mudanças no DOM
    if (document.querySelector('.activities-list')) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    fixCardLayout();
                }
            });
        });
        
        const config = { childList: true, subtree: true };
        observer.observe(document.querySelector('.activities-list'), config);
    }

    // Executa também quando muda o tema
    document.addEventListener('click', function(e) {
        if (e.target.id === 'theme-toggle' || e.target.closest('#theme-toggle')) {
            setTimeout(fixCardLayout, 100);
        }
    });
});