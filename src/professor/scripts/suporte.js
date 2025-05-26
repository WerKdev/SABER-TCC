document.addEventListener("DOMContentLoaded", function() {
    // Detectar se é professor ou aluno (simulação)
    const isProfessor = window.location.href.includes('professor') || 
                       document.querySelector('.navbar a[href*="turmas"]');
    
    if (isProfessor) {
        document.body.classList.add('professor');
    }

    // Elementos DOM
    const searchInput = document.getElementById('support-search');
    const ticketModal = document.getElementById('ticket-modal');
    const ticketForm = document.getElementById('ticket-form');
    const fileUploadArea = document.getElementById('ticket-file-area');
    const fileInput = document.getElementById('ticket-attachment');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    const myTicketsSection = document.getElementById('my-tickets');

    // Busca em tempo real
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterContent(searchTerm);
    });

    // Função de filtro
    function filterContent(term) {
        // Filtrar FAQs
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(term) || answer.includes(term)) {
                item.style.display = 'block';
                if (term.length > 2) {
                    // Destacar correspondências
                    highlightMatch(item, term);
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Filtrar categorias
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(term) || description.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Filtrar tutoriais
        const tutorialCards = document.querySelectorAll('.tutorial-card');
        tutorialCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(term) || description.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Destacar correspondências na busca
    function highlightMatch(element, term) {
        // Implementação simplificada
        element.style.border = '2px solid var(--azul-padrao)';
        setTimeout(() => {
            element.style.border = '';
        }, 3000);
    }

    // Toggle FAQ
    window.toggleFAQ = function(button) {
        const answer = button.nextElementSibling;
        const isActive = button.classList.contains('active');
        
        // Fechar todas as outras FAQs
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
        });
        
        // Abrir/fechar a FAQ clicada
        if (!isActive) {
            button.classList.add('active');
            answer.classList.add('active');
        }
    };

    // Filtrar por categoria
    window.filterByCategory = function(category) {
        // Rolar para a seção de FAQ
        document.querySelector('.faq-section').scrollIntoView({ behavior: 'smooth' });
        
        // Filtrar FAQs por categoria
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            // Simulação de categorização
            item.style.display = 'block';
        });
    };

    // Abrir modal de novo ticket
    window.openNewTicket = function() {
        ticketModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Fechar modal de ticket
    window.closeTicketModal = function() {
        ticketModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        ticketForm.reset();
        resetFileUploadArea();
    };

    // Visualizar tickets
    window.viewTickets = function() {
        myTicketsSection.style.display = 'block';
        myTicketsSection.scrollIntoView({ behavior: 'smooth' });
    };

    // Upload de arquivo
    fileUploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            displaySelectedFile(file);
        }
    });

    // Drag and drop
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--azul-padrao)';
        fileUploadArea.style.backgroundColor = 'rgba(34, 46, 82, 0.05)';
    });

    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.style.borderColor = '';
        fileUploadArea.style.backgroundColor = '';
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '';
        fileUploadArea.style.backgroundColor = '';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            fileInput.files = e.dataTransfer.files;
            displaySelectedFile(file);
        } else {
            alert('Por favor, selecione apenas arquivos de imagem.');
        }
    });

    function displaySelectedFile(file) {
        fileUploadArea.innerHTML = `
            <span class="material-symbols-outlined" style="color: var(--verde);">check_circle</span>
            <p>${file.name}</p>
            <span class="file-info">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            <button type="button" onclick="resetFileUploadArea()" style="margin-top: 10px; padding: 5px 15px; background: var(--vermelho); color: white; border: none; border-radius: 5px; cursor: pointer;">Remover</button>
        `;
    }

    window.resetFileUploadArea = function() {
        fileInput.value = '';
        fileUploadArea.innerHTML = `
            <span class="material-symbols-outlined">image</span>
            <p>Arraste uma imagem ou clique para selecionar</p>
            <span class="file-info">PNG, JPG (máx. 5MB)</span>
        `;
    };

    // Submissão do formulário de ticket
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio
        const formData = new FormData(ticketForm);
        const ticketData = {
            subject: formData.get('ticket-subject'),
            category: formData.get('ticket-category'),
            priority: formData.get('ticket-priority'),
            description: formData.get('ticket-description'),
            attachment: fileInput.files[0]
        };
        
        console.log('Novo ticket:', ticketData);
        
        // Feedback visual
        showNotification('Chamado criado com sucesso!', 'success');
        
        // Adicionar novo ticket à lista
        addNewTicketToList(ticketData);
        
        closeTicketModal();
    });

    // Adicionar novo ticket à lista
    function addNewTicketToList(ticketData) {
        const ticketsList = document.querySelector('.tickets-list');
        const newTicketId = '#2024003';
        const currentDate = new Date().toLocaleDateString('pt-BR');
        
        const newTicketHtml = `
            <div class="ticket-item" style="animation: slideIn 0.5s ease">
                <div class="ticket-header">
                    <span class="ticket-id">${newTicketId}</span>
                    <span class="ticket-status pending">Pendente</span>
                </div>
                <h4>${ticketData.subject}</h4>
                <p>${ticketData.description.substring(0, 100)}...</p>
                <div class="ticket-footer">
                    <span class="ticket-date">${currentDate}</span>
                    <span class="ticket-category">${getCategoryName(ticketData.category)}</span>
                </div>
            </div>
        `;
        
        ticketsList.insertAdjacentHTML('afterbegin', newTicketHtml);
        
        // Mostrar seção de tickets
        myTicketsSection.style.display = 'block';
    }

    function getCategoryName(category) {
        const categories = {
            'conta': 'Conta',
            'materiais': 'Materiais',
            'atividades': 'Atividades',
            'tecnico': 'Técnico',
            'ia': 'IA',
            'outros': 'Outros'
        };
        return categories[category] || 'Outros';
    }

    // Chat Widget
    window.toggleChat = function() {
        chatWindow.classList.toggle('active');
        
        // Remover notificação quando abrir o chat
        const notification = document.querySelector('.chat-notification');
        if (notification && chatWindow.classList.contains('active')) {
            notification.style.display = 'none';
        }
    };

    // Enviar mensagem no chat
    window.sendMessage = function() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Adicionar mensagem do usuário
        addMessageToChat(message, 'user');
        
        // Limpar input
        chatInput.value = '';
        
        // Simular resposta do agente
        setTimeout(() => {
            const responses = [
                'Entendi sua dúvida. Vou verificar isso para você.',
                'Posso ajudar com isso! Deixe-me buscar as informações.',
                'Compreendo. Você já tentou verificar na seção de FAQ?',
                'Vou transferir você para um especialista. Um momento, por favor.',
                'Essa é uma ótima pergunta! Vamos resolver isso juntos.'
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat(randomResponse, 'agent');
        }, 1000);
    };

    function addMessageToChat(message, sender) {
        const messageTime = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const messageHtml = `
            <div class="message ${sender}">
                <p>${message}</p>
                <span class="message-time">${messageTime}</span>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Enter para enviar mensagem
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Notificações
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="material-symbols-outlined">
                ${type === 'success' ? 'check_circle' : 'info'}
            </span>
            <p>${message}</p>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--verde)' : 'var(--azul-info)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
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

    // Iniciar chat
    window.startChat = function() {
        toggleChat();
        
        // Adicionar mensagem de boas-vindas personalizada
        setTimeout(() => {
            const welcomeMessage = isProfessor ? 
                'Olá, Professor! Como posso ajudar com suas turmas hoje?' :
                'Olá! Como posso ajudar com seus estudos hoje?';
            addMessageToChat(welcomeMessage, 'agent');
        }, 500);
    };

    // Fechar modais ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === ticketModal) {
            closeTicketModal();
        }
    });

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // ESC para fechar modais
        if (e.key === 'Escape') {
            closeTicketModal();
            if (chatWindow.classList.contains('active')) {
                toggleChat();
            }
        }
        
        // Ctrl+/ para focar na busca
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // Simular status do sistema (atualização periódica)
    function updateSystemStatus() {
        const services = document.querySelectorAll('.service-indicator');
        
        // 95% de chance de estar online
        services.forEach(service => {
            const isOnline = Math.random() > 0.05;
            service.className = `service-indicator ${isOnline ? 'online' : 'maintenance'}`;
        });
    }

    // Atualizar status a cada 30 segundos
    setInterval(updateSystemStatus, 30000);

    // Tutorial de vídeo (simulação)
    document.querySelectorAll('.tutorial-card').forEach(card => {
        card.addEventListener('click', () => {
            alert('Abrindo tutorial em vídeo...');
            // Aqui você integraria com um player de vídeo real
        });
    });

    // Mostrar elementos específicos do professor
    if (isProfessor) {
        document.querySelectorAll('.professor-only').forEach(el => {
            el.style.display = 'block';
        });
    }
});