document.addEventListener('DOMContentLoaded', () => {
    // ===== CHAT FUNCTIONALITY =====
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeForm = document.getElementById('welcome-form');
    const welcomeInput = document.getElementById('welcome-input');
    const appContainer = document.getElementById('appContainer');
    
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const thinkingIndicator = document.getElementById('thinking');
    
    let chatHistory = [];
    
    // Event listeners para chat
    if (welcomeForm) {
        welcomeForm.addEventListener('submit', handleWelcomeSubmit);
    }
    if (messageForm) {
        messageForm.addEventListener('submit', handleSubmit);
    }
    if (messageInput) {
        messageInput.addEventListener('input', autoResizeTextarea);
    }
    
    async function handleWelcomeSubmit(e) {
        e.preventDefault();
        
        const firstMessage = welcomeInput.value.trim();
        if (!firstMessage) return;
        
        welcomeScreen.classList.add('fade-out');
        
        setTimeout(async () => {
            welcomeScreen.style.display = 'none';
            appContainer.style.display = 'flex';
            
            // Mensagem de boas-vindas removida
            // addMessageToChat('ai', 'Olá! Eu sou o SABER, seu assistente inteligente para aprendizado e desenvolvimento. Como posso ajudá-lo hoje?', true);
            
            // Processar primeira mensagem
            messageInput.value = firstMessage;
            handleSubmit(new Event('submit'));
        }, 500);
    }
    
    function autoResizeTextarea() {
        this.style.height = 'auto';
        let newHeight = this.scrollHeight;
        if (newHeight > 150) newHeight = 150; 
        this.style.height = `${newHeight}px`;
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;
        
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        addMessageToChat('user', message);
        chatHistory.push({ user: message });
        
        thinkingIndicator.style.display = 'flex';
        
        try {
             const response = await fetch('/api/chat', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ message, history: chatHistory })
             });
             const data = await response.json();
            
            thinkingIndicator.style.display = 'none';
             addMessageToChat('ai', data.response, true); // true para efeito de digitação
             chatHistory.push({ assistant: data.response });
            
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            thinkingIndicator.style.display = 'none';
            addMessageToChat('ai', 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
        }
        
        scrollToBottom();
    }
    
    function addMessageToChat(sender, text, useTypingEffect = false) {
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const formattedText = formatMessage(text);
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <div class="avatar-circle">${sender === 'user' ? 'U' : '<div class="logo-img" style="transform: scale(30%);"><img src="logo.png" alt="Logo"></div>'}</div>
                </div>
                <div class="message-bubble">
                    <div class="message-text" data-full-text="${formattedText}"></div>
                </div>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        const messageTextElement = messageDiv.querySelector('.message-text');
        
        if (sender === 'ai' && useTypingEffect) {
            typeWriter(messageTextElement, formattedText);
        } else {
            messageTextElement.innerHTML = formattedText;
        }
        
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
        
        scrollToBottom();
    }
    
    function typeWriter(element, text, speed = 30) {
        element.innerHTML = '';
        let i = 0;
        
        // Criar cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);
        
        function type() {
            if (i < text.length) {
                // Inserir caractere antes do cursor
                const char = text.charAt(i);
                const textNode = document.createTextNode(char);
                element.insertBefore(textNode, cursor);
                i++;
                setTimeout(type, speed);
                scrollToBottom();
            } else {
                // Remover cursor quando terminar
                cursor.remove();
                // Aplicar formatação HTML completa
                element.innerHTML = text;
            }
        }
        
        type();
    }
    
    function formatMessage(text) {
        let formatted = text.replace(/\n/g, '<br>');
        formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        return formatted;
    }
    
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

});