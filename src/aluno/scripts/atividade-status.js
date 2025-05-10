document.addEventListener("DOMContentLoaded", function() {
    const attachBtn = document.querySelector('.attach-file-btn');
    const markCompleteBtn = document.querySelector('.mark-complete-btn');
    const fileUpload = document.getElementById('file-upload');
    const statusText = document.querySelector('.status');
    
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
        // Aqui você pode adicionar sua lógica para verificar se a data atual é posterior ao prazo
        // Por exemplo, comparando a data atual com a data de prazo da atividade
        const deadlineText = document.querySelector('.deadline').textContent;
        const deadlineParts = deadlineText.match(/(\d+)\/(\d+)\/(\d+)/);
        
        if (deadlineParts) {
            const deadlineDate = new Date(
                parseInt(deadlineParts[3]), // ano
                parseInt(deadlineParts[2])-1, // mês (0-11)
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

    markCompleteBtn.addEventListener('click', function() {
        if (fileUpload.files.length > 0) {
            // Confirmação antes de enviar
            if (confirm('Tem certeza que deseja enviar este arquivo?')) {
                statusText.textContent = isPastDeadline() ? 'Atrasado' : 'Entregue';
                statusText.style.color = isPastDeadline() ? '#dc2626' : '#16a34a';
                this.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Concluído';
                this.style.backgroundColor = '#16a34a';
            }
        } else {
            alert('Por favor, anexe um arquivo antes de marcar como concluído.');
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

    function handleResponsive() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        } else {
            sidebar.classList.remove("active");
        }
    }

     function adjustCardHeights() {
        const cards = document.querySelectorAll('.activity-card');
        let maxHeight = 0;
        
        // Reset heights first
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find the maximum height
        cards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        // Apply the maximum height to all cards
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }
    
    // Run on load
    window.addEventListener('load', adjustCardHeights);
    
    // Run on resize
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(adjustCardHeights, 250);
    });
    
    // Sobrescrever função filterActivities
    const originalFilterActivities = filterActivities;
    window.filterActivities = function() {
        originalFilterActivities();
        setTimeout(adjustCardHeights, 100);
    }
    
    // Sobrescrever função filterByTab
    const originalFilterByTab = filterByTab;
    window.filterByTab = function(tabType) {
        originalFilterByTab(tabType);
        setTimeout(adjustCardHeights, 100);
    }   

    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});

