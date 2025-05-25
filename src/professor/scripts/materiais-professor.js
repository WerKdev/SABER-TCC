document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const searchInput = document.getElementById("search-input");
    const subjectFilter = document.getElementById("subject-filter");
    const typeFilter = document.getElementById("type-filter");
    const turmaFilter = document.getElementById("turma-filter");
    const materialsGrid = document.getElementById("materials-grid");
    const noMaterialsMsg = document.querySelector(".no-materials");
    const tabButtons = document.querySelectorAll(".tab-button");
    
    // Modais
    const uploadModal = document.getElementById("upload-modal");
    const shareModal = document.getElementById("share-modal");
    const statsModal = document.getElementById("stats-modal");
    const pdfModal = document.getElementById("pdf-modal");
    const pdfViewer = document.getElementById("pdf-viewer");
    const pdfTitle = document.getElementById("pdf-title");
    
    // Elementos do formulário de upload
    const uploadForm = document.getElementById("upload-form");
    const fileUploadArea = document.getElementById("file-upload-area");
    const fileInput = document.getElementById("material-file");

    // Dados dos materiais do professor (simulando dados do backend)
    const professorMaterials = [
        {
            id: 1,
            title: "Matemática - Manual do Professor 3º Ano",
            author: "Editora Moderna",
            description: "Inclui orientações pedagógicas, gabarito completo e sugestões de atividades",
            subject: "matematica",
            type: "manual",
            pages: 520,
            size: "3.2 MB",
            coverUrl: "https://via.placeholder.com/200x280/4169E1/FFFFFF?text=Manual+Professor+Mat",
            pdfUrl: "manual-mat-professor.pdf",
            isProfessorEdition: true,
            hasAnswerKey: true,
            isShared: false,
            sharedWith: [],
            accessCount: 0,
            category: "professor"
        },
        {
            id: 2,
            title: "Apostila de Redação ENEM",
            author: "Prof. Maria Silva",
            description: "Material personalizado com técnicas de redação para o ENEM",
            subject: "portugues",
            type: "apostila",
            pages: 85,
            size: "1.2 MB",
            coverUrl: "https://via.placeholder.com/200x280/DC143C/FFFFFF?text=Apostila+Redação",
            pdfUrl: "apostila-redacao.pdf",
            isProfessorEdition: false,
            hasAnswerKey: false,
            isShared: true,
            sharedWith: ["3a", "3b"],
            accessCount: 45,
            totalStudents: 60,
            category: "meus"
        },
        {
            id: 3,
            title: "Brasil Colônia - Slides",
            author: "Prof. Maria Silva",
            description: "Apresentação completa sobre o período colonial brasileiro",
            subject: "historia",
            type: "apresentacao",
            slides: 45,
            size: "15.3 MB",
            coverUrl: "https://via.placeholder.com/200x280/8B4513/FFFFFF?text=Brasil+Colônia",
            pdfUrl: "brasil-colonia.pptx",
            isProfessorEdition: false,
            hasAnswerKey: false,
            isShared: false,
            sharedWith: [],
            accessCount: 0,
            category: "meus"
        },
        {
            id: 4,
            title: "Banco de Questões - Matemática",
            author: "SABER",
            description: "500+ questões categorizadas por nível de dificuldade",
            subject: "matematica",
            type: "exercicios",
            questions: 500,
            size: "2.8 MB",
            coverUrl: "https://via.placeholder.com/200x280/32CD32/FFFFFF?text=Banco+Questões",
            pdfUrl: "banco-questoes-mat.pdf",
            isProfessorEdition: true,
            hasAnswerKey: true,
            isShared: false,
            sharedWith: [],
            accessCount: 0,
            difficulty: { easy: 150, medium: 250, hard: 100 },
            category: "professor"
        },
        {
            id: 5,
            title: "Manual do Professor - Português",
            author: "Editora Ática",
            description: "Orientações pedagógicas e gabarito de exercícios",
            subject: "portugues",
            type: "manual",
            pages: 480,
            size: "2.9 MB",
            coverUrl: "https://via.placeholder.com/200x280/DC143C/FFFFFF?text=Manual+Professor+Port",
            pdfUrl: "manual-port-professor.pdf",
            isProfessorEdition: true,
            hasAnswerKey: true,
            isShared: false,
            sharedWith: [],
            accessCount: 0,
            category: "professor"
        },
        {
            id: 6,
            title: "Plano de Aula - Revolução Industrial",
            author: "Prof. Maria Silva",
            description: "Plano completo com atividades e recursos multimídia",
            subject: "historia",
            type: "outro",
            pages: 15,
            size: "0.5 MB",
            coverUrl: "https://via.placeholder.com/200x280/FF8C00/FFFFFF?text=Plano+de+Aula",
            pdfUrl: "plano-aula-revolucao.pdf",
            isProfessorEdition: false,
            hasAnswerKey: false,
            isShared: true,
            sharedWith: ["3a", "3b", "3c"],
            accessCount: 78,
            totalStudents: 90,
            category: "compartilhados"
        }
    ];

    // Estado atual
    let currentTab = "todos";
    let currentMaterials = [...professorMaterials];

    // Função para renderizar os materiais
    function renderMaterials(materialsToRender) {
        materialsGrid.innerHTML = '';
        
        if (materialsToRender.length === 0) {
            materialsGrid.style.display = 'none';
            noMaterialsMsg.style.display = 'block';
            return;
        }
        
        materialsGrid.style.display = 'grid';
        noMaterialsMsg.style.display = 'none';
        
        materialsToRender.forEach(material => {
            const card = createMaterialCard(material);
            materialsGrid.appendChild(card);
        });
    }

    // Função para criar um card de material
    function createMaterialCard(material) {
        const typeLabels = {
            'livro': 'Livro Didático',
            'manual': 'Manual do Professor',
            'apostila': 'Apostila',
            'exercicios': material.questions ? 'Banco de Questões' : 'Exercícios',
            'apresentacao': 'Apresentação',
            'video': 'Vídeo Aula',
            'outro': 'Material'
        };

        const card = document.createElement('div');
        card.className = 'material-card';
        if (material.isProfessorEdition) card.className += ' professor-edition';
        if (material.isShared) card.className += ' shared-material';
        if (material.questions) card.className += ' question-bank';
        
        card.setAttribute('data-subject', material.subject);
        card.setAttribute('data-type', material.type);
        
        // Conteúdo principal do card
        let statsHtml = '';
        if (material.pages) {
            statsHtml = `
                <span class="stat-item">
                    <span class="material-symbols-outlined">auto_stories</span>
                    <span>${material.pages} páginas</span>
                </span>
            `;
        } else if (material.slides) {
            statsHtml = `
                <span class="stat-item">
                    <span class="material-symbols-outlined">slideshow</span>
                    <span>${material.slides} slides</span>
                </span>
            `;
        } else if (material.questions) {
            statsHtml = `
                <span class="stat-item">
                    <span class="material-symbols-outlined">quiz</span>
                    <span>${material.questions} questões</span>
                </span>
            `;
        }

        // Informações de compartilhamento
        let sharingInfo = '';
        if (material.isShared) {
            const turmaNames = material.sharedWith.map(t => t.toUpperCase()).join(', ');
            sharingInfo = `
                <div class="sharing-info shared">
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Compartilhado com ${material.sharedWith.length} turma${material.sharedWith.length > 1 ? 's' : ''}</span>
                </div>
            `;
        } else if (material.isProfessorEdition) {
            sharingInfo = `
                <div class="sharing-info">
                    <span class="material-symbols-outlined">visibility</span>
                    <span>Exclusivo para professores</span>
                </div>
            `;
        } else {
            sharingInfo = `
                <div class="sharing-info">
                    <span class="material-symbols-outlined">lock</span>
                    <span>Privado</span>
                </div>
            `;
        }

        // Badges
        let badges = '';
        if (material.isProfessorEdition) {
            badges += `<div class="material-type-badge professor-badge">${typeLabels[material.type]}</div>`;
        } else {
            badges += `<div class="material-type-badge">${typeLabels[material.type]}</div>`;
        }
        
        if (material.hasAnswerKey) {
            badges += `
                <div class="answer-key-badge">
                    <span class="material-symbols-outlined">${material.questions ? 'fact_check' : 'key'}</span>
                    <span>${material.questions ? 'Gabarito' : 'Com Gabarito'}</span>
                </div>
            `;
        }
        
        if (material.isShared) {
            const turmaNames = material.sharedWith.map(t => `3º ${t.toUpperCase()}`).join(', ');
            badges += `
                <div class="shared-badge">
                    <span class="material-symbols-outlined">groups</span>
                    <span>${turmaNames}</span>
                </div>
            `;
        }

        // Estatísticas de acesso
        if (material.isShared && material.accessCount > 0) {
            statsHtml += `
                <span class="stat-item access-stat">
                    <span class="material-symbols-outlined">visibility</span>
                    <span>${material.accessCount}/${material.totalStudents} alunos</span>
                </span>
            `;
        }

        // Níveis de dificuldade para banco de questões
        let difficultyHtml = '';
        if (material.difficulty) {
            difficultyHtml = `
                <div class="difficulty-levels">
                    <span class="difficulty easy">Fácil: ${material.difficulty.easy}</span>
                    <span class="difficulty medium">Médio: ${material.difficulty.medium}</span>
                    <span class="difficulty hard">Difícil: ${material.difficulty.hard}</span>
                </div>
            `;
        }

        // Ações do card
        let actionsHtml = `
            <button class="btn-view" onclick="viewMaterial('${material.pdfUrl}', '${material.title}')">
                <span class="material-symbols-outlined">visibility</span>
                <span>${material.questions ? 'Explorar' : 'Visualizar'}</span>
            </button>
        `;

        if (material.isShared) {
            actionsHtml += `
                <button class="btn-stats" onclick="viewStats('${material.id}')">
                    <span class="material-symbols-outlined">analytics</span>
                </button>
            `;
        } else if (!material.isProfessorEdition || material.type === 'manual') {
            actionsHtml += `
                <button class="btn-share" onclick="shareMaterial('${material.id}')">
                    <span class="material-symbols-outlined">share</span>
                </button>
            `;
        }

        if (material.category === 'meus') {
            actionsHtml += `
                <button class="btn-edit" onclick="editMaterial('${material.id}')">
                    <span class="material-symbols-outlined">edit</span>
                </button>
            `;
        } else if (material.questions) {
            actionsHtml += `
                <button class="btn-create-test" onclick="createTest('${material.subject}')">
                    <span class="material-symbols-outlined">add_task</span>
                </button>
            `;
        } else {
            actionsHtml += `
                <button class="btn-download" onclick="downloadMaterial('${material.pdfUrl}', '${material.title}')">
                    <span class="material-symbols-outlined">download</span>
                </button>
            `;
        }
        
        card.innerHTML = `
            <div class="material-cover">
                <img src="${material.coverUrl}" alt="${material.title}">
                ${badges}
            </div>
            <div class="material-info">
                <div class="material-content">
                    <h3 class="material-title">${material.title}</h3>
                    <p class="material-author">${material.author}</p>
                    <p class="material-description">${material.description}</p>
                    <div class="material-stats">
                        ${statsHtml}
                        <span class="stat-item">
                            <span class="material-symbols-outlined">download</span>
                            <span>${material.size}</span>
                        </span>
                    </div>
                    ${difficultyHtml}
                    ${sharingInfo}
                </div>
                <div class="material-actions">
                    ${actionsHtml}
                </div>
            </div>
        `;
        
        return card;
    }

    // Função de filtro por tab
    function filterByTab(tab) {
        currentTab = tab;
        
        // Atualizar visual das tabs
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tab) {
                btn.classList.add('active');
            }
        });
        
        // Filtrar materiais
        let filtered = [...professorMaterials];
        
        switch(tab) {
            case 'professor':
                filtered = filtered.filter(m => m.isProfessorEdition);
                break;
            case 'meus':
                filtered = filtered.filter(m => m.category === 'meus');
                break;
            case 'compartilhados':
                filtered = filtered.filter(m => m.isShared);
                break;
            // 'todos' mostra todos os materiais
        }
        
        currentMaterials = filtered;
        applyFilters();
    }

    // Função de busca e filtros
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSubject = subjectFilter.value;
        const selectedType = typeFilter.value;
        const selectedTurma = turmaFilter.value;
        
        const filteredMaterials = currentMaterials.filter(material => {
            const matchesSearch = material.title.toLowerCase().includes(searchTerm) ||
                                 material.author.toLowerCase().includes(searchTerm) ||
                                 material.description.toLowerCase().includes(searchTerm);
            
            const matchesSubject = !selectedSubject || material.subject === selectedSubject;
            const matchesType = !selectedType || material.type === selectedType;
            const matchesTurma = !selectedTurma || 
                                (material.isShared && material.sharedWith.includes(selectedTurma));
            
            return matchesSearch && matchesSubject && matchesType && matchesTurma;
        });
        
        renderMaterials(filteredMaterials);
    }

    // Event listeners para tabs
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByTab(btn.getAttribute('data-tab'));
        });
    });

    // Event listeners para busca e filtros
    searchInput.addEventListener('input', applyFilters);
    subjectFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    turmaFilter.addEventListener('change', applyFilters);

    // Funções dos modais
    window.openUploadModal = function() {
        uploadModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeUploadModal = function() {
        uploadModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        uploadForm.reset();
    };

    window.shareMaterial = function(materialId) {
        const material = professorMaterials.find(m => m.id == materialId);
        if (material) {
            document.getElementById('share-material-title').textContent = material.title;
            shareModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeShareModal = function() {
        shareModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.confirmShare = function() {
        // Implementar lógica de compartilhamento
        const checkedBoxes = shareModal.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedBoxes.length > 0) {
            alert(`Material compartilhado com ${checkedBoxes.length} turma(s)!`);
            closeShareModal();
        }
    };

    window.viewStats = function(materialId) {
        statsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeStatsModal = function() {
        statsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.viewMaterial = function(pdfUrl, title) {
        pdfTitle.textContent = title;
        pdfViewer.src = '/assets/materials/' + pdfUrl;
        pdfModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closePdfModal = function() {
        pdfModal.style.display = 'none';
        pdfViewer.src = '';
        document.body.style.overflow = 'auto';
    };

    window.downloadMaterial = function(pdfUrl, title) {
        const link = document.createElement('a');
        link.href = '/assets/materials/' + pdfUrl;
        link.download = title + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    window.editMaterial = function(materialId) {
        alert(`Editar material ID: ${materialId}`);
    };

    window.createTest = function(subject) {
        alert(`Criar avaliação de ${subject}`);
    };

    window.viewQuestionBank = function(bankId) {
        alert(`Visualizar banco de questões: ${bankId}`);
    };

    window.viewPresentation = function(presentationUrl) {
        alert(`Visualizar apresentação: ${presentationUrl}`);
    };

    // Área de upload de arquivo
    fileUploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileUploadArea.innerHTML = `
                <span class="material-symbols-outlined" style="color: var(--verde);">check_circle</span>
                <p>${file.name}</p>
                <span class="file-info">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            `;
        }
    });

    // Drag and drop
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });

    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('dragover');
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            fileUploadArea.innerHTML = `
                <span class="material-symbols-outlined" style="color: var(--verde);">check_circle</span>
                <p>${file.name}</p>
                <span class="file-info">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            `;
        }
    });

    // Submissão do formulário
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular upload
        const formData = new FormData(uploadForm);
        console.log('Enviando material...', formData);
        
        // Feedback visual
        alert('Material adicionado com sucesso!');
        closeUploadModal();
    });

    // Fechar modais ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) closeUploadModal();
        if (e.target === shareModal) closeShareModal();
        if (e.target === statsModal) closeStatsModal();
        if (e.target === pdfModal) closePdfModal();
    });

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeUploadModal();
            closeShareModal();
            closeStatsModal();
            closePdfModal();
        }
    });

    // Renderizar materiais inicialmente
    renderMaterials(professorMaterials);
});