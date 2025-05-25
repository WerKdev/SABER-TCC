document.addEventListener("DOMContentLoaded", function() {
    const attachBtn = document.querySelector('.attach-file-btn');
    const markCompleteBtn = document.querySelector('.mark-complete-btn');
    const fileUpload = document.getElementById('file-upload');
    const statusText = document.querySelector('.status');
    
    // Configurar responsividade (baseada na tela de redações)
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    
    // Configurar botão voltar para sempre voltar para página anterior
    configurarBotaoVoltar();
    
    // Substituindo completamente a seção de dúvidas por Comentário Particular
    const teacherHelpDiv = document.querySelector('.teacher-help');
    if (teacherHelpDiv) {
        // Modificando o conteúdo HTML
        teacherHelpDiv.innerHTML = `
            <h3>Comentário Particular</h3>
            <textarea placeholder="Adicionar comentário particular..."></textarea>
            <button class="send-question-btn">Enviar</button>
        `;
        
        // Ajustando o margin-top
        teacherHelpDiv.style.marginTop = '30px';
    }
    
    // Redefinindo as variáveis com os novos elementos
    const sendQuestionBtn = document.querySelector('.teacher-help .send-question-btn');
    const questionTextarea = document.querySelector('.teacher-help textarea');

    // Verificar prazo da atividade
    function isPastDeadline() {
        const deadlineText = document.querySelector('.deadline').textContent;
        const deadlineParts = deadlineText.match(/(\d+)\/(\d+)\/(\d+)/);
        
        if (deadlineParts) {
            const deadlineDate = new Date(
                2000 + parseInt(deadlineParts[3]), // ano
                parseInt(deadlineParts[2]) - 1, // mês (0-11)
                parseInt(deadlineParts[1]) // dia
            );
            
            const currentDate = new Date();
            return currentDate > deadlineDate;
        }
        return false;
    }

    attachBtn.addEventListener('click', function() {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
            attachBtn.innerHTML = `<span class="material-symbols-outlined">attach_file</span> ${this.files[0].name}`;
            statusText.textContent = 'Pronto para enviar';
            statusText.style.color = '#16a34a';
        }
    });

    // Event listener para o botão de marcar como concluído/cancelar envio
    markCompleteBtn.addEventListener('click', function() {
        const currentStatus = statusText.textContent.toLowerCase();
        
        if (currentStatus === 'entregue' || currentStatus === 'atrasado') {
            showCancelConfirmPopup();
        } else {
            // Removida a verificação de arquivo anexado
            showCompleteConfirmPopup();
        }
    });

    // Adicionar eventos para o comentário particular
    if (sendQuestionBtn && questionTextarea) {
        sendQuestionBtn.addEventListener('click', function() {
            sendPrivateComment();
        });
        
        questionTextarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendPrivateComment();
            }
        });
        
        function sendPrivateComment() {
            if (questionTextarea.value.trim() !== '') {
                alert('Comentário particular enviado com sucesso!');
                questionTextarea.value = '';
            } else {
                alert('Por favor, escreva seu comentário antes de enviar.');
            }
        }
    }
    
    // Adicionar seção de comentários para a turma
    const activityCard = document.querySelector('.activity-card');
    if (activityCard) {
        // Verifica se já existe uma seção de comentários
        let classCommentsSection = document.querySelector('.class-comments');
        
        // Se não existir, cria uma nova seção
        if (!classCommentsSection) {
            classCommentsSection = document.createElement('div');
            classCommentsSection.className = 'class-comments';
            activityCard.appendChild(classCommentsSection);
        }
        
        // Adiciona o formulário de comentários para a turma
        const commentFormTurma = document.createElement('div');
        commentFormTurma.className = 'comment-form-turma';
        commentFormTurma.innerHTML = `
            <div class="comentario-titulo">Comentário para a Turma</div>
            <textarea placeholder="Adicionar comentário para a turma..."></textarea>
            <button class="enviar-btn">Enviar</button>
        `;
        
        // Insere o formulário após a seção de comentários
        activityCard.appendChild(commentFormTurma);
        
        const commentTextarea = commentFormTurma.querySelector('textarea');
        const sendCommentBtn = commentFormTurma.querySelector('.enviar-btn');
        
        sendCommentBtn.addEventListener('click', function() {
            addClassComment();
        });
        
        commentTextarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addClassComment();
            }
        });
        
        function addClassComment() {
            const commentText = commentTextarea.value.trim();
            if (commentText !== '') {
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                
                const userName = document.getElementById('user-name-header').textContent;
                
                newComment.innerHTML = `
                    <strong>${userName}:</strong>
                    <p>${commentText}</p>
                `;
                
                classCommentsSection.appendChild(newComment);
                commentTextarea.value = '';
            } else {
                alert('Por favor, escreva um comentário antes de enviar.');
            }
        }
    }

    // Adicionar estilos para ambas as seções
    const style = document.createElement('style');
    style.textContent = `
        .teacher-help {
            margin-top: 30px !important;
        }
        
        .comment-form-turma {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 20px;
            margin-top: 25px;
        }
        
        .comment-form-turma textarea {
            width: 100%;
            height: 80px;
            padding: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            margin-bottom: 12px;
            resize: vertical;
            font-family: inherit;
            font-size: 14px;
        }
        
        .enviar-btn {
            width: 100%;
            padding: 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            transition: background 0.2s;
        }
        
        .enviar-btn:hover {
            background: #2563eb;
        }
    `;
    
    document.head.appendChild(style);

    // Event handler para o botão de mais opções
    const moreOptionsBtn = document.querySelector('.more-options');
    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showOptionsMenu(this);
        });
    }

    // Melhorar touch interactions em mobile (baseado na tela de redações)
    if ('ontouchstart' in window) {
        // Adicionar classe para devices touch
        document.body.classList.add('touch-device');
        
        // Otimizar cliques em botões para touch
        const buttons = document.querySelectorAll('button, .attach-file-btn, .mark-complete-btn');
        buttons.forEach(button => {
            button.style.minHeight = '44px'; // Mínimo recomendado para touch
        });
    }
});

