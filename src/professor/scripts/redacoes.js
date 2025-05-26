document.addEventListener("DOMContentLoaded", function() {
    // Sidebar elements (assumindo que existem no HTML)
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");
    const menuIconMobile = document.getElementById("menu-icon-mobile");

    // Sidebar toggle functionality
    if (menuIconSidebar) {
        menuIconSidebar.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }

    if (menuIconMobile) {
        menuIconMobile.addEventListener("click", function() {
            sidebar.classList.toggle("active"); 
        });
    }

    // Responsive check
    function checkWindowSize() {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove("active");
        }
    }

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    // Redação functionality
    const novaRedacaoBtn = document.getElementById("nova-redacao-btn");
    const modal = document.getElementById("nova-redacao-modal");
    const closeModal = document.querySelector(".close-modal");
    const redacaoForm = document.getElementById("nova-redacao-form");
    const redacoesList = document.getElementById("redacoes-list");
    const searchInput = document.getElementById("search-redacao");
    
    // Array para armazenar as redações (inicialmente vazio)
    let redacoes = [];
    
    // Abrir modal de nova redação
    if (novaRedacaoBtn) {
        novaRedacaoBtn.addEventListener("click", function() {
            modal.style.display = "block";
        });
    }
    
    // Fechar modal
    if (closeModal) {
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // Função para abrir arquivos
    function abrirArquivo(redacaoId) {
        const redacao = redacoes.find(r => r.id === parseInt(redacaoId));
        
        if (redacao && redacao.arquivoObj) {
            // Criar URL temporária para o arquivo
            const url = URL.createObjectURL(redacao.arquivoObj);
            
            // Abrir em uma nova guia
            window.open(url, '_blank');
        } else {
            alert('Não foi possível abrir o arquivo.');
        }
    }
    
    // Função para formatar data
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
    
    // Função corrigida para renderizar redações
    function renderRedacoes(filter = '') {
        if (!redacoesList) return;
        
        redacoesList.innerHTML = '';
        
        const filteredRedacoes = redacoes.filter(redacao => 
            redacao.tema.toLowerCase().includes(filter.toLowerCase()) ||
            redacao.descricao.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (filteredRedacoes.length === 0) {
            if (redacoes.length === 0) {
                redacoesList.innerHTML = '<p class="no-results">Nenhuma redação criada</p>';
            } else {
                redacoesList.innerHTML = '<p class="no-results">Nenhuma redação encontrada</p>';
            }
            return;
        }
        
        filteredRedacoes.forEach(redacao => {
            const redacaoCard = document.createElement('div');
            redacaoCard.className = 'redacao-card';
            redacaoCard.setAttribute('data-redacao-id', redacao.id);
            
            redacaoCard.innerHTML = `
                <div class="redacao-header-card">
                    <h3>${redacao.tema}</h3>
                    <div class="redacao-options">
                        <span class="material-symbols-outlined options-icon" data-redacao-id="${redacao.id}">more_vert</span>
                        <div class="options-menu" id="options-menu-${redacao.id}">
                            <ul>
                                <li class="edit-option" data-redacao-id="${redacao.id}">
                                    <span class="material-symbols-outlined">edit</span>Editar
                                </li>
                                <li class="delete-option" data-redacao-id="${redacao.id}">
                                    <span class="material-symbols-outlined">delete</span>Excluir
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p>${redacao.descricao}</p>
                <div class="redacao-meta">
                    <span>Entrega: ${formatDate(redacao.dataEntrega)}</span>
                    <span>Criado: ${formatDate(redacao.dataCriacao)}</span>
                </div>
                ${redacao.arquivo ? `<div class="redacao-file" data-redacao-id="${redacao.id}"><span class="material-symbols-outlined">description</span> ${redacao.arquivo}</div>` : ''}
            `;
            
            redacoesList.appendChild(redacaoCard);
        });
        
        // IMPORTANTE: Adicionar os event listeners APÓS os elementos serem criados
        setupCardEventListeners();
    }
    
    // Função separada para configurar os event listeners dos cards
    function setupCardEventListeners() {
        // Remover listeners anteriores para evitar duplicação
        const cards = document.querySelectorAll('.redacao-card');
        
        cards.forEach(card => {
            const redacaoId = card.getAttribute('data-redacao-id');
            
            // Event listener para o card inteiro (navegação para detalhes)
            card.addEventListener('click', function(event) {
                // Verifica se o clique não foi em elementos específicos
                if (!event.target.closest('.redacao-options') && 
                    !event.target.closest('.redacao-file') &&
                    !event.target.closest('.options-menu')) {
                    
                    console.log('Navegando para redacao-status.html?id=' + redacaoId); // Debug
                    window.location.href = `redacao-status.html?id=${redacaoId}`;
                }
            });
            
            // Adicionar estilo de cursor pointer
            card.style.cursor = 'pointer';
            
            // Event listener para arquivos
            const fileElement = card.querySelector('.redacao-file');
            if (fileElement) {
                fileElement.style.cursor = 'pointer';
                fileElement.title = 'Clique para abrir o arquivo';
                
                fileElement.addEventListener('click', function(event) {
                    event.stopPropagation();
                    console.log('Abrindo arquivo para redação ID:', redacaoId); // Debug
                    abrirArquivo(redacaoId);
                });
            }
            
            // Event listener para o menu de opções
            const optionsIcon = card.querySelector('.options-icon');
            if (optionsIcon) {
                optionsIcon.addEventListener('click', function(event) {
                    event.stopPropagation();
                    
                    const optionsMenu = document.getElementById(`options-menu-${redacaoId}`);
                    
                    // Fechar outros menus
                    document.querySelectorAll('.options-menu').forEach(menu => {
                        if (menu.id !== `options-menu-${redacaoId}`) {
                            menu.classList.remove('active');
                        }
                    });
                    
                    // Alternar menu atual
                    optionsMenu.classList.toggle('active');
                });
            }
            
            // Event listeners para as opções do menu
            const editOption = card.querySelector('.edit-option');
            if (editOption) {
                editOption.addEventListener('click', function(event) {
                    event.stopPropagation();
                    editarRedacao(redacaoId);
                });
            }
            
            const deleteOption = card.querySelector('.delete-option');
            if (deleteOption) {
                deleteOption.addEventListener('click', function(event) {
                    event.stopPropagation();
                    excluirRedacao(redacaoId);
                });
            }
        });
    }
    
    // Event listener global para fechar menus
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.redacao-options')) {
            document.querySelectorAll('.options-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
    
    // Função para editar uma redação
    function editarRedacao(redacaoId) {
        const redacao = redacoes.find(r => r.id === parseInt(redacaoId));
        
        if (redacao) {
            // Fechar menu de opções
            document.querySelectorAll('.options-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Preencher o formulário com os dados da redação
            document.getElementById('redacao-tema').value = redacao.tema;
            document.getElementById('redacao-descricao').value = redacao.descricao;
            document.getElementById('redacao-entrega').value = redacao.dataEntrega;
            
            // Armazenar o ID da redação que está sendo editada
            redacaoForm.setAttribute('data-editing-id', redacaoId);
            
            // Mudar o título e texto do botão
            document.querySelector('.modal-content h2').textContent = 'Editar Redação';
            document.querySelector('.modal-content button[type="submit"]').textContent = 'Salvar Alterações';
            
            // Exibir o modal
            modal.style.display = 'block';
        }
    }
    
    // Função para excluir uma redação
    function excluirRedacao(redacaoId) {
        // Fechar menu de opções
        document.querySelectorAll('.options-menu').forEach(menu => {
            menu.classList.remove('active');
        });
        
        if (confirm('Tem certeza que deseja excluir esta redação?')) {
            redacoes = redacoes.filter(r => r.id !== parseInt(redacaoId));
            renderRedacoes();
        }
    }
    
    // Event listener para o formulário
    if (redacaoForm) {
        redacaoForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const tema = document.getElementById("redacao-tema").value;
            const descricao = document.getElementById("redacao-descricao").value;
            const dataEntrega = document.getElementById("redacao-entrega").value;
            const arquivoInput = document.getElementById("redacao-arquivo");
            
            // Verificar se estamos editando ou criando uma nova redação
            const editingId = this.getAttribute('data-editing-id');
            
            if (editingId) {
                // Estamos editando uma redação existente
                const index = redacoes.findIndex(r => r.id === parseInt(editingId));
                
                if (index !== -1) {
                    // Manter o arquivo original se nenhum novo for selecionado
                    let arquivo = redacoes[index].arquivo;
                    let arquivoObj = redacoes[index].arquivoObj;
                    
                    // Se um novo arquivo foi selecionado, atualizá-lo
                    if (arquivoInput.files.length > 0) {
                        arquivo = arquivoInput.files[0].name;
                        arquivoObj = arquivoInput.files[0];
                    }
                    
                    // Atualizar a redação
                    redacoes[index] = {
                        ...redacoes[index],
                        tema: tema,
                        descricao: descricao,
                        dataEntrega: dataEntrega,
                        arquivo: arquivo,
                        arquivoObj: arquivoObj
                    };
                }
                
                // Limpar o atributo de edição
                this.removeAttribute('data-editing-id');
                
                // Restaurar o título e texto do botão
                document.querySelector('.modal-content h2').textContent = 'Nova Redação';
                document.querySelector('.modal-content button[type="submit"]').textContent = 'Enviar Redação';
            } else {
                // Estamos criando uma nova redação
                let arquivo = null;
                let arquivoObj = null;
                
                if (arquivoInput.files.length > 0) {
                    arquivo = arquivoInput.files[0].name;
                    arquivoObj = arquivoInput.files[0];
                }
                
                const novaRedacao = {
                    id: redacoes.length > 0 ? Math.max(...redacoes.map(r => r.id)) + 1 : 1,
                    tema: tema,
                    descricao: descricao,
                    dataEntrega: dataEntrega,
                    dataCriacao: new Date().toISOString().split('T')[0],
                    arquivo: arquivo,
                    arquivoObj: arquivoObj
                };
                
                redacoes.unshift(novaRedacao);
            }
            
            renderRedacoes();
            
            // Resetar form e fechar modal
            this.reset();
            modal.style.display = 'none';
        });
    }
    
    // Event listener para pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderRedacoes(this.value);
        });
    }
    
    // Carregar redações ao iniciar
    renderRedacoes();
});