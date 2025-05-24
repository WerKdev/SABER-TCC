document.addEventListener("DOMContentLoaded", function() {
    // ===== ELEMENTOS DOM =====
    // Atividades e modais
    const activityCards = document.querySelectorAll(".activity-card");
    const tabButtons = document.querySelectorAll(".tab-button");
    const calendarBtn = document.getElementById("btn-calendario");
    const reportsBtn = document.getElementById("btn-relatorios");
    const newActivityBtn = document.getElementById("btn-criar-atividade");
    const activityModal = document.getElementById("activity-modal");
    const deliveriesModal = document.getElementById("deliveries-modal");
    const closeModalButtons = document.querySelectorAll(".close-modal");
    const editButtons = document.querySelectorAll(".btn-edit");
    const viewDeliveriesButtons = document.querySelectorAll(".btn-view-deliveries");
    
    // Filtros (SEM FILTRO DE STATUS - REMOVIDO)
    const turmaSelect = document.getElementById("turma-select");
    const periodoSelect = document.getElementById("periodo-select");
    const searchInput = document.getElementById("search-input");
    
    // Formulário
    const activityForm = document.getElementById("activity-form");
    const fileUploadArea = document.querySelector(".file-upload-area");
    const fileInput = document.getElementById("activity-files");
    const uploadedFilesContainer = document.querySelector(".uploaded-files");
    const startDateInput = document.getElementById("activity-start-date");
    const dueDateInput = document.getElementById("activity-due-date");
    
    // Modal de entregas
    const deliveryTabs = document.querySelectorAll(".tabs .tab");
    const tabContents = document.querySelectorAll(".tab-content");
    const deliveryStatusFilter = document.getElementById("delivery-status-filter");
    const deliverySearchInput = document.querySelector(".search-delivery input");

    // ===== CONFIGURAÇÕES DE DATA =====
    
    // Data atual: 15 de maio de 2025 (último dia do 1º trimestre)
    const TODAY = new Date(2025, 4, 15); // Mês 4 = maio (0-indexed)
    
    // Definição dos trimestres
    const TRIMESTRES = {
        1: { inicio: new Date(2025, 1, 1), fim: new Date(2025, 4, 15) }, // 1 fev - 15 mai
        2: { inicio: new Date(2025, 4, 16), fim: new Date(2025, 7, 15) }, // 16 mai - 15 ago
        3: { inicio: new Date(2025, 7, 16), fim: new Date(2025, 10, 20) } // 16 ago - 20 nov
    };

    // ===== FUNÇÕES DE FILTRAGEM ATUALIZADAS =====

    // Função para obter trimestre de uma data
    function getTrimestre(data) {
        for (let trimestre in TRIMESTRES) {
            const { inicio, fim } = TRIMESTRES[trimestre];
            if (data >= inicio && data <= fim) {
                return parseInt(trimestre);
            }
        }
        return null;
    }

    // Função para parsear data do formato brasileiro
    function parseDataBrasileira(dataTexto) {
        if (dataTexto.includes('HOJE')) {
            return TODAY;
        }
        
        const match = dataTexto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (match) {
            const [, dia, mes, ano] = match;
            return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
        }
        
        return null;
    }

    // Filtrar atividades - versão sem filtro de status dropdown
    function filterActivities() {
        const turmaFilter = turmaSelect ? turmaSelect.value : 'todas';
        const periodoFilter = periodoSelect ? periodoSelect.value : 'todos';
        const searchFilter = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        // Obter status ativo das abas
        const activeTab = document.querySelector('.tab-button.active');
        const statusFilter = activeTab ? activeTab.dataset.tab : 'todas';
        
        let visibleCount = 0;
        
        activityCards.forEach(card => {
            let shouldShow = true;
            
            // Filtro por Turma
            if (turmaFilter !== 'todas') {
                const cardTurma = card.dataset.turma;
                if (cardTurma !== turmaFilter) {
                    shouldShow = false;
                }
            }
            
            // Filtro por Status (baseado nas abas)
            if (statusFilter !== 'todas' && shouldShow) {
                const cardStatus = card.dataset.status;
                
                let isStatusMatch = false;
                switch (statusFilter) {
                    case 'ativas':
                        isStatusMatch = cardStatus === 'ativa';
                        break;
                    case 'avaliar':
                        // Atividades que precisam de avaliação
                        isStatusMatch = cardStatus === 'pendente' || 
                                       (cardStatus === 'ativa' && card.querySelector('.delivery-stat.warning'));
                        break;
                    case 'finalizadas':
                        isStatusMatch = cardStatus === 'finalizada';
                        break;
                    default:
                        isStatusMatch = true;
                }
                
                if (!isStatusMatch) {
                    shouldShow = false;
                }
            }
            
            // Filtro por Período
            if (periodoFilter !== 'todos' && shouldShow) {
                const dateElement = card.querySelector('.activity-date span:last-child');
                if (dateElement) {
                    const dateText = dateElement.textContent;
                    const periodMatch = checkPeriodMatch(dateText, periodoFilter);
                    if (!periodMatch) {
                        shouldShow = false;
                    }
                }
            }
            
            // Filtro por Pesquisa
            if (searchFilter && shouldShow) {
                const title = card.querySelector('.activity-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.activity-description')?.textContent.toLowerCase() || '';
                const turma = card.querySelector('.activity-turma')?.textContent.toLowerCase() || '';
                
                const searchMatch = title.includes(searchFilter) || 
                                   description.includes(searchFilter) || 
                                   turma.includes(searchFilter);
                
                if (!searchMatch) {
                    shouldShow = false;
                }
            }
            
            // Aplicar visibilidade
            if (shouldShow) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Gerenciar mensagem de "nenhum resultado"
        manageNoResultsMessage(visibleCount);
        
        // Atualizar contador
        updateActivityCounter(visibleCount);
    }

    // Verificar se a data corresponde ao período
    function checkPeriodMatch(dateText, period) {
        const entryDate = parseDataBrasileira(dateText);
        if (!entryDate) return false;
        
        switch (period) {
            case 'passado':
                return entryDate < TODAY;
                
            case 'hoje':
                return entryDate.toDateString() === TODAY.toDateString();
                
            case 'semana':
                // Semana atual (considerando domingo como início)
                const thisWeekStart = new Date(TODAY);
                thisWeekStart.setDate(TODAY.getDate() - TODAY.getDay());
                const thisWeekEnd = new Date(thisWeekStart);
                thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
                return entryDate >= thisWeekStart && entryDate <= thisWeekEnd;
                
            case 'mes':
                return entryDate.getMonth() === TODAY.getMonth() && 
                       entryDate.getFullYear() === TODAY.getFullYear();
                
            case 'trimestre':
                const currentTrimestre = getTrimestre(TODAY);
                const entryTrimestre = getTrimestre(entryDate);
                return currentTrimestre === entryTrimestre;
                
            default:
                return true;
        }
    }

    // Filtrar por abas - versão atualizada
    function filterByTab(tabName) {
        // Remover classe active de todas as abas
        tabButtons.forEach(btn => btn.classList.remove("active"));
        
        // Adicionar classe active à aba clicada
        const clickedTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (clickedTab) {
            clickedTab.classList.add("active");
        }
        
        // Se não for "todas", resetar outros filtros para melhor experiência
        if (tabName !== 'todas') {
            if (turmaSelect) turmaSelect.value = 'todas';
            if (periodoSelect) periodoSelect.value = 'todos';
            if (searchInput) searchInput.value = '';
        }
        
        // Aplicar filtros
        filterActivities();
    }

    // Resetar todos os filtros
    function resetFilters() {
        if (turmaSelect) turmaSelect.value = 'todas';
        if (periodoSelect) periodoSelect.value = 'todos';
        if (searchInput) searchInput.value = '';
        
        // Ativar a primeira aba (Todas as Atividades)
        tabButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === 0);
        });
        
        filterActivities();
    }

    // Gerenciar mensagem de "nenhum resultado"
    function manageNoResultsMessage(visibleCount) {
        const activitiesList = document.querySelector('.activities-list');
        let noResultsMessage = document.getElementById('no-results-message');
        
        if (visibleCount === 0) {
            if (!noResultsMessage) {
                // Criar mensagem centralizada
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'no-results-message';
                noResultsMessage.className = 'no-results';
                noResultsMessage.innerHTML = `
                    <span class="material-symbols-outlined">search_off</span>
                    <p>Nenhuma atividade encontrada com os filtros selecionados.</p>
                    <button class="btn-reset-filters" type="button">Limpar filtros</button>
                `;
                
                // Centralizar a mensagem na grid
                noResultsMessage.style.gridColumn = '1 / -1';
                noResultsMessage.style.justifySelf = 'center';
                noResultsMessage.style.alignSelf = 'center';
                noResultsMessage.style.textAlign = 'center';
                noResultsMessage.style.width = '100%';
                noResultsMessage.style.maxWidth = '400px';
                
                // Inserir no meio da lista (aproximadamente)
                const activityCards = activitiesList.querySelectorAll('.activity-card');
                if (activityCards.length > 0) {
                    // Inserir após o primeiro card para aparecer mais centralizado
                    const middleIndex = Math.floor(activityCards.length / 2);
                    if (activityCards[middleIndex]) {
                        activitiesList.insertBefore(noResultsMessage, activityCards[middleIndex]);
                    } else {
                        activitiesList.appendChild(noResultsMessage);
                    }
                } else {
                    activitiesList.appendChild(noResultsMessage);
                }
                
                // Adicionar evento para limpar filtros
                const resetBtn = noResultsMessage.querySelector('.btn-reset-filters');
                if (resetBtn) {
                    resetBtn.addEventListener('click', resetFilters);
                }
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Atualizar contador de atividades
    function updateActivityCounter(count) {
        let counterElement = document.getElementById('activity-counter');
        const activitiesList = document.querySelector('.activities-list');
        
        if (!counterElement && activitiesList) {
            counterElement = document.createElement('div');
            counterElement.id = 'activity-counter';
            counterElement.className = 'activity-counter';
            activitiesList.parentNode.insertBefore(counterElement, activitiesList);
        }
        
        if (counterElement) {
            const plural = count !== 1 ? 's' : '';
            const trimestre = getTrimestre(TODAY);
            counterElement.innerHTML = `<p>Exibindo <strong>${count}</strong> atividade${plural} de matemática (${trimestre}º trimestre atual)</p>`;
        }
    }

    // Filtrar entregas (para o modal)
    function filterDeliveries() {
        if (!deliveryStatusFilter || !deliverySearchInput) return;
        
        const statusFilter = deliveryStatusFilter.value;
        const searchFilter = deliverySearchInput.value.toLowerCase().trim();
        
        // Filtrar linhas da tabela de entregas
        const deliveryRows = document.querySelectorAll('.deliveries-table tbody tr');
        
        deliveryRows.forEach(row => {
            let shouldShow = true;
            
            // Filtrar por status
            if (statusFilter !== 'all') {
                const statusBadge = row.querySelector('.status-badge');
                const rowStatus = statusBadge ? statusBadge.className : '';
                
                const statusMatch = {
                    'submitted': rowStatus.includes('evaluated') || rowStatus.includes('pending-evaluation') || rowStatus.includes('late'),
                    'pending': rowStatus.includes('not-started') || rowStatus.includes('in-progress') || rowStatus.includes('not-viewed'),
                    'late': rowStatus.includes('late'),
                    'graded': rowStatus.includes('evaluated')
                };
                
                if (!statusMatch[statusFilter]) {
                    shouldShow = false;
                }
            }
            
            // Filtrar por pesquisa (nome do aluno)
            if (searchFilter && shouldShow) {
                const studentName = row.querySelector('.student-info span:last-child')?.textContent.toLowerCase() || '';
                if (!studentName.includes(searchFilter)) {
                    shouldShow = false;
                }
            }
            
            row.style.display = shouldShow ? 'table-row' : 'none';
        });
    }

    // ===== MODAIS =====
    
    function openActivityModal(isEdit = false, activityId = null) {
        const modalTitle = document.getElementById("modal-title");
        
        if (activityForm) activityForm.reset();
        
        if (isEdit) {
            modalTitle.textContent = "Editar Atividade";
            
            if (activityId) {
                // Dados de exemplo para matemática
                const sampleData = {
                    title: "Exercícios de Álgebra",
                    type: "exercicios",
                    description: "Lista com exercícios sobre equações do 2º grau e função quadrática.",
                    turmas: ["2-A"],
                    startDate: "2025-05-18",
                    dueDate: "2025-05-22",
                    dueTime: "23:59",
                    instructions: "Resolver os exercícios 1 ao 15 sobre equações quadráticas.\n\nMostrar todos os cálculos e procedimentos utilizados.\n\nUtilizar a fórmula de Bhaskara quando necessário.",
                    points: 10,
                    category: "tarefa"
                };
                
                // Preencher formulário
                if (document.getElementById("activity-title")) document.getElementById("activity-title").value = sampleData.title;
                if (document.getElementById("activity-type")) document.getElementById("activity-type").value = sampleData.type;
                if (document.getElementById("activity-description")) document.getElementById("activity-description").value = sampleData.description;
                if (startDateInput) startDateInput.value = sampleData.startDate;
                if (dueDateInput) dueDateInput.value = sampleData.dueDate;
                if (document.getElementById("activity-due-time")) document.getElementById("activity-due-time").value = sampleData.dueTime;
                if (document.getElementById("activity-instructions")) document.getElementById("activity-instructions").value = sampleData.instructions;
                if (document.getElementById("activity-points")) document.getElementById("activity-points").value = sampleData.points;
                if (document.getElementById("activity-category")) document.getElementById("activity-category").value = sampleData.category;
                
                // Marcar turmas
                sampleData.turmas.forEach(turma => {
                    const checkbox = document.getElementById(`turma-${turma}`);
                    if (checkbox) checkbox.checked = true;
                });
                
                updateFileList(["Exercicios_Algebra.pdf", "Formulas_Matematicas.pdf"]);
            }
        } else {
            modalTitle.textContent = "Nova Atividade de Matemática";
            
            // Configurar datas padrão baseadas na data atual
            const nextWeek = new Date(TODAY);
            nextWeek.setDate(TODAY.getDate() + 7);
            
            const formatDate = (date) => date.toISOString().split('T')[0];
            
            if (startDateInput) startDateInput.value = formatDate(TODAY);
            if (dueDateInput) dueDateInput.value = formatDate(nextWeek);
            
            if (uploadedFilesContainer) {
                uploadedFilesContainer.innerHTML = '<div class="no-files">Nenhum arquivo anexado</div>';
            }
        }
        
        if (activityModal) activityModal.style.display = "block";
    }
    
    function openDeliveriesModal(activityId) {
        // Encontrar a atividade específica ou usar dados padrão
        const activityCard = activityId ? 
            document.querySelector(`.activity-card[data-id="${activityId}"]`) : 
            document.querySelector('.activity-card');
            
        const activityTitle = activityCard ? 
            activityCard.querySelector('.activity-title')?.textContent : 
            "Exercícios de Álgebra";
        
        const activityClass = activityCard ? 
            activityCard.querySelector('.activity-turma')?.textContent : 
            "2º Ano A";
        
        const modalTitle = document.getElementById("deliveries-modal-title");
        if (modalTitle) {
            modalTitle.textContent = `Entregas: ${activityTitle} - ${activityClass}`;
        }
        
        // Ativar primeira aba
        if (deliveryTabs.length > 0) {
            deliveryTabs[0].classList.add("active");
            if (deliveryTabs[1]) deliveryTabs[1].classList.remove("active");
        }
        if (tabContents.length > 0) {
            tabContents[0].classList.add("active");
            if (tabContents[1]) tabContents[1].classList.remove("active");
        }
        
        if (deliveriesModal) deliveriesModal.style.display = "block";
    }
    
    function closeModals() {
        if (activityModal) activityModal.style.display = "none";
        if (deliveriesModal) deliveriesModal.style.display = "none";
    }
    
    function closeModalOnClickOutside(event) {
        if (event.target === activityModal) {
            closeModals();
        }
        if (event.target === deliveriesModal) {
            closeModals();
        }
    }

    // ===== GERENCIAMENTO DE ARQUIVOS =====
    
    function updateFileList(files = []) {
        if (!uploadedFilesContainer) return;
        
        if (files.length === 0) {
            uploadedFilesContainer.innerHTML = '<div class="no-files">Nenhum arquivo anexado</div>';
            return;
        }
        
        let fileListHTML = '';
        files.forEach((file, index) => {
            const fileName = typeof file === 'string' ? file : file.name;
            const fileExt = fileName.split('.').pop().toLowerCase();
            let fileIcon = 'description';
            
            if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(fileExt)) {
                fileIcon = 'image';
            } else if (['pdf'].includes(fileExt)) {
                fileIcon = 'picture_as_pdf';
            } else if (['doc', 'docx'].includes(fileExt)) {
                fileIcon = 'article';
            } else if (['xls', 'xlsx'].includes(fileExt)) {
                fileIcon = 'table_view';
            } else if (['ppt', 'pptx'].includes(fileExt)) {
                fileIcon = 'slideshow';
            }
            
            fileListHTML += `
                <div class="file-item">
                    <span class="material-symbols-outlined">${fileIcon}</span>
                    <span class="file-name">${fileName}</span>
                    <button class="btn-remove-file" data-index="${index}" type="button">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            `;
        });
        
        uploadedFilesContainer.innerHTML = fileListHTML;
        
        // Event listeners para remover arquivos
        document.querySelectorAll('.btn-remove-file').forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.file-item').remove();
                
                if (uploadedFilesContainer.querySelectorAll('.file-item').length === 0) {
                    uploadedFilesContainer.innerHTML = '<div class="no-files">Nenhum arquivo anexado</div>';
                }
            });
        });
    }
    
    function handleFileUpload(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        
        const fileNames = Array.from(files).map(file => file.name);
        updateFileList(fileNames);
    }

    // ===== FUNÇÕES AUXILIARES =====
    
    function submitActivityForm(event) {
        event.preventDefault();
        
        const selectedTurmas = document.querySelectorAll('input[name="turmas[]"]:checked');
        if (selectedTurmas.length === 0) {
            alert("Selecione pelo menos uma turma para a atividade.");
            return;
        }
        
        if (startDateInput && dueDateInput) {
            const startDate = new Date(startDateInput.value);
            const dueDate = new Date(dueDateInput.value);
            
            if (dueDate < startDate) {
                alert("A data de entrega não pode ser anterior à data de início.");
                return;
            }
        }
        
        closeModals();
        showNotification("Atividade de matemática publicada com sucesso!");
        
        setTimeout(() => {
            // Simular adição de nova atividade (em produção seria uma requisição ao servidor)
            console.log("Nova atividade criada");
        }, 500);
    }
    
    function saveAsDraft() {
        closeModals();
        showNotification("Rascunho salvo com sucesso!");
    }
    
    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification-toast";
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add("show"), 100);
        
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function redirectToCalendar() {
        showNotification("Redirecionando para o calendário...");
        setTimeout(() => {
            // window.location.href = "calendario.html";
            console.log("Redirecionamento para calendário");
        }, 1000);
    }
    
    function redirectToReports() {
        showNotification("Redirecionando para os relatórios...");
        setTimeout(() => {
            // window.location.href = "relatorio.html";
            console.log("Redirecionamento para relatórios");
        }, 1000);
    }

    // ===== EVENT LISTENERS =====
    
    // Modais
    if (newActivityBtn) {
        newActivityBtn.addEventListener("click", () => openActivityModal(false));
    }
    
    editButtons.forEach(button => {
        button.addEventListener("click", function() {
            const activityCard = this.closest('.activity-card');
            const activityId = activityCard ? activityCard.dataset.id : null;
            openActivityModal(true, activityId);
        });
    });
    
    viewDeliveriesButtons.forEach(button => {
        button.addEventListener("click", function() {
            const activityCard = this.closest('.activity-card');
            const activityId = activityCard ? activityCard.dataset.id : null;
            openDeliveriesModal(activityId);
        });
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener("click", closeModals);
    });
    
    window.addEventListener("click", closeModalOnClickOutside);
    
    // Filtros principais (SEM FILTRO DE STATUS)
    if (turmaSelect) turmaSelect.addEventListener("change", filterActivities);
    if (periodoSelect) periodoSelect.addEventListener("change", filterActivities);
    
    // Pesquisa com debounce
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener("input", function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterActivities, 300);
        });
    }
    
    // Abas principais (AGORA SÃO O FILTRO DE STATUS)
    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterByTab(this.dataset.tab);
        });
    });
    
    // Abas do modal de entregas
    deliveryTabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const tabName = this.dataset.tab;
            
            deliveryTabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            this.classList.add("active");
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) targetContent.classList.add("active");
        });
    });
    
    // Filtros de entregas
    if (deliveryStatusFilter) {
        deliveryStatusFilter.addEventListener("change", filterDeliveries);
    }
    
    if (deliverySearchInput) {
        let deliverySearchTimeout;
        deliverySearchInput.addEventListener("input", function() {
            clearTimeout(deliverySearchTimeout);
            deliverySearchTimeout = setTimeout(filterDeliveries, 300);
        });
    }
    
    // Upload de arquivos
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", handleFileUpload);
        
        // Drag and drop
        fileUploadArea.addEventListener("dragover", function(e) {
            e.preventDefault();
            this.classList.add("dragover");
        });
        
        fileUploadArea.addEventListener("dragleave", function() {
            this.classList.remove("dragover");
        });
        
        fileUploadArea.addEventListener("drop", function(e) {
            e.preventDefault();
            this.classList.remove("dragover");
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name);
                updateFileList(fileNames);
            }
        });
    }
    
    // Formulário
    if (activityForm) {
        activityForm.addEventListener("submit", submitActivityForm);
    }
    
    const saveDraftBtn = document.querySelector(".btn-save-draft");
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener("click", saveAsDraft);
    }
    
    // Redirecionamentos
    if (calendarBtn) calendarBtn.addEventListener("click", redirectToCalendar);
    if (reportsBtn) reportsBtn.addEventListener("click", redirectToReports);
    
    // Botões de avaliação
    document.querySelectorAll('.btn-evaluate').forEach(button => {
        button.addEventListener("click", function() {
            const activityCard = this.closest('.activity-card');
            const activityTitle = activityCard.querySelector('.activity-title').textContent;
            showNotification(`Redirecionando para avaliação: ${activityTitle}`);
            setTimeout(() => {
                console.log("Redirecionamento para página de avaliação");
            }, 1000);
        });
    });
    
    // ===== INICIALIZAÇÃO =====
    
    // Definir IDs para os cartões
    activityCards.forEach((card, index) => {
        card.dataset.id = index + 1;
    });
    
    // Log de informações sobre período atual
    const trimestreAtual = getTrimestre(TODAY);
    console.log(`Data atual: ${TODAY.toLocaleDateString('pt-BR')}`);
    console.log(`Trimestre atual: ${trimestreAtual}º trimestre`);
    console.log(`Período: ${TRIMESTRES[trimestreAtual].inicio.toLocaleDateString('pt-BR')} a ${TRIMESTRES[trimestreAtual].fim.toLocaleDateString('pt-BR')}`);
    
    // Inicializar contador
    const initialCount = activityCards.length;
    updateActivityCounter(initialCount);
    
    // Aplicar filtros iniciais
    filterActivities();
    
    // Log de inicialização
    console.log(`Portal de Atividades de Matemática inicializado com ${activityCards.length} atividades`);
    console.log("Sistema de filtros ajustado para trimestres escolares");
});
