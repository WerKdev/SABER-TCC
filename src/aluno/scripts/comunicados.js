// =========== COMUNICADOS JAVASCRIPT ===========

document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const searchInput = document.getElementById("search-comunicados");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const comunicadosList = document.querySelector(".comunicados-list");
    const comunicadoItems = document.querySelectorAll(".comunicado-item");
    const markAllReadBtn = document.querySelector(".btn-mark-all-read");
    const modal = document.getElementById("comunicado-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    
    // Dados simulados de comunicados (em produção viriam da API)
    const comunicadosData = {
        1: {
            title: "Alteração no calendário de provas",
            author: "Direção Acadêmica",
            type: "escola",
            date: "25 de maio de 2025, 10:30",
            message: `Prezados alunos,

Informamos que devido aos jogos estudantis que ocorrerão na próxima semana, as provas do período foram remarcadas.

As novas datas são:
- Matemática: 05/06 (quinta-feira) às 14h
- Física: 06/06 (sexta-feira) às 10h
- Química: 09/06 (segunda-feira) às 14h
- Biologia: 10/06 (terça-feira) às 10h

As provas serão realizadas no mesmo local previamente agendado. Caso tenham alguma dúvida, procurem a coordenação.

Atenciosamente,
Direção Acadêmica`,
            attachments: []
        },
        2: {
            title: "Nova lista de exercícios disponível",
            author: "Prof. Carlos Silva - Matemática",
            type: "professor",
            date: "25 de maio de 2025, 07:00",
            message: `Olá turma!

Disponibilizei uma nova lista de exercícios sobre equações diferenciais. 

O prazo para entrega é dia 30/05. A lista está disponível na seção de materiais da disciplina.

Alguns pontos importantes:
- São 15 questões no total
- Todas devem ser resolvidas com demonstração completa
- Podem ser entregues digitalmente ou em papel
- Vale 2 pontos na média

Qualquer dúvida, me procurem no horário de atendimento ou enviem mensagem.

Bons estudos!
Prof. Carlos`,
            attachments: [
                { name: "Lista_Equacoes_Diferenciais.pdf", size: "245 KB" }
            ]
        },
        3: {
            title: "Atualização do sistema SABER",
            author: "Equipe de TI",
            type: "sistema",
            date: "24 de maio de 2025, 15:00",
            message: `Informamos que o sistema SABER passará por manutenção programada.

Data: Sábado, 31/05/2025
Horário: 00h às 06h

Durante este período, o sistema ficará indisponível. Recomendamos que salvem todos os trabalhos em andamento antes do início da manutenção.

Melhorias implementadas:
- Novo sistema de notificações em tempo real
- Melhor desempenho no carregamento de páginas
- Correções de bugs reportados
- Nova funcionalidade de chat com professores

Agradecemos a compreensão.
Equipe de TI`,
            attachments: []
        }
    };

    // Estado atual dos filtros
    let currentFilter = "todos";
    let searchTerm = "";

    // Função para filtrar comunicados
    function filterComunicados() {
        comunicadoItems.forEach(item => {
            const type = item.dataset.type;
            const content = item.textContent.toLowerCase();
            const matchesFilter = currentFilter === "todos" || type === currentFilter;
            const matchesSearch = searchTerm === "" || content.includes(searchTerm.toLowerCase());
            
            if (matchesFilter && matchesSearch) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
        
        updateCounts();
    }

    // Atualizar contadores dos filtros
    function updateCounts() {
        const counts = {
            todos: 0,
            escola: 0,
            professor: 0,
            sistema: 0
        };

        comunicadoItems.forEach(item => {
            if (item.style.display !== "none") {
                counts.todos++;
                counts[item.dataset.type]++;
            }
        });

        filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            const countElement = btn.querySelector(".count");
            if (countElement) {
                countElement.textContent = counts[filter];
            }
        });
    }

    // Event listeners para filtros
    filterButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(b => b.classList.remove("active"));
            
            // Adicionar classe active ao botão clicado
            this.classList.add("active");
            
            // Atualizar filtro atual e aplicar
            currentFilter = this.dataset.filter;
            filterComunicados();
        });
    });

    // Event listener para busca
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            searchTerm = this.value;
            filterComunicados();
        });
    }

    // Marcar todos como lidos
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener("click", function() {
            const unreadItems = document.querySelectorAll(".comunicado-item.unread");
            
            unreadItems.forEach(item => {
                item.classList.remove("unread");
                const markReadBtn = item.querySelector(".btn-action");
                if (markReadBtn) {
                    const icon = markReadBtn.querySelector("span");
                    icon.textContent = "archive";
                    markReadBtn.title = "Arquivar";
                }
            });

            // Atualizar badge de notificações
            updateNotificationBadge();
        });
    }

    // Função para atualizar badge de notificações
    function updateNotificationBadge() {
        const badge = document.querySelector(".notification-badge");
        const unreadCount = document.querySelectorAll(".comunicado-item.unread").length;
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = "flex";
            } else {
                badge.style.display = "none";
            }
        }
    }

    // Abrir modal com detalhes do comunicado
    comunicadoItems.forEach(item => {
        item.addEventListener("click", function(e) {
            // Evitar abrir modal se clicar no botão de ação
            if (e.target.closest(".btn-action")) {
                return;
            }

            const comunicadoId = this.dataset.id;
            const data = comunicadosData[comunicadoId];

            if (data) {
                // Preencher modal com dados
                document.getElementById("modal-title").textContent = data.title;
                document.getElementById("modal-author").textContent = data.author;
                document.getElementById("modal-date").textContent = data.date;
                document.getElementById("modal-message").textContent = data.message;
                
                // Configurar tag do tipo
                const tagElement = document.getElementById("modal-tag");
                tagElement.textContent = data.type.charAt(0).toUpperCase() + data.type.slice(1);
                tagElement.className = `meta-tag ${data.type}`;
                
                // Configurar anexos
                const attachmentsSection = document.getElementById("modal-attachments");
                const attachmentsList = attachmentsSection.querySelector(".attachments-list");
                
                if (data.attachments && data.attachments.length > 0) {
                    attachmentsList.innerHTML = "";
                    data.attachments.forEach(attachment => {
                        const attachmentItem = document.createElement("div");
                        attachmentItem.className = "attachment-item";
                        attachmentItem.innerHTML = `
                            <span class="material-symbols-outlined">attach_file</span>
                            <span>${attachment.name}</span>
                            <span style="margin-left: auto; color: var(--texto-secundario); font-size: 13px;">${attachment.size}</span>
                        `;
                        attachmentsList.appendChild(attachmentItem);
                    });
                    attachmentsSection.style.display = "block";
                } else {
                    attachmentsSection.style.display = "none";
                }
                
                // Configurar botão baseado no status
                const markReadBtn = document.getElementById("btn-mark-read");
                if (this.classList.contains("unread")) {
                    markReadBtn.style.display = "flex";
                    markReadBtn.onclick = () => {
                        this.classList.remove("unread");
                        const actionBtn = this.querySelector(".btn-action");
                        if (actionBtn) {
                            actionBtn.querySelector("span").textContent = "archive";
                            actionBtn.title = "Arquivar";
                        }
                        modal.style.display = "none";
                        updateNotificationBadge();
                    };
                } else {
                    markReadBtn.style.display = "none";
                }
                
                // Mostrar modal
                modal.style.display = "flex";
            }
        });
    });

    // Ações nos botões de cada comunicado
    document.querySelectorAll(".btn-action").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            
            const comunicadoItem = this.closest(".comunicado-item");
            const icon = this.querySelector("span");
            
            if (comunicadoItem.classList.contains("unread")) {
                // Marcar como lido
                comunicadoItem.classList.remove("unread");
                icon.textContent = "archive";
                this.title = "Arquivar";
                updateNotificationBadge();
            } else {
                // Arquivar (animação de remoção)
                comunicadoItem.style.opacity = "0";
                comunicadoItem.style.transform = "translateX(50px)";
                
                setTimeout(() => {
                    comunicadoItem.remove();
                    updateCounts();
                }, 300);
            }
        });
    });

    // Fechar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

    // Fechar modal ao clicar fora
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Botão de arquivar no modal
    document.getElementById("btn-archive").addEventListener("click", function() {
        const activeId = document.querySelector(".comunicado-item:hover")?.dataset.id;
        if (activeId) {
            const item = document.querySelector(`[data-id="${activeId}"]`);
            if (item) {
                item.style.opacity = "0";
                item.style.transform = "translateX(50px)";
                setTimeout(() => {
                    item.remove();
                    updateCounts();
                }, 300);
            }
        }
        modal.style.display = "none";
    });

    // Paginação
    document.querySelectorAll(".pagination-number").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".pagination-number").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            
            // Aqui você implementaria a lógica de carregar mais comunicados
            // Por enquanto, apenas simula o comportamento visual
        });
    });

    document.querySelectorAll(".pagination-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            if (!this.disabled) {
                const currentPage = document.querySelector(".pagination-number.active");
                const allPages = document.querySelectorAll(".pagination-number");
                const currentIndex = Array.from(allPages).indexOf(currentPage);
                
                if (this.querySelector("span").textContent === "chevron_left" && currentIndex > 0) {
                    allPages[currentIndex].classList.remove("active");
                    allPages[currentIndex - 1].classList.add("active");
                } else if (this.querySelector("span").textContent === "chevron_right" && currentIndex < allPages.length - 1) {
                    allPages[currentIndex].classList.remove("active");
                    allPages[currentIndex + 1].classList.add("active");
                }
                
                // Atualizar estado dos botões
                updatePaginationButtons();
            }
        });
    });

    function updatePaginationButtons() {
        const currentPage = document.querySelector(".pagination-number.active");
        const allPages = document.querySelectorAll(".pagination-number");
        const currentIndex = Array.from(allPages).indexOf(currentPage);
        
        const prevBtn = document.querySelector('.pagination-btn:first-child');
        const nextBtn = document.querySelector('.pagination-btn:last-child');
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === allPages.length - 1;
    }

    // Inicializar contadores e notificações
    updateCounts();
    updateNotificationBadge();
    
    // Adicionar efeito de entrada nos comunicados
    comunicadoItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            item.style.transition = "all 0.3s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, index * 100);
    });

    console.log("Sistema de comunicados inicializado com sucesso!");
});