// Função para configurar o botão voltar para sempre voltar para página anterior
function configurarBotaoVoltar() {
    const btnVoltar = document.querySelector('.btn-secondary');
    
    if (btnVoltar) {
        // Remover onclick inline se existir
        btnVoltar.removeAttribute('onclick');
        
        // Adicionar event listener para voltar para página anterior
        btnVoltar.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Verificar se há histórico para voltar
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Se não houver histórico, voltar para lista de atividades como fallback
                window.location.href = 'lista-atividades.html';
            }
        });
    }
}

// Função para mostrar popup de confirmação para marcar como concluído
function showCompleteConfirmPopup() {
    // Remove popup existente se houver
    const existingPopup = document.querySelector('.complete-confirm-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Criar popup
    const popup = document.createElement('div');
    popup.className = 'popup-overlay complete-confirm-popup';
    popup.innerHTML = `
        <div class="popup confirm-popup">
            <div class="popup-header">
                <h2>Marcar como concluída?</h2>
                <span class="material-symbols-outlined close-popup">close</span>
            </div>
            <div class="popup-content">
                <p>Tem certeza que deseja marcar esta atividade como concluída?</p>
                <div class="popup-actions">
                    <button type="button" class="btn-cancel">Cancelar</button>
                    <button type="button" class="btn-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Adicionar event listeners
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-cancel').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-confirm').addEventListener('click', () => {
        markAsCompleted();
        popup.remove();
    });
    
    // Fechar ao clicar fora do popup
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

// Função para mostrar popup de confirmação para cancelar envio
function showCancelConfirmPopup() {
    // Remove popup existente se houver
    const existingPopup = document.querySelector('.cancel-confirm-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Criar popup
    const popup = document.createElement('div');
    popup.className = 'popup-overlay cancel-confirm-popup';
    popup.innerHTML = `
        <div class="popup confirm-popup">
            <div class="popup-header">
                <h2>Cancelar o envio?</h2>
                <span class="material-symbols-outlined close-popup">close</span>
            </div>
            <div class="popup-content">
                <p>Cancele o envio para adicionar ou alterar anexos. Não se esqueça de enviar a atividade novamente depois de concluir a alteração.</p>
                <div class="popup-actions">
                    <button type="button" class="btn-cancel">Cancelar</button>
                    <button type="button" class="btn-confirm">Cancelar envio</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Adicionar event listeners
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-cancel').addEventListener('click', () => {
        popup.remove();
    });
    
    popup.querySelector('.btn-confirm').addEventListener('click', () => {
        cancelSubmission();
        popup.remove();
    });
    
    // Fechar ao clicar fora do popup
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

