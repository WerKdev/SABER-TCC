document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const searchInput = document.getElementById("search-input");
    const subjectFilter = document.getElementById("subject-filter");
    const typeFilter = document.getElementById("type-filter");
    const materialsGrid = document.querySelector(".materials-grid");
    const noMaterialsMsg = document.querySelector(".no-materials");
    const pdfModal = document.getElementById("pdf-modal");
    const pdfViewer = document.getElementById("pdf-viewer");
    const pdfTitle = document.getElementById("pdf-title");

    // Dados dos materiais (simulando dados que viriam do backend)
    const materials = [
        {
            id: 1,
            title: "Matemática - 3º Ano",
            author: "Editora Moderna",
            description: "Livro completo de matemática para o 3º ano do ensino médio",
            subject: "matematica",
            type: "livro",
            pages: 425,
            size: "2.3 MB",
            coverUrl: "https://via.placeholder.com/200x280/4169E1/FFFFFF?text=Matemática+3º+Ano",
            pdfUrl: "matematica-3ano.pdf"
        },
        {
            id: 2,
            title: "Português - 3º Ano",
            author: "Editora Ática",
            description: "Literatura, gramática e produção textual",
            subject: "portugues",
            type: "livro",
            pages: 380,
            size: "1.8 MB",
            coverUrl: "https://via.placeholder.com/200x280/DC143C/FFFFFF?text=Português+3º+Ano",
            pdfUrl: "portugues-3ano.pdf"
        },
        {
            id: 3,
            title: "História - 3º Ano",
            author: "Editora FTD",
            description: "História do Brasil e História Geral",
            subject: "historia",
            type: "livro",
            pages: 320,
            size: "2.1 MB",
            coverUrl: "https://via.placeholder.com/200x280/8B4513/FFFFFF?text=História+3º+Ano",
            pdfUrl: "historia-3ano.pdf"
        },
        {
            id: 4,
            title: "Caderno de Exercícios - Matemática",
            author: "SABER",
            description: "Exercícios complementares de matemática",
            subject: "matematica",
            type: "exercicios",
            pages: 150,
            size: "0.8 MB",
            coverUrl: "https://via.placeholder.com/200x280/32CD32/FFFFFF?text=Exercícios+Matemática",
            pdfUrl: "exercicios-mat.pdf"
        },
        {
            id: 5,
            title: "Geografia - 3º Ano",
            author: "Editora Saraiva",
            description: "Geografia física e humana",
            subject: "geografia",
            type: "livro",
            pages: 290,
            size: "2.5 MB",
            coverUrl: "https://via.placeholder.com/200x280/FF8C00/FFFFFF?text=Geografia+3º+Ano",
            pdfUrl: "geografia-3ano.pdf"
        },
        {
            id: 6,
            title: "Ciências - 3º Ano",
            author: "Editora Scipione",
            description: "Biologia, Química e Física",
            subject: "ciencias",
            type: "livro",
            pages: 410,
            size: "3.1 MB",
            coverUrl: "https://via.placeholder.com/200x280/9370DB/FFFFFF?text=Ciências+3º+Ano",
            pdfUrl: "ciencias-3ano.pdf"
        },
        {
            id: 7,
            title: "Apostila de Português",
            author: "SABER",
            description: "Material complementar de língua portuguesa",
            subject: "portugues",
            type: "apostila",
            pages: 120,
            size: "0.6 MB",
            coverUrl: "https://via.placeholder.com/200x280/FF69B4/FFFFFF?text=Apostila+Português",
            pdfUrl: "apostila-portugues.pdf"
        },
        {
            id: 8,
            title: "Inglês - 3º Ano",
            author: "Cambridge",
            description: "English for Brazilian Students",
            subject: "ingles",
            type: "livro",
            pages: 250,
            size: "1.5 MB",
            coverUrl: "https://via.placeholder.com/200x280/00CED1/FFFFFF?text=Inglês+3º+Ano",
            pdfUrl: "ingles-3ano.pdf"
        }
    ];

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
            'apostila': 'Apostila',
            'exercicios': 'Exercícios'
        };

        const card = document.createElement('div');
        card.className = 'material-card';
        card.setAttribute('data-subject', material.subject);
        card.setAttribute('data-type', material.type);
        
        card.innerHTML = `
            <div class="material-cover">
                <img src="${material.coverUrl}" alt="${material.title}">
                <div class="material-type-badge">${typeLabels[material.type]}</div>
            </div>
            <div class="material-info">
                <div class="material-content">
                    <h3 class="material-title">${material.title}</h3>
                    <p class="material-author">${material.author}</p>
                    <p class="material-description">${material.description}</p>
                    <div class="material-stats">
                        <span class="stat-item">
                            <span class="material-symbols-outlined">auto_stories</span>
                            <span>${material.pages} páginas</span>
                        </span>
                        <span class="stat-item">
                            <span class="material-symbols-outlined">download</span>
                            <span>${material.size}</span>
                        </span>
                    </div>
                </div>
                <div class="material-actions">
                    <button class="btn-view" onclick="viewMaterial('${material.pdfUrl}', '${material.title}')">
                        <span class="material-symbols-outlined">visibility</span>
                        <span>Visualizar</span>
                    </button>
                    <button class="btn-download" onclick="downloadMaterial('${material.pdfUrl}', '${material.title}')">
                        <span class="material-symbols-outlined">download</span>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    // Função de busca e filtros
    function filterMaterials() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSubject = subjectFilter.value;
        const selectedType = typeFilter.value;
        
        const filteredMaterials = materials.filter(material => {
            const matchesSearch = material.title.toLowerCase().includes(searchTerm) ||
                                 material.author.toLowerCase().includes(searchTerm) ||
                                 material.description.toLowerCase().includes(searchTerm);
            
            const matchesSubject = !selectedSubject || material.subject === selectedSubject;
            const matchesType = !selectedType || material.type === selectedType;
            
            return matchesSearch && matchesSubject && matchesType;
        });
        
        renderMaterials(filteredMaterials);
    }

    // Event listeners para busca e filtros
    searchInput.addEventListener('input', filterMaterials);
    subjectFilter.addEventListener('change', filterMaterials);
    typeFilter.addEventListener('change', filterMaterials);

    // Função para visualizar material (PDF)
    window.viewMaterial = function(pdfUrl, title) {
        // Aqui você deve colocar o caminho real para os PDFs
        // Por exemplo: '/assets/materials/' + pdfUrl
        const pdfPath = '/assets/materials/' + pdfUrl;
        
        pdfTitle.textContent = title;
        pdfViewer.src = pdfPath;
        pdfModal.style.display = 'block';
        
        // Adicionar classe ao body para prevenir scroll
        document.body.style.overflow = 'hidden';
    };

    // Função para fechar o modal do PDF
    window.closePdfModal = function() {
        pdfModal.style.display = 'none';
        pdfViewer.src = '';
        document.body.style.overflow = 'auto';
    };

    // Fechar modal ao clicar fora dele
    pdfModal.addEventListener('click', function(event) {
        if (event.target === pdfModal) {
            closePdfModal();
        }
    });

    // Função para download de material
    window.downloadMaterial = function(pdfUrl, title) {
        // Criar um elemento <a> temporário para o download
        const link = document.createElement('a');
        link.href = '/assets/materials/' + pdfUrl; // Ajuste o caminho conforme necessário
        link.download = title + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Mostrar notificação de download (opcional)
        showNotification('Download iniciado', 'O download do material foi iniciado.');
    };

    // Função para mostrar notificações (opcional)
    function showNotification(title, message) {
        // Implementar sistema de notificações se desejar
        console.log(`${title}: ${message}`);
    }

    // Renderizar materiais inicialmente
    renderMaterials(materials);

    // Adicionar animação de entrada aos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os cards
    document.querySelectorAll('.material-card').forEach(card => {
        observer.observe(card);
    });

    // Atalhos de teclado
    document.addEventListener('keydown', function(event) {
        // ESC para fechar o modal do PDF
        if (event.key === 'Escape' && pdfModal.style.display === 'block') {
            closePdfModal();
        }
        
        // Ctrl+F ou Cmd+F para focar na busca
        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            searchInput.focus();
        }
    });

    // Função para carregar mais materiais (scroll infinito - opcional)
    let currentPage = 1;
    const materialsPerPage = 8;

    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            // Carregar mais materiais quando chegar próximo ao fim da página
            // Implementar lógica de paginação se necessário
        }
    });

    // Salvar preferências de filtro no localStorage
    function saveFilterPreferences() {
        const preferences = {
            subject: subjectFilter.value,
            type: typeFilter.value
        };
        localStorage.setItem('materialFilterPreferences', JSON.stringify(preferences));
    }

    // Carregar preferências de filtro do localStorage
    function loadFilterPreferences() {
        const saved = localStorage.getItem('materialFilterPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            if (preferences.subject) subjectFilter.value = preferences.subject;
            if (preferences.type) typeFilter.value = preferences.type;
            filterMaterials();
        }
    }

    // Salvar preferências quando os filtros mudarem
    subjectFilter.addEventListener('change', saveFilterPreferences);
    typeFilter.addEventListener('change', saveFilterPreferences);

    // Carregar preferências ao iniciar
    loadFilterPreferences();
});