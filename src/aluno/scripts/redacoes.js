document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM frequentemente usados
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");
    const menuIconMobile = document.getElementById("menu-icon-mobile");
    const notificationsIcon = document.getElementById("notifications-icon");
    const notificationsPopup = document.getElementById("notifications-popup");
    const userIcon = document.getElementById("user-icon");
    const userIconPopup = document.getElementById("user-icon-popup");
    
    // Toggle para sidebar (desktop e mobile)
    if (menuIconSidebar && sidebar) {
        menuIconSidebar.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }
    
    if (menuIconMobile && sidebar) {
        menuIconMobile.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }
    
    // Popups de notificações e usuário
    if (notificationsIcon && notificationsPopup) {
        notificationsIcon.addEventListener("click", function(event) {
            // Alterna visibilidade do popup de notificações
            notificationsPopup.style.display = notificationsPopup.style.display === 'block' ? 'none' : 'block';
            
            // Fecha o menu de usuário se estiver aberto
            if (userIconPopup) {
                userIconPopup.style.display = 'none';
            }
            
            event.stopPropagation();
        });
    }
    
    if (userIcon && userIconPopup) {
        userIcon.addEventListener("click", function(event) {
            // Alterna visibilidade do popup de usuário
            userIconPopup.style.display = userIconPopup.style.display === 'block' ? 'none' : 'block';
            
            // Fecha o menu de notificações se estiver aberto
            if (notificationsPopup) {
                notificationsPopup.style.display = 'none';
            }
            
            event.stopPropagation();
        });
    }
    
    // Fecha popups ao clicar fora
    document.addEventListener("click", function(event) {
        if (notificationsPopup && !event.target.closest('#notifications-icon') && !event.target.closest('#notifications-popup')) {
            notificationsPopup.style.display = 'none';
        }
        if (userIconPopup && !event.target.closest('#user-icon') && !event.target.closest('#user-icon-popup')) {
            userIconPopup.style.display = 'none';
        }
    });
    
    // Verificar tamanho da janela para ajustes responsivos
    function checkWindowSize() {
        if (window.innerWidth <= 768) {
            // Em telas menores que 768px, redefine a sidebar
            if (sidebar) {
                sidebar.classList.remove("active");
            }
        }
    }
    
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    // Função para normalizar texto (remover acentos)
    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Captura os elementos de filtro
    const searchInput = document.querySelector('.search-bar input');
    const ordenarSelect = document.getElementById('ordenar-select');
    
    // Captura todos os cartões de redação
    const redacaoCards = document.querySelectorAll('.redacao-card');
    
    // Função para forçar o reflow após filtragem
    function forceReflow() {
        requestAnimationFrame(() => {
            const container = document.querySelector('.redacoes-container');
            if (container) {
                void container.offsetHeight;
            }
        });
    }
    
    // Função para animar a entrada/saída dos elementos com comportamento unificado
    function animateElement(element, isVisible, delay = 0) {
        if (!element) return;
        
        // Remover classes anteriores
        element.classList.remove('filtered-in', 'filtered-out');
        
        if (isVisible) {
            // Definir estado inicial sem animação
            element.style.transition = 'none';
            element.style.display = '';
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px) scale(0.95)';
            element.style.pointerEvents = 'auto'; // Reativar interações
            
            // Usar requestAnimationFrame para garantir que as mudanças sejam aplicadas
            requestAnimationFrame(() => {
                setTimeout(() => {
                    element.classList.add('filtered-in');
                    element.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }, delay);
            });
        } else {
            // Animar para fora sem flickering
            requestAnimationFrame(() => {
                element.style.transition = 'opacity 0.2s ease, transform 0.2s ease-out';
                element.classList.add('filtered-out');
                element.style.opacity = '0';
                element.style.transform = 'translateY(10px) scale(0.95)';
                element.style.pointerEvents = 'none'; // Desativar interações
                
                // Ocultar após animação
                setTimeout(() => {
                    if (element.classList.contains('filtered-out')) {
                        element.style.display = 'none';
                    }
                }, 200);
            });
        }
    }
    
    // Função unificada para filtrar e ordenar os cards
    function aplicarFiltrosEOrdenacao(tipoOrdenacao, termoBusca = '') {
        if (!redacaoCards.length) return;
        const container = document.querySelector('.redacoes-container');
        if (!container) return;
        
        // Determinar quais cards devem ser mostrados com base nos critérios combinados
        const cardsInfo = Array.from(redacaoCards).map(card => {
            // Verificar filtro por status
            let atendeStatus = true;
            if (tipoOrdenacao === 'encerradas') {
                atendeStatus = card.querySelector('.redacao-status')?.classList.contains('encerrado');
            } else if (tipoOrdenacao === 'corrigidas') {
                atendeStatus = card.querySelector('.redacao-status')?.classList.contains('corrigida');
            } else if (tipoOrdenacao === 'andamento') {
                atendeStatus = card.querySelector('.redacao-status')?.classList.contains('em-andamento');
            }
            
            // Verificar filtro por tema (busca)
            let atendeBusca = true;
            if (termoBusca) {
                const temaElement = card.querySelector('.redacao-tema div');
                if (temaElement) {
                    const temaTexto = normalizarTexto(temaElement.textContent);
                    const termoNormalizado = normalizarTexto(termoBusca);
                    atendeBusca = temaTexto.includes(termoNormalizado);
                } else {
                    atendeBusca = false;
                }
            }
            
            // Extrair informação de data para ordenação
            let dataObj = null;
            const dataText = card.querySelector('.data-icon')?.textContent.trim();
            if (dataText) {
                const match = dataText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
                if (match) {
                    const [dia, mes, ano] = match.slice(1);
                    dataObj = new Date(`${mes}/${dia}/${ano}`);
                }
            }
            
            return {
                card,
                mostrar: atendeStatus && atendeBusca,
                data: dataObj
            };
        });
        
        // Primeiro ocultar todos os cards
        cardsInfo.forEach(({ card }) => {
            animateElement(card, false);
        });
        
        // Filtrar apenas os cards que devem ser mostrados
        const cardsVisiveis = cardsInfo.filter(info => info.mostrar);
        
        // Ordenar os cards visíveis
        if (tipoOrdenacao === 'prazo') {
            // Ordenar por data crescente (mais próxima primeiro)
            cardsVisiveis.sort((a, b) => a.data - b.data);
        } else if (tipoOrdenacao === 'recente') {
            // Ordenar por data decrescente (mais recente primeiro)
            cardsVisiveis.sort((a, b) => b.data - a.data);
        }
        
        // Após um curto delay, remover todos os cards visíveis e reinseri-los na ordem correta
        setTimeout(() => {
            // Remover todos os cards do container
            cardsVisiveis.forEach(({ card }) => {
                if (container.contains(card)) {
                    container.removeChild(card);
                }
            });
            
            // Adicionar os cards na nova ordem
            cardsVisiveis.forEach(({ card }, index) => {
                container.appendChild(card);
                
                // Animar a entrada com delay escalonado
                setTimeout(() => {
                    animateElement(card, true, 30 * index);
                }, 50);
            });
        }, 250);  // Aguardar até que a animação de saída esteja concluída
    }
    
    // Aplicar evento de ordenação ao select
    if (ordenarSelect) {
        ordenarSelect.addEventListener('change', function() {
            const termoBusca = searchInput ? searchInput.value.trim() : '';
            aplicarFiltrosEOrdenacao(this.value, termoBusca);
        });
    }
    
    // Função de debounce para melhorar performance
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // Aplicar evento de pesquisa na barra de pesquisa
    if (searchInput) {
        const debouncedSearch = debounce(function() {
            const tipoOrdenacao = ordenarSelect ? ordenarSelect.value : 'recente';
            aplicarFiltrosEOrdenacao(tipoOrdenacao, this.value.trim());
        }, 250);
        
        searchInput.addEventListener('input', debouncedSearch);
        
        // Limpar campo ao pressionar Escape
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                const tipoOrdenacao = ordenarSelect ? ordenarSelect.value : 'recente';
                aplicarFiltrosEOrdenacao(tipoOrdenacao, '');
            }
        });
    }
    
    // Animação inicial dos cartões ao carregar a página
    if (redacaoCards.length > 0) {
        redacaoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(25px) scale(0.95)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 50 + (50 * index));
        });
    }
});