// Função para marcar atividade como concluída
function markAsCompleted() {
    const statusText = document.querySelector('.status');
    const markCompleteBtn = document.querySelector('.mark-complete-btn');
    
    // Verificar se está atrasado
    const isLate = isPastDeadline();
    
    // Atualizar o status
    statusText.textContent = isLate ? 'Atrasado' : 'Entregue';
    statusText.style.color = isLate ? '#dc2626' : '#16a34a';
    
    // Atualizar o botão
    markCompleteBtn.innerHTML = '<span class="material-symbols-outlined">cancel</span> Cancelar envio';
    markCompleteBtn.style.backgroundColor = '#fee2e2'; 
    markCompleteBtn.style.color = '#dc2626'; 
    
    // Aqui você faria uma chamada para a API para atualizar o status no backend
    console.log('Atividade marcada como concluída');
}

// Função para cancelar envio
function cancelSubmission() {
    const statusText = document.querySelector('.status');
    const markCompleteBtn = document.querySelector('.mark-complete-btn');
    const attachBtn = document.querySelector('.attach-file-btn');
    const fileUpload = document.getElementById('file-upload');
    
    // Atualizar o status
    statusText.textContent = 'Aguardando envio';
    statusText.style.color = '#64748b';
    
    // Atualizar o botão
    markCompleteBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Marcar como concluído';
    markCompleteBtn.style.backgroundColor = '#0c142b';
    markCompleteBtn.style.color = 'white'; 
    
    // Resetar o botão de anexar
    attachBtn.innerHTML = '<span class="material-symbols-outlined">attach_file</span> Anexar arquivo';
    fileUpload.value = '';
    
    // Aqui você faria uma chamada para a API para atualizar o status no backend
    console.log('Envio cancelado');
}

