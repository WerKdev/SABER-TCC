document.addEventListener("DOMContentLoaded", function() {
    // Seletor para o link "Alterar senha" na interface
    const alterarSenhaLinks = document.querySelectorAll('.alterar-senha-link');
    const changePasswordForm = document.getElementById('change-password-form');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const passwordPopup = document.getElementById('password-popup');
    const resetPasswordPopup = document.getElementById('reset-password-popup');
    const closeButtons = document.querySelectorAll('.popup-overlay .close-popup');
    const cancelButton = document.querySelector('.btn-cancel');
    const backButton = document.querySelector('.btn-back');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // Função para abrir o popup de alteração de senha
    function openPasswordPopup() {
        console.log("Abrindo popup de alteração de senha"); // Debug
        passwordPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir rolagem do corpo
    }
    
    // Função para abrir o popup de redefinição de senha
    function openResetPopup() {
        console.log("Abrindo popup de redefinição de senha"); // Debug
        resetPasswordPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar todos os popups
    function closeAllPopups() {
        console.log("Fechando popups"); // Debug
        passwordPopup.style.display = 'none';
        resetPasswordPopup.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar rolagem
    }
    
    // Abrir o popup de alteração de senha
    if (alterarSenhaLinks && alterarSenhaLinks.length > 0) {
        alterarSenhaLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Impedir propagação do evento
                openPasswordPopup();
            });
        });
    } else {
        console.error("Elemento 'alterar-senha-link' não encontrado");
    }
    
    // Link "Esqueceu a senha?" abre o popup de redefinição
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            passwordPopup.style.display = 'none';
            openResetPopup();
        });
    } else {
        console.error("Elemento 'forgot-password-link' não encontrado");
    }
    
    // Botão "Voltar" no popup de redefinição volta para o popup de alteração
    if (backButton) {
        backButton.addEventListener('click', function() {
            resetPasswordPopup.style.display = 'none';
            openPasswordPopup();
        });
    } else {
        console.error("Elemento 'btn-back' não encontrado");
    }
    
    // Fechar popups com o botão de fechar (X)
    if (closeButtons && closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', closeAllPopups);
        });
    } else {
        console.error("Elementos 'close-popup' não encontrados");
    }
    
    // Fechar com o botão "Cancelar"
    if (cancelButton) {
        cancelButton.addEventListener('click', closeAllPopups);
    } else {
        console.error("Elemento 'btn-cancel' não encontrado");
    }
        
    // Impedir que o clique dentro do popup feche ele
    const popupContainers = document.querySelectorAll('.popup');
    if (popupContainers && popupContainers.length > 0) {
        popupContainers.forEach(popup => {
            popup.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    }
    
    // Alternar visibilidade da senha
    if (togglePasswordButtons && togglePasswordButtons.length > 0) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        this.textContent = 'visibility';
                    } else {
                        input.type = 'password';
                        this.textContent = 'visibility_off';
                    }
                }
            });
        });
    } else {
        console.error("Elementos 'toggle-password' não encontrados");
    }
    
    // Submissão do formulário de alteração de senha
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validação de força da senha
            if (newPassword.length < 8) {
                alert('A nova senha deve ter pelo menos 8 caracteres.');
                return;
            }
            
            // Validação de coincidência
            if (newPassword !== confirmPassword) {
                alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
                return;
            }
            
            // Aqui você implementaria a lógica para enviar a alteração de senha ao servidor
            console.log('Enviando solicitação de alteração de senha...');
            
            // Simulação de sucesso
            setTimeout(() => {
                alert('Senha alterada com sucesso!');
                closeAllPopups();
                changePasswordForm.reset();
            }, 800);
        });
    } else {
        console.error("Formulário 'change-password-form' não encontrado");
    }
    
    // Submissão do formulário de redefinição de senha
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const recoveryEmail = document.getElementById('recovery-email').value;
            
            // Validação básica de email
            if (!recoveryEmail.includes('@') || !recoveryEmail.includes('.')) {
                alert('Por favor, insira um endereço de email válido.');
                return;
            }
            
            // Aqui você implementaria a lógica para enviar o email de recuperação
            console.log('Enviando email de recuperação para:', recoveryEmail);
            
            // Simulação de sucesso
            setTimeout(() => {
                alert('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
                closeAllPopups();
                resetPasswordForm.reset();
            }, 800);
        });
    } else {
        console.error("Formulário 'reset-password-form' não encontrado");
    }

    console.log("Script de popups de senha carregado com sucesso");
});

