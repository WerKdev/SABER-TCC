document.addEventListener('DOMContentLoaded', function() {
    // ========== CONFIGURAÇÕES E VARIÁVEIS GLOBAIS ==========
    let isTeacher = false;
    let allDocuments = [];
    let filteredDocuments = [];
    
    // Detectar se é professor ou aluno baseado na URL
    const currentPath = window.location.pathname;
    isTeacher = currentPath.includes('/professor/');
    
    // Elementos DOM
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    const refreshBtn = document.getElementById('btn-refresh');
    const helpBtn = document.getElementById('btn-help');
    const loadingOverlay = document.getElementById('loading-overlay');
    const emptyState = document.getElementById('empty-state');
    const modal = document.getElementById('document-preview-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // ========== CONFIGURAÇÃO DE MENU DINÂMICO ==========
    function setupDynamicMenu() {
        const pageTitle = document.getElementById('page-title');
        const pageSubtitle = document.getElementById('page-subtitle');
        
        if (isTeacher) {
            // Configuração para Professor
            document.body.classList.add('professor');
            pageTitle.textContent = 'Documentos do Professor';
            pageSubtitle.textContent = 'Acesse seus documentos pedagógicos e administrativos';
            
            // Atualizar apenas o menu para professor se necessário
            const navbarMenu = document.getElementById('navbar-menu');
            if (navbarMenu) {
                navbarMenu.innerHTML = `
                    <li><a href="dashboard.html"><span class="material-symbols-outlined">dashboard</span><p>Dashboard</p></a></li>
                    <li><a href="turmas.html"><span class="material-symbols-outlined">groups</span><p>Turmas</p></a></li>
                    <li><a href="planos-aula.html"><span class="material-symbols-outlined">book</span><p>Planos de Aula</p></a></li>
                    <li><a href="relatorios.html"><span class="material-symbols-outlined">analytics</span><p>Relatórios</p></a></li>
                    <li><a href="avaliações.html"><span class="material-symbols-outlined">quiz</span><p>Avaliações</p></a></li>
                    <li><a href="materiais.html"><span class="material-symbols-outlined">folder_open</span><p>Materiais</p></a></li>
                    <li><a href="documentos.html" class="active"><span class="material-symbols-outlined">description</span><p>Documentos</p></a></li>
                    <li><a href="calendario.html"><span class="material-symbols-outlined">event_note</span><p>Calendário</p></a></li>
                    <li><a href="comunicados.html"><span class="material-symbols-outlined">chat</span><p>Comunicados</p></a></li>
                    <li><a href="suporte.html"><span class="material-symbols-outlined">help</span><p>Suporte</p></a></li>
                `;
            }
            
            // Mostrar seção de documentos pedagógicos
            const professorSection = document.querySelector('.professor-only');
            if (professorSection) {
                professorSection.style.display = 'block';
            }
        } else {
            // Configuração para Aluno - manter o menu existente
            pageTitle.textContent = 'Documentos do Aluno';
            pageSubtitle.textContent = 'Acesse e baixe seus documentos escolares';
            
            // Para aluno, apenas garantir que a classe active esteja no item correto
            const currentActive = document.querySelector('.navbar a.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            const documentosLink = document.querySelector('a[href="documentos.html"]');
            if (documentosLink) {
                documentosLink.classList.add('active');
            }
        }
    }
    
    // ========== DADOS DOS DOCUMENTOS ==========
    function getDocumentsData() {
        const baseDocuments = {
            // Documentos para ALUNOS
            aluno: {
                academicos: [
                    {
                        id: 'boletim',
                        title: 'Boletim Escolar',
                        description: 'Notas e frequência do período letivo atual',
                        icon: 'assignment',
                        status: 'available',
                        size: '2.3 MB',
                        date: '25/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'historico',
                        title: 'Histórico Escolar',
                        description: 'Histórico completo da vida escolar',
                        icon: 'history_edu',
                        status: 'available',
                        size: '1.8 MB',
                        date: '20/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'certificado',
                        title: 'Certificados e Diplomas',
                        description: 'Certificados de conclusão de curso',
                        icon: 'workspace_premium',
                        status: 'processing',
                        size: '3.1 MB',
                        date: '15/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'declaracao-escolaridade',
                        title: 'Declaração de Escolaridade',
                        description: 'Comprovante de vínculo escolar atual',
                        icon: 'verified',
                        status: 'available',
                        size: '756 KB',
                        date: '25/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'atestado-frequencia',
                        title: 'Atestado de Frequência',
                        description: 'Comprovante de frequência escolar',
                        icon: 'event_available',
                        status: 'available',
                        size: '521 KB',
                        date: '23/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'calendario-academico',
                        title: 'Calendário Acadêmico',
                        description: 'Calendário oficial do ano letivo 2025',
                        icon: 'calendar_month',
                        status: 'available',
                        size: '1.2 MB',
                        date: '01/01/2025',
                        category: 'academicos',
                        type: 'academic'
                    }
                ],
                administrativos: [
                    {
                        id: 'comprovante-matricula',
                        title: 'Comprovante de Matrícula',
                        description: 'Comprovante oficial de matrícula 2025',
                        icon: 'how_to_reg',
                        status: 'available',
                        size: '892 KB',
                        date: '15/01/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    },
                    {
                        id: 'comprovante-pagamento',
                        title: 'Comprovantes de Pagamento',
                        description: 'Comprovantes de mensalidades e taxas',
                        icon: 'receipt',
                        status: 'available',
                        size: '1.5 MB',
                        date: '10/05/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    },
                    {
                        id: 'termo-adesao',
                        title: 'Termo de Adesão',
                        description: 'Contrato e termo de adesão aos serviços',
                        icon: 'contract',
                        status: 'pending',
                        size: '2.1 MB',
                        date: '20/05/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    },
                    {
                        id: 'regimento-escolar',
                        title: 'Regimento Escolar',
                        description: 'Regras e normas da instituição',
                        icon: 'gavel',
                        status: 'available',
                        size: '3.8 MB',
                        date: '01/01/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    }
                ],
                pessoais: [
                    {
                        id: 'carteirinha',
                        title: 'Carteirinha Escolar',
                        description: 'Carteira de identificação estudantil',
                        icon: 'badge',
                        status: 'available',
                        size: '445 KB',
                        date: '20/01/2025',
                        category: 'pessoais',
                        type: 'personal'
                    },
                    {
                        id: 'manual-aluno',
                        title: 'Manual do Aluno',
                        description: 'Guia completo para estudantes',
                        icon: 'menu_book',
                        status: 'available',
                        size: '5.2 MB',
                        date: '01/01/2025',
                        category: 'pessoais',
                        type: 'personal'
                    },
                    {
                        id: 'declaracao-vinculo',
                        title: 'Declaração de Vínculo',
                        description: 'Comprovante de vínculo institucional',
                        icon: 'link',
                        status: 'available',
                        size: '687 KB',
                        date: '22/05/2025',
                        category: 'pessoais',
                        type: 'personal'
                    }
                ]
            },
            
            // Documentos para PROFESSORES
            professor: {
                academicos: [
                    {
                        id: 'relatorio-turmas',
                        title: 'Relatórios de Turmas',
                        description: 'Relatórios de desempenho das turmas',
                        icon: 'analytics',
                        status: 'available',
                        size: '4.2 MB',
                        date: '25/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'atas-reuniao',
                        title: 'Atas de Reunião',
                        description: 'Atas das reuniões pedagógicas',
                        icon: 'event_note',
                        status: 'available',
                        size: '2.8 MB',
                        date: '20/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'avaliacoes-diagnosticas',
                        title: 'Avaliações Diagnósticas',
                        description: 'Relatórios de avaliações aplicadas',
                        icon: 'quiz',
                        status: 'processing',
                        size: '3.5 MB',
                        date: '18/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'historico-notas',
                        title: 'Histórico de Notas',
                        description: 'Registro histórico de notas lançadas',
                        icon: 'grade',
                        status: 'available',
                        size: '1.9 MB',
                        date: '25/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'calendario-academico-prof',
                        title: 'Calendário Acadêmico',
                        description: 'Calendário oficial com eventos docentes',
                        icon: 'calendar_month',
                        status: 'available',
                        size: '1.4 MB',
                        date: '01/01/2025',
                        category: 'academicos',
                        type: 'academic'
                    },
                    {
                        id: 'frequencia-alunos',
                        title: 'Frequência dos Alunos',
                        description: 'Relatório de frequência por turma',
                        icon: 'event_available',
                        status: 'available',
                        size: '2.1 MB',
                        date: '24/05/2025',
                        category: 'academicos',
                        type: 'academic'
                    }
                ],
                administrativos: [
                    {
                        id: 'declaracao-vinculo-prof',
                        title: 'Declaração de Vínculo',
                        description: 'Comprovante de vínculo empregatício',
                        icon: 'work',
                        status: 'available',
                        size: '756 KB',
                        date: '22/05/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    },
                    {
                        id: 'comprovante-pagamento-prof',
                        title: 'Comprovantes de Pagamento',
                        description: 'Holerites e comprovantes salariais',
                        icon: 'receipt',
                        status: 'available',
                        size: '1.8 MB',
                        date: '05/05/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    },
                    {
                        id: 'certificados-formacao',
                        title: 'Certificados de Formação',
                        description: 'Certificados de cursos e capacitações',
                        icon: 'school',
                        status: 'available',
                        size: '3.2 MB',
                        date: '15/04/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    },
                    {
                        id: 'regimento-prof',
                        title: 'Regimento Escolar',
                        description: 'Normas e diretrizes institucionais',
                        icon: 'gavel',
                        status: 'available',
                        size: '3.8 MB',
                        date: '01/01/2025',
                        category: 'administrativos',
                        type: 'administrative'
                    }
                ],
                pessoais: [
                    {
                        id: 'manual-professor',
                        title: 'Manual do Professor',
                        description: 'Guia completo para docentes',
                        icon: 'menu_book',
                        status: 'available',
                        size: '6.1 MB',
                        date: '01/01/2025',
                        category: 'pessoais',
                        type: 'personal'
                    },
                    {
                        id: 'cartao-ponto',
                        title: 'Cartão de Ponto',
                        description: 'Registro de ponto eletrônico',
                        icon: 'schedule',
                        status: 'available',
                        size: '892 KB',
                        date: '25/05/2025',
                        category: 'pessoais',
                        type: 'personal'
                    },
                    {
                        id: 'cracha-professor',
                        title: 'Crachá Institucional',
                        description: 'Crachá de identificação docente',
                        icon: 'badge',
                        status: 'available',
                        size: '445 KB',
                        date: '15/01/2025',
                        category: 'pessoais',
                        type: 'personal'
                    }
                ],
                pedagogicos: [
                    {
                        id: 'planos-aula',
                        title: 'Planos de Aula',
                        description: 'Planejamentos pedagógicos aprovados',
                        icon: 'assignment',
                        status: 'available',
                        size: '5.4 MB',
                        date: '25/05/2025',
                        category: 'pedagogicos',
                        type: 'pedagogical'
                    },
                    {
                        id: 'projeto-pedagogico',
                        title: 'Projeto Político-Pedagógico',
                        description: 'PPP da instituição de ensino',
                        icon: 'psychology',
                        status: 'available',
                        size: '8.2 MB',
                        date: '01/01/2025',
                        category: 'pedagogicos',
                        type: 'pedagogical'
                    },
                    {
                        id: 'proposta-curricular',
                        title: 'Proposta Pedagógica Curricular',
                        description: 'Diretrizes curriculares da disciplina',
                        icon: 'library_books',
                        status: 'available',
                        size: '4.8 MB',
                        date: '01/02/2025',
                        category: 'pedagogicos',
                        type: 'pedagogical'
                    },
                    {
                        id: 'cronograma-atividades',
                        title: 'Cronograma de Atividades',
                        description: 'Planejamento temporal das atividades',
                        icon: 'timeline',
                        status: 'available',
                        size: '1.6 MB',
                        date: '20/05/2025',
                        category: 'pedagogicos',
                        type: 'pedagogical'
                    },
                    {
                        id: 'material-didatico',
                        title: 'Material Didático',
                        description: 'Recursos e materiais de apoio',
                        icon: 'auto_stories',
                        status: 'processing',
                        size: '12.3 MB',
                        date: '22/05/2025',
                        category: 'pedagogicos',
                        type: 'pedagogical'
                    }
                ]
            }
        };
        
        const userType = isTeacher ? 'professor' : 'aluno';
        return baseDocuments[userType];
    }
    
    // ========== RENDERIZAÇÃO DOS DOCUMENTOS ==========
    function createDocumentCard(document) {
        const statusInfo = {
            available: { text: 'Disponível', icon: 'check_circle' },
            processing: { text: 'Processando', icon: 'hourglass_empty' },
            pending: { text: 'Pendente', icon: 'pending' }
        };
        
        const status = statusInfo[document.status];
        const isDisabled = document.status !== 'available';
        
        return `
            <div class="document-card" data-id="${document.id}" data-category="${document.category}" data-status="${document.status}">
                <div class="document-header">
                    <div class="document-icon ${document.type}">
                        <span class="material-symbols-outlined">${document.icon}</span>
                    </div>
                    <div class="document-info">
                        <h3 class="document-title">${document.title}</h3>
                        <p class="document-description">${document.description}</p>
                    </div>
                </div>
                <div class="document-meta">
                    <div class="document-status ${document.status}">
                        <span class="material-symbols-outlined">${status.icon}</span>
                        ${status.text}
                    </div>
                    <div class="document-size">${document.size}</div>
                    <div class="document-date">Atualizado em ${document.date}</div>
                </div>
                <div class="document-actions">
                    <button class="btn-action btn-view ${isDisabled ? 'btn-disabled' : ''}" 
                            data-action="view" data-id="${document.id}" ${isDisabled ? 'disabled' : ''}>
                        <span class="material-symbols-outlined">visibility</span>
                        Visualizar
                    </button>
                    <button class="btn-action btn-download ${isDisabled ? 'btn-disabled' : ''}" 
                            data-action="download" data-id="${document.id}" ${isDisabled ? 'disabled' : ''}>
                        <span class="material-symbols-outlined">download</span>
                        Baixar PDF
                    </button>
                </div>
            </div>
        `;
    }
    
    function renderDocuments() {
        const documentsData = getDocumentsData();
        allDocuments = [];
        
        Object.keys(documentsData).forEach(category => {
            const categorySection = document.querySelector(`[data-category="${category}"]`);
            if (!categorySection) return;
            
            const documentsGrid = categorySection.querySelector('.documents-grid');
            const categoryCount = categorySection.querySelector('.category-count');
            
            const documents = documentsData[category];
            allDocuments = allDocuments.concat(documents);
            
            documentsGrid.innerHTML = documents.map(doc => createDocumentCard(doc)).join('');
            categoryCount.textContent = `${documents.length} documento${documents.length !== 1 ? 's' : ''}`;
        });
        
        filteredDocuments = [...allDocuments];
        attachEventListeners();
    }
    
    // ========== FILTROS E BUSCA ==========
    function filterDocuments() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const selectedStatus = statusFilter.value;
        
        filteredDocuments = allDocuments.filter(doc => {
            const matchesSearch = searchTerm === '' || 
                                doc.title.toLowerCase().includes(searchTerm) ||
                                doc.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = selectedCategory === '' || doc.category === selectedCategory;
            const matchesStatus = selectedStatus === '' || doc.status === selectedStatus;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        updateDocumentDisplay();
    }
    
    function updateDocumentDisplay() {
        // Ocultar todas as seções
        document.querySelectorAll('.category-section').forEach(section => {
            section.style.display = 'none';
        });
        
        if (filteredDocuments.length === 0) {
            emptyState.style.display = 'flex';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Agrupar documentos filtrados por categoria
        const groupedDocuments = {};
        filteredDocuments.forEach(doc => {
            if (!groupedDocuments[doc.category]) {
                groupedDocuments[doc.category] = [];
            }
            groupedDocuments[doc.category].push(doc);
        });
        
        // Mostrar seções que têm documentos
        Object.keys(groupedDocuments).forEach(category => {
            const categorySection = document.querySelector(`[data-category="${category}"]`);
            if (categorySection) {
                categorySection.style.display = 'block';
                const documentsGrid = categorySection.querySelector('.documents-grid');
                const categoryCount = categorySection.querySelector('.category-count');
                
                const documents = groupedDocuments[category];
                documentsGrid.innerHTML = documents.map(doc => createDocumentCard(doc)).join('');
                categoryCount.textContent = `${documents.length} documento${documents.length !== 1 ? 's' : ''}`;
            }
        });
        
        // Reattach event listeners para os novos elementos
        attachEventListeners();
    }
    
    // ========== EVENT LISTENERS ==========
    function attachEventListeners() {
        // Botões de ação dos documentos
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', handleDocumentAction);
        });
    }
    
    function handleDocumentAction(event) {
        const action = event.currentTarget.dataset.action;
        const documentId = event.currentTarget.dataset.id;
        const document = allDocuments.find(doc => doc.id === documentId);
        
        if (!document || document.status !== 'available') return;
        
        if (action === 'download') {
            downloadDocument(document);
        } else if (action === 'view') {
            viewDocument(document);
        }
    }
    
    // ========== AÇÕES DOS DOCUMENTOS ==========
    function downloadDocument(document) {
        showLoading();
        
        // Simular download
        setTimeout(() => {
            hideLoading();
            
            // Simular criação e download do arquivo
            const link = document.createElement('a');
            link.href = '#'; // Em produção, seria a URL real do documento
            link.download = `${document.title.replace(/\s+/g, '_')}.pdf`;
            link.textContent = document.title;
            
            // Mostrar mensagem de sucesso
            showNotification(`${document.title} baixado com sucesso!`, 'success');
            
            console.log(`Download iniciado: ${document.title}`);
        }, 2000);
    }
    
    function viewDocument(document) {
        const modalTitle = document.getElementById('modal-title');
        const documentPreview = document.getElementById('document-preview');
        
        modalTitle.textContent = document.title;
        documentPreview.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <span class="material-symbols-outlined" style="font-size: 64px; color: var(--texto-terciario); margin-bottom: 20px;">description</span>
                <h3 style="margin-bottom: 10px; color: var(--texto-claro);">${document.title}</h3>
                <p style="color: var(--texto-secundario); margin-bottom: 20px;">${document.description}</p>
                <p style="font-size: 12px; color: var(--texto-terciario);">
                    Preview não disponível. Use o botão "Baixar PDF" para obter o documento completo.
                </p>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Configurar botão de download no modal
        const downloadModalBtn = document.getElementById('btn-download-modal');
        downloadModalBtn.onclick = () => {
            modal.style.display = 'none';
            downloadDocument(document);
        };
    }
    
    // ========== UTILIDADES ==========
    function showLoading() {
        loadingOverlay.style.display = 'flex';
    }
    
    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }
    
    function showNotification(message, type = 'info') {
        // Criar notificação toast simples
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? 'var(--verde)' : 'var(--azul-padrao)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function refreshDocuments() {
        showLoading();
        setTimeout(() => {
            hideLoading();
            renderDocuments();
            showNotification('Documentos atualizados com sucesso!', 'success');
        }, 1000);
    }
    
    function showHelp() {
        alert(`Ajuda - Documentos ${isTeacher ? 'do Professor' : 'do Aluno'}\n\n` +
              '• Use a barra de pesquisa para encontrar documentos específicos\n' +
              '• Filtre por categoria e status para refinar os resultados\n' +
              '• Clique em "Visualizar" para ver uma prévia do documento\n' +
              '• Use "Baixar PDF" para fazer download do arquivo\n' +
              '• Documentos com status "Processando" ou "Pendente" não estão disponíveis para download');
    }
    
    // ========== EVENTOS PRINCIPAIS ==========
    
    // Busca em tempo real
    searchInput.addEventListener('input', filterDocuments);
    
    // Filtros
    categoryFilter.addEventListener('change', filterDocuments);
    statusFilter.addEventListener('change', filterDocuments);
    
    // Botões do header
    refreshBtn.addEventListener('click', refreshDocuments);
    helpBtn.addEventListener('click', showHelp);
    
    // Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Botão de impressão no modal
    document.getElementById('btn-print').addEventListener('click', () => {
        window.print();
    });
    
    // ========== ANIMAÇÕES CSS DINÂMICAS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========== INICIALIZAÇÃO ==========
    setupDynamicMenu();
    renderDocuments();
    
    // Exibir animação inicial das seções
    document.querySelectorAll('.category-section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // IMPORTANTE: Não interferir com as animações do menu original
    // Aguardar um frame para garantir que o menu original carregou completamente
    requestAnimationFrame(() => {
        // Preservar qualquer estado do menu que já foi definido
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            // Se o menu já está ativo, manter assim
            console.log('Menu já estava ativo, preservando estado');
        }
    });
    
    console.log(`Sistema de documentos carregado para: ${isTeacher ? 'Professor' : 'Aluno'}`);
    console.log(`Total de documentos: ${allDocuments.length}`);
});