// Função para mostrar menu de opções
function showOptionsMenu(button) {
    // Remove menu existente se houver
    const existingMenu = document.querySelector('.options-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    // Criar menu
    const menu = document.createElement('div');
    menu.className = 'options-menu';
    menu.innerHTML = `
        <ul>
            <li data-action="copy-link">
                <span class="material-symbols-outlined">link</span>
                Copiar link
            </li>
        </ul>
    `;
    
    // Adicionar ao card para posicionamento relativo
    const activityCard = button.closest('.activity-card');
    activityCard.appendChild(menu);
    
    // Posicionar menu em relação ao botão
    const buttonRect = button.getBoundingClientRect();
    const cardRect = activityCard.getBoundingClientRect();
    
    // Calcular posição relativa ao card
    const relativeLeft = buttonRect.left - cardRect.left;
    const relativeTop = buttonRect.bottom - cardRect.top + 5;
    
    // Aplicar posicionamento
    menu.style.position = 'absolute';
    menu.style.left = `${relativeLeft - 100}px`; 
    menu.style.top = `${relativeTop}px`;
    
    // Verificar se o menu sai da tela e ajustar se necessário
    setTimeout(() => {
        const menuRect = menu.getBoundingClientRect();
        
        // Ajustar se sair pela direita
        if (menuRect.right > window.innerWidth) {
            menu.style.left = 'auto';
            menu.style.right = '0px';
        }
        
        // Ajustar se sair por baixo
        if (menuRect.bottom > window.innerHeight) {
            menu.style.top = `${relativeTop - menuRect.height - buttonRect.height - 10}px`;
        }
    }, 0);
    
    // Adicionar animação de entrada
    menu.style.animation = 'fadeIn 0.15s ease-out';
    
    // Adicionar event listeners para as ações
    const items = menu.querySelectorAll('li');
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.dataset.action;
            handleMenuAction(action);
            menu.remove();
        });
    });
    
    // Fechar menu ao clicar fora
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.style.animation = 'fadeOut 0.15s ease-out';
                setTimeout(() => {
                    if (menu.parentNode) {
                        menu.remove();
                    }
                }, 150);
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
    
    // Adicionar evento para seguir o scroll
    let scrollTimeout;
    function updatePosition() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (menu.parentNode) {
                const newButtonRect = button.getBoundingClientRect();
                const newCardRect = activityCard.getBoundingClientRect();
                const newRelativeLeft = newButtonRect.left - newCardRect.left;
                const newRelativeTop = newButtonRect.bottom - newCardRect.top + 5;
                
                menu.style.left = `${newRelativeLeft - 180}px`;
                menu.style.top = `${newRelativeTop}px`;
            }
        }, 10);
    }
    
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    // Remover listeners quando o menu for removido
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && !document.contains(menu)) {
                window.removeEventListener('scroll', updatePosition);
                window.removeEventListener('resize', updatePosition);
                observer.disconnect();
            }
        });
    });
    
    observer.observe(activityCard, { childList: true });
}

// Função para lidar com as ações do menu
function handleMenuAction(action) {
    const activityTitle = document.querySelector('.activity-card-header h2').textContent;
    
    switch(action) {
        case 'copy-link':
            console.log('Copiando link da atividade:', activityTitle);
            // Lógica para copiar o link para a área de transferência
            const link = window.location.href;
            copyToClipboard(link);
            break;
    }
}

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            // Fallback para método antigo
            copyToClipboardFallback(text);
        });
    } else {
        // Fallback para navegadores mais antigos
        copyToClipboardFallback(text);
    }
}

// Fallback para copiar texto em navegadores mais antigos
function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Link copiado para a área de transferência!');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showToast('Erro ao copiar o link');
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificação toast
function showToast(message) {
    // Remove toast existente se houver
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Criar toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remover toast após 3 segundos
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Função para verificar se a data está atrasada
function isPastDeadline() {
    const deadlineText = document.querySelector('.deadline').textContent;
    const deadlineParts = deadlineText.match(/(\d+)\/(\d+)\/(\d+)/);
    
    if (deadlineParts) {
        const deadlineDate = new Date(
            2000 + parseInt(deadlineParts[3]), // ano
            parseInt(deadlineParts[2]) - 1, // mês (0-11)
            parseInt(deadlineParts[1]) // dia
        );
        
        const currentDate = new Date();
        return currentDate > deadlineDate;
    }
    return false;
}

// Função para verificar o tamanho da janela (baseada na tela de redações)
function checkWindowSize() {
    const width = window.innerWidth;
    const cards = document.querySelectorAll('.activity-card, .submission-box, .teacher-help');
    
    // Ajustar layout para diferentes tamanhos de tela
    if (width <= 768) {
        cards.forEach(card => {
            if (card.classList.contains('activity-card')) {
                card.style.flexBasis = '100%';
            }
        });
    } else if (width <= 1334) {
        cards.forEach(card => {
            if (card.classList.contains('activity-card')) {
                card.style.flexBasis = 'calc(50% - 10px)';
            }
        });
    } else {
        cards.forEach(card => {
            if (card.classList.contains('activity-card')) {
                card.style.flexBasis = 'calc(33.333% - 14px)';
            }
        });
    }
}