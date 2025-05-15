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
    
    // Filtros
    const turmaSelect = document.getElementById("turma-select");
    const materiaSelect = document.getElementById("materia-select");
    const statusSelect = document.getElementById("status-select");
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
    
    // ===== MODAIS =====
    
    // Abrir modal de nova atividade
    function openActivityModal(isEdit = false, activityId = null) {
        const modalTitle = document.getElementById("modal-title");
        
        // Resetar formulário
        activityForm.reset();
        
        if (isEdit) {
            modalTitle.textContent = "Editar Atividade";
            
            // Simulação de preenchimento para edição
            // Em uma aplicação real, você buscaria os dados da atividade pelo ID
            if (activityId) {
                // Simulação de dados para demonstração
                const sampleData = {
                    title: "Exercícios de Álgebra",
                    subject: "matematica",
                    type: "exercicios",
                    description: "Lista com exercícios sobre equações do 2º grau e função quadrática.",
                    turmas: ["2-A"],
                    startDate: "2025-05-09",
                    dueDate: "2025-05-16",
                    dueTime: "23:59",
                    instructions: "Resolver os exercícios 1 ao 10 da página 45 do livro didático.\n\nMostrar todos os cálculos e procedimentos utilizados.",
                    points: 10,
                    category: "tarefa"
                };
                
                // Preencher o formulário com os dados da atividade
                document.getElementById("activity-title").value = sampleData.title;
                document.getElementById("activity-subject").value = sampleData.subject;
                document.getElementById("activity-type").value = sampleData.type;
                document.getElementById("activity-description").value = sampleData.description;
                document.getElementById("activity-start-date").value = sampleData.startDate;
                document.getElementById("activity-due-date").value = sampleData.dueDate;
                document.getElementById("activity-due-time").value = sampleData.dueTime;
                document.getElementById("activity-instructions").value = sampleData.instructions;
                document.getElementById("activity-points").value = sampleData.points;
                document.getElementById("activity-category").value = sampleData.category;
                
                // Marcar as turmas
                sampleData.turmas.forEach(turma => {
                    const checkbox = document.getElementById(`turma-${turma}`);
                    if (checkbox) checkbox.checked = true;
                });
                
                // Simular arquivos anexados
                updateFileList(["Exercicios_Algebra.pdf", "Gabarito_Professor.pdf"]);
            }
        } else {
            modalTitle.textContent = "Nova Atividade";
            
            // Definir valores padrão
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            
            const formatDate = (date) => {
                return date.toISOString().split('T')[0];
            };
            
            startDateInput.value = formatDate(today);
            dueDateInput.value = formatDate(nextWeek);
            
            // Resetar a lista de arquivos
            uploadedFilesContainer.innerHTML = '<div class="no-files">Nenhum arquivo anexado</div>';
        }
        
        activityModal.style.display = "block";
    }
    
    // Abrir modal de entregas
    function openDeliveriesModal(activityId) {
        // Aqui você buscaria os dados reais da atividade e suas entregas
        // Vou simular os dados para demonstração
        const activityTitle = activityId ? 
            document.querySelector(`.activity-card[data-id="${activityId}"] .activity-title`)?.textContent : 
            "Exercícios de Álgebra";
        
        const activityClass = activityId ? 
            document.querySelector(`.activity-card[data-id="${activityId}"] .activity-turma`)?.textContent : 
            "2º Ano A";
        
        document.getElementById("deliveries-modal-title").textContent = `Entregas: ${activityTitle} - ${activityClass}`;
        
        // Ativar a primeira aba
        deliveryTabs[0].classList.add("active");
        tabContents[0].classList.add("active");
        deliveryTabs[1].classList.remove("active");
        tabContents[1].classList.remove("active");
        
        deliveriesModal.style.display = "block";
    }
    
    // Fechar modais
    function closeModals() {
        activityModal.style.display = "none";
        deliveriesModal.style.display = "none";
    }
    
    // Fechar modal ao clicar fora
    function closeModalOnClickOutside(event) {
        if (event.target === activityModal) {
            activityModal.style.display = "none";
        }
        if (event.target === deliveriesModal) {
            deliveriesModal.style.display = "none";
        }
    }
    
    // ===== GERENCIAMENTO DE ARQUIVOS =====
    
    // Atualizar lista de arquivos
    function updateFileList(files = []) {
        if (files.length === 0) {
            uploadedFilesContainer.innerHTML = '<div class="no-files">Nenhum arquivo anexado</div>';
            return;
        }
        
        let fileListHTML = '';
        files.forEach((file, index) => {
            const fileName = typeof file === 'string' ? file : file.name;
            const fileExt = fileName.split('.').pop().toLowerCase();
            let fileIcon = 'description';
            
            // Ícones baseados na extensão
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
                    <button class="btn-remove-file" data-index="${index}">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            `;
        });
        
        uploadedFilesContainer.innerHTML = fileListHTML;
        
        // Adicionar event listeners para remover arquivos
        document.querySelectorAll('.btn-remove-file').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                // Em uma aplicação real, você removeria o arquivo do FormData ou do servidor
                this.closest('.file-item').remove();
                
                // Se não houver mais arquivos, mostrar mensagem
                if (uploadedFilesContainer.querySelectorAll('.file-item').length === 0) {
                    uploadedFilesContainer.innerHTML = '<div class="no-files">Nenhum arquivo anexado</div>';
                }
            });
        });
    }
    
    // Processar upload de arquivos
    function handleFileUpload(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        
        const fileNames = Array.from(files).map(file => file.name);
        updateFileList(fileNames);
    }
    
    // ===== FILTROS E PESQUISA =====
    
    // Filtrar atividades
    function filterActivities() {
        const turmaFilter = turmaSelect.value;
        const materiaFilter = materiaSelect.value;
        const statusFilter = statusSelect.value;
        const periodoFilter = periodoSelect.value;
        const searchFilter = searchInput.value.toLowerCase();
        
        activityCards.forEach(card => {
            const turmaMatch = turmaFilter === 'todas' || card.dataset.turma === turmaFilter;
            const materiaMatch = materiaFilter === 'todas' || card.dataset.materia === materiaFilter;
            const statusMatch = statusFilter === 'todos' || card.dataset.status === statusFilter;
            // Simulamos o período para demonstração
            const periodoMatch = periodoFilter === 'todos' || true;
            
            // Busca no título e descrição
            const title = card.querySelector('.activity-title').textContent.toLowerCase();
            const description = card.querySelector('.activity-description').textContent.toLowerCase();
            const searchMatch = title.includes(searchFilter) || description.includes(searchFilter);
            
            if (turmaMatch && materiaMatch && statusMatch && periodoMatch && searchMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Filtrar por abas
    function filterByTab(tabName) {
        activityCards.forEach(card => {
            if (tabName === 'todas' || card.dataset.status === tabName) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Filtrar entregas
    function filterDeliveries() {
        const statusFilter = deliveryStatusFilter.value;
        const searchFilter = deliverySearchInput.value.toLowerCase();
        
        // Lógica para filtrar entregas baseada no status e termos de busca
        // Em uma aplicação real, você manipularia as linhas da tabela
        console.log(`Filtrando entregas por status: ${statusFilter} e busca: ${searchFilter}`);
    }
    
    // ===== MANIPULAÇÃO DO FORMULÁRIO =====
    
    // Enviar formulário
    function submitActivityForm(event) {
        event.preventDefault();
        
        // Validar que pelo menos uma turma foi selecionada
        const selectedTurmas = document.querySelectorAll('input[name="turmas[]"]:checked');
        if (selectedTurmas.length === 0) {
            alert("Selecione pelo menos uma turma para a atividade.");
            return;
        }
        
        // Validar datas
        const startDate = new Date(startDateInput.value);
        const dueDate = new Date(dueDateInput.value);
        
        if (dueDate < startDate) {
            alert("A data de entrega não pode ser anterior à data de início.");
            return;
        }
        
        // Aqui você enviaria os dados para o servidor
        // Simularemos uma resposta bem-sucedida
        
        // Fechar o modal
        activityModal.style.display = "none";
        
        // Mostrar mensagem de sucesso
        showNotification("Atividade publicada com sucesso!");
        
        // Atualizar a lista de atividades (simulado)
        // Em uma aplicação real, você buscaria a lista atualizada do servidor
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    
    // Salvar como rascunho
    function saveAsDraft() {
        // Aqui você enviaria os dados para o servidor como rascunho
        
        // Fechar o modal
        activityModal.style.display = "none";
        
        // Mostrar mensagem de sucesso
        showNotification("Rascunho salvo com sucesso!");
    }
    
    // Mostrar notificação
    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification-toast";
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add("show");
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ===== REDIRECIONAMENTOS =====
    
    // Redirecionar para a página de calendário
    function redirectToCalendar() {
        // Em uma aplicação real, você redirecionaria para a página de calendário
        showNotification("Redirecionando para o calendário...");
    }
    
    // Redirecionar para a página de relatórios
    function redirectToReports() {
        // Em uma aplicação real, você redirecionaria para a página de relatórios
        showNotification("Redirecionando para os relatórios...");
    }
    
    // ===== EVENT LISTENERS =====
    
    // Modais
    newActivityBtn.addEventListener("click", () => openActivityModal(false));
    
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
    
    // Filtros
    turmaSelect.addEventListener("change", filterActivities);
    materiaSelect.addEventListener("change", filterActivities);
    statusSelect.addEventListener("change", filterActivities);
    periodoSelect.addEventListener("change", filterActivities);
    
    // Pesquisa com debounce
    let searchTimeout;
    searchInput.addEventListener("input", function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterActivities, 300);
    });
    
    // Abas
    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterByTab(this.dataset.tab);
        });
    });
    
    // Abas no modal de entregas
    deliveryTabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const tabName = this.dataset.tab;
            
            // Desativar todas as abas
            deliveryTabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            // Ativar a aba clicada
            this.classList.add("active");
            document.getElementById(`${tabName}-tab`).classList.add("active");
        });
    });
    
    // Filtros de entregas
    deliveryStatusFilter.addEventListener("change", filterDeliveries);
    
    // Pesquisa de entregas com debounce
    let deliverySearchTimeout;
    deliverySearchInput.addEventListener("input", function() {
        clearTimeout(deliverySearchTimeout);
        deliverySearchTimeout = setTimeout(filterDeliveries, 300);
    });
    
    // Upload de arquivos
    fileUploadArea.addEventListener("click", function() {
        fileInput.click();
    });
    
    fileInput.addEventListener("change", handleFileUpload);
    
    // Permitir arrastar e soltar arquivos
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
    
    // Formulário
    activityForm.addEventListener("submit", submitActivityForm);
    
    const saveDraftBtn = document.querySelector(".btn-save-draft");
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener("click", saveAsDraft);
    }
    
    // Redirecionamentos
    calendarBtn.addEventListener("click", redirectToCalendar);
    reportsBtn.addEventListener("click", redirectToReports);
    
    // ===== INICIALIZAÇÃO =====
    
    // Definir IDs para os cartões de atividade para edição/visualização
    activityCards.forEach((card, index) => {
        card.dataset.id = index + 1;
    });
    
    // Adicionar estilo personalizado para toast de notificação
    const style = document.createElement('style');
    style.textContent = `
        .notification-toast {
            position: fixed;
            bottom: -60px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #0048a5;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 2000;
            transition: bottom 0.3s ease;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 14px;
        }
        
        .notification-toast.show {
            bottom: 30px;
        }
        
        .dark-theme .notification-toast {
            background-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .file-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background-color: #f8fafc;
            border-radius: 6px;
            margin-bottom: 8px;
        }
        
        .dark-theme .file-item {
            background-color: #1e293b;
        }
        
        .file-name {
            flex: 1;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .btn-remove-file {
            background: none;
            border: none;
            cursor: pointer;
            color: #94a3b8;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px;
            border-radius: 4px;
        }
        
        .btn-remove-file:hover {
            background-color: #f1f5f9;
            color: #475569;
        }
        
        .dark-theme .btn-remove-file:hover {
            background-color: #334155;
            color: #cbd5e1;
        }
        
        .file-upload-area.dragover {
            border-color: #0048a5;
            background-color: #eef6ff;
        }
        
        .dark-theme .file-upload-area.dragover {
            border-color: #3b82f6;
            background-color: #0f172a;
        }
    `;
    document.head.appendChild(style);
});