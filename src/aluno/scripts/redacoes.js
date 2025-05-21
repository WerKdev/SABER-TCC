document.addEventListener("DOMContentLoaded", function() {

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
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar a responsividade
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    // Função para verificar o tamanho da janela e ajustar elementos conforme necessário
    function checkWindowSize() {
        const width = window.innerWidth;
        const cards = document.querySelectorAll('.redacao-card');
        
        // Ajustar layout para diferentes tamanhos de tela
        if (width <= 768) {
            cards.forEach(card => {
                card.style.flexBasis = '100%';
            });
        } else if (width <= 1334) {
            cards.forEach(card => {
                card.style.flexBasis = 'calc(50% - 10px)';
            });
        } else {
            cards.forEach(card => {
                card.style.flexBasis = 'calc(33.333% - 14px)';
            });
        }
    }

    // Função para normalizar texto (remover acentos)
    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Captura os elementos de filtro
    const searchInput = document.querySelector('.search-bar input');
    const ordenarSelect = document.getElementById('ordenar-select');
    
    // Captura todos os cartões de redação
    const redacaoCards = document.querySelectorAll('.redacao-card');
    
    // Função para filtrar e exibir os cards
    function filtrarCards() {
        const termoBusca = searchInput.value.trim().toLowerCase();
        const tipoOrdenacao = ordenarSelect.value;
        
        // Array para armazenar cards visíveis para ordenação posterior
        let cardsVisiveis = [];
        
        redacaoCards.forEach(card => {
            const temaElemento = card.querySelector('.redacao-tema div');
            const statusElemento = card.querySelector('.redacao-status');
            
            if (!temaElemento || !statusElemento) return;
            
            const tema = normalizarTexto(temaElemento.textContent);
            const status = statusElemento.classList.contains('em-andamento') ? 'andamento' : 
                          statusElemento.classList.contains('corrigida') ? 'corrigidas' : 
                          statusElemento.classList.contains('encerrado') ? 'encerradas' : '';
            
            // Verificar se atende aos critérios de filtro
            const atendeTermoBusca = termoBusca === '' || tema.includes(normalizarTexto(termoBusca));
            const atendeStatus = tipoOrdenacao === 'recente' || tipoOrdenacao === 'prazo' || status === tipoOrdenacao;
            
            // Se atende aos critérios, adicionar à lista de visíveis
            if (atendeTermoBusca && atendeStatus) {
                cardsVisiveis.push(card);
                card.style.display = 'flex';
                card.classList.remove('filtered-out');
                card.classList.add('filtered-in');
            } else {
                card.classList.remove('filtered-in');
                card.classList.add('filtered-out');
                
                // Esconder após a animação
                setTimeout(() => {
                    if (card.classList.contains('filtered-out')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Ordenar cards visíveis conforme seleção
        if (tipoOrdenacao === 'recente' || tipoOrdenacao === 'prazo') {
            ordenarCards(cardsVisiveis, tipoOrdenacao);
        }
        
        // Forçar reflow para melhorar animações
        const container = document.querySelector('.redacoes-container');
        if (container) {
            void container.offsetHeight;
        }
    }
    
    // Função para ordenar cards
    function ordenarCards(cards, criterio) {
        const container = document.querySelector('.redacoes-container');
        if (!container) return;
        
        cards.sort((a, b) => {
            const dataA = extrairData(a);
            const dataB = extrairData(b);
            
            if (!dataA || !dataB) return 0;
            
            // 'recente' = mais novas primeiro (decrescente)
            // 'prazo' = prazo mais próximo primeiro (crescente)
            return criterio === 'recente' ? dataB - dataA : dataA - dataB;
        });
        
        // Reordenar cards no DOM
        cards.forEach(card => {
            container.appendChild(card);
        });
    }
    
    // Função para extrair data de um card
    function extrairData(card) {
        const dataElement = card.querySelector('.data-icon');
        if (!dataElement) return null;
        
        const texto = dataElement.textContent.trim();
        const match = texto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        
        if (match) {
            const [_, dia, mes, ano] = match;
            return new Date(`${mes}/${dia}/${ano}`);
        }
        
        return null;
    }
    
    // Adicionar eventos aos elementos de filtro
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filtrarCards, 300));
    }
    
    if (ordenarSelect) {
        ordenarSelect.addEventListener('change', filtrarCards);
    }
    
    // Função de debounce para melhorar performance
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Animação inicial dos cartões
    redacaoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
});