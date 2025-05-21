document.addEventListener("DOMContentLoaded", function() {
    // Configuração do EmailJS (substitua pelos seus IDs)
    const EMAILJS_CONFIG = {
        publicKey: 'SUA_PUBLIC_KEY_AQUI', // Substitua pela sua public key do EmailJS
        serviceID: 'SEU_SERVICE_ID_AQUI', // Substitua pelo seu service ID
        templateID: 'SEU_TEMPLATE_ID_AQUI' // Substitua pelo seu template ID
    };

    // Inicializar EmailJS
    try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    } catch (error) {
        console.warn('EmailJS não configurado corretamente:', error);
    }

    // Elementos do DOM
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");
    const themeToggles = document.querySelectorAll(".switch__input");
    const loginForm = document.getElementById("loginForm");
    const passwordToggle = document.getElementById("passwordToggle");
    const passwordInput = document.getElementById("password");
    const emailInput = document.getElementById("email");
    const rememberCheckbox = document.getElementById("remember");
    const messageContainer = document.getElementById("message-container");
    const loginButton = document.getElementById("loginButton");
    
    // Modais
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const passwordRecoveryModal = document.getElementById("password-recovery-modal");
    const confirmationModal = document.getElementById("confirmation-modal");
    const recoveryForm = document.getElementById("recovery-form");
    const recoveryButton = document.getElementById("recoveryButton");
    const closeButtons = document.querySelectorAll(".close-modal, .close-btn");

    // Base de dados de usuários (simulação)
    const USERS_DATABASE = {
        "aluno@saber.com": {
            password: "12345678",
            role: "aluno",
            name: "Aluno Teste",
            redirect: "/src/aluno/pages/dashboard.html"
        },
        "professor@saber.com": {
            password: "12345678",
            role: "professor", 
            name: "Professor Teste",
            redirect: "/src/professor/pages/dashboard.html"
        },
        "admin@saber.com": {
            password: "12345678",
            role: "admin",
            name: "Admin Teste", 
            redirect: "/src/admin/pages/dashboard.html"
        }
    };

    // ==================== FUNCIONALIDADES DE MENU E TEMA ====================
    
    function toggleSidebar() {
        sidebar.classList.toggle("active");
        menuIcon.textContent = sidebar.classList.contains("active") ? "close" : "menu";
    }

    if (menuIcon) {
        menuIcon.addEventListener("click", toggleSidebar);
    }
    
    function aplicarTema(tema) {
        if (tema === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggles.forEach(toggle => {
                toggle.checked = true;
            });
        } else {
            document.body.classList.remove('dark-mode');
            themeToggles.forEach(toggle => {
                toggle.checked = false;
            });
        }
    }
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        aplicarTema(savedTheme);
    }

    // Event listeners para mudança de tema
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const temaAtual = this.checked ? 'dark' : 'light';
            localStorage.setItem('theme', temaAtual);
            aplicarTema(temaAtual);
            
            themeToggles.forEach(t => {
                if (t !== this) {
                    t.checked = this.checked;
                }
            });
        });
    });

    function fecharMenuSeNecessario() {
        if (window.innerWidth > 1290) { 
            sidebar.classList.remove("active"); 
            menuIcon.textContent = "menu"; 
        }
    }
    
    window.addEventListener('resize', fecharMenuSeNecessario);

    // ==================== ANIMAÇÃO LOTTIE ====================
    
    try {
        var animation = bodymovin.loadAnimation({
            container: document.getElementById('lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../assets/login/animationsvg.json'
        });
    } catch (error) {
        console.log("Erro ao carregar animação:", error);
    }

    // ==================== FUNCIONALIDADE DE MOSTRAR/OCULTAR SENHA ====================
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('.material-symbols-outlined');
            icon.textContent = type === 'password' ? 'visibility' : 'visibility_off';
        });
    }

    // ==================== SISTEMA DE MENSAGENS ====================
    
    function showMessage(message, type = 'error') {
        if (!messageContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const icon = type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info';
        messageDiv.innerHTML = `
            <span class="material-symbols-outlined">${icon}</span>
            ${message}
        `;
        
        messageContainer.innerHTML = '';
        messageContainer.appendChild(messageDiv);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    function clearMessages() {
        if (messageContainer) {
            messageContainer.innerHTML = '';
        }
    }

    function showInputError(inputId, message) {
        const errorDiv = document.getElementById(`${inputId}-error`);
        if (errorDiv) {
            errorDiv.innerHTML = `<span class="material-symbols-outlined">error</span>${message}`;
        }
    }

    function clearInputError(inputId) {
        const errorDiv = document.getElementById(`${inputId}-error`);
        if (errorDiv) {
            errorDiv.innerHTML = '';
        }
    }

    function clearAllInputErrors() {
        const errorDivs = document.querySelectorAll('.input-error');
        errorDivs.forEach(div => {
            div.innerHTML = '';
        });
    }

    // ==================== VALIDAÇÕES ====================
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validateForm() {
        let isValid = true;
        clearAllInputErrors();
        clearMessages();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validar email
        if (!email) {
            showInputError('email', 'E-mail é obrigatório');
            isValid = false;
        } else if (!validateEmail(email)) {
            showInputError('email', 'E-mail inválido');
            isValid = false;
        }

        // Validar senha
        if (!password) {
            showInputError('password', 'Senha é obrigatória');
            isValid = false;
        } else if (!validatePassword(password)) {
            showInputError('password', 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // ==================== FUNCIONALIDADE "LEMBRAR-ME" ====================
    
    function saveUserCredentials(email, shouldRemember) {
        if (shouldRemember) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('shouldRemember', 'true');
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('shouldRemember');
        }
    }

    function loadRememberedCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const shouldRemember = localStorage.getItem('shouldRemember') === 'true';

        if (rememberedEmail && shouldRemember) {
            emailInput.value = rememberedEmail;
            rememberCheckbox.checked = true;
        }
    }

    // Carregar credenciais ao inicializar
    if (emailInput && rememberCheckbox) {
        loadRememberedCredentials();
    }

    // ==================== SISTEMA DE LOGIN ====================
    
    function setButtonLoading(button, isLoading) {
        const buttonText = button.querySelector('.button-text');
        const buttonSpinner = button.querySelector('.button-spinner');
        
        if (isLoading) {
            buttonText.style.display = 'none';
            buttonSpinner.style.display = 'flex';
            button.disabled = true;
        } else {
            buttonText.style.display = 'inline';
            buttonSpinner.style.display = 'none';
            button.disabled = false;
        }
    }

    function authenticateUser(email, password) {
        const user = USERS_DATABASE[email.toLowerCase()];
        
        if (!user) {
            return { success: false, message: 'E-mail não cadastrado' };
        }
        
        if (user.password !== password) {
            return { success: false, message: 'Senha incorreta' };
        }
        
        return { 
            success: true, 
            user: user,
            message: 'Login realizado com sucesso!' 
        };
    }

    function handleLogin(email, password, shouldRemember) {
        setButtonLoading(loginButton, true);
        
        // Simular delay de autenticação
        setTimeout(() => {
            const authResult = authenticateUser(email, password);
            
            if (authResult.success) {
                // Salvar credenciais se "lembrar-me" estiver marcado
                saveUserCredentials(email, shouldRemember);
                
                // Mostrar mensagem de sucesso
                showMessage(authResult.message, 'success');
                
                // Redirecionar após 1 segundo
                setTimeout(() => {
                    console.log(`Redirecionando para ${authResult.user.role}...`);
                    window.location.href = authResult.user.redirect;
                }, 1000);
                
            } else {
                showMessage(authResult.message, 'error');
                setButtonLoading(loginButton, false);
            }
        }, 800);
    }

    // Event listener para o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const shouldRemember = rememberCheckbox.checked;
            
            handleLogin(email, password, shouldRemember);
        });
    }

    // ==================== RECUPERAÇÃO DE SENHA ====================
    
    function generateResetToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    function sendPasswordResetEmail(email) {
        return new Promise((resolve, reject) => {
            // Verificar se o e-mail existe na base de dados
            if (!USERS_DATABASE[email.toLowerCase()]) {
                reject(new Error('E-mail não encontrado em nossa base de dados'));
                return;
            }

            const resetToken = generateResetToken();
            const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}`;
            
            // Parâmetros para o template do EmailJS
            const templateParams = {
                to_email: email,
                user_name: USERS_DATABASE[email.toLowerCase()].name,
                reset_link: resetLink,
                expiry_time: '1 hora'
            };

            // Verificar se o EmailJS está configurado
            if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'SUA_PUBLIC_KEY_AQUI') {
                console.warn('EmailJS não configurado. Simulando envio...');
                // Simular envio para desenvolvimento
                setTimeout(() => {
                    resolve('Email simulado enviado com sucesso');
                }, 1000);
                return;
            }

            // Enviar email real via EmailJS
            emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
                .then((response) => {
                    console.log('Email enviado com sucesso:', response);
                    resolve('Email de recuperação enviado com sucesso');
                })
                .catch((error) => {
                    console.error('Erro ao enviar email:', error);
                    reject(new Error('Erro ao enviar email. Tente novamente em alguns minutos.'));
                });
        });
    }

    function validateRecoveryEmail(email) {
        clearInputError('recovery-email');
        
        if (!email) {
            showInputError('recovery-email', 'E-mail é obrigatório');
            return false;
        }
        
        if (!validateEmail(email)) {
            showInputError('recovery-email', 'E-mail inválido');
            return false;
        }
        
        return true;
    }

    // Event listeners para modais
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            passwordRecoveryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            passwordRecoveryModal.style.display = 'none';
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar modal clicando fora
    [passwordRecoveryModal, confirmationModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Event listener para formulário de recuperação
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('recovery-email').value.trim();
            
            if (!validateRecoveryEmail(email)) {
                return;
            }
            
            setButtonLoading(recoveryButton, true);
            
            sendPasswordResetEmail(email)
                .then((message) => {
                    console.log(message);
                    passwordRecoveryModal.style.display = 'none';
                    confirmationModal.style.display = 'block';
                    document.getElementById('recovery-email').value = '';
                })
                .catch((error) => {
                    showInputError('recovery-email', error.message);
                })
                .finally(() => {
                    setButtonLoading(recoveryButton, false);
                });
        });
    }

    // ==================== VALIDAÇÕES EM TEMPO REAL ====================
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                if (!validateEmail(this.value.trim())) {
                    showInputError('email', 'E-mail inválido');
                } else {
                    clearInputError('email');
                }
            } else {
                clearInputError('email');
            }
        });

        emailInput.addEventListener('input', function() {
            if (this.value.trim() && validateEmail(this.value.trim())) {
                clearInputError('email');
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            if (this.value) {
                if (!validatePassword(this.value)) {
                    showInputError('password', 'Senha deve ter pelo menos 6 caracteres');
                } else {
                    clearInputError('password');
                }
            } else {
                clearInputError('password');
            }
        });

        passwordInput.addEventListener('input', function() {
            if (this.value && validatePassword(this.value)) {
                clearInputError('password');
            }
        });
    }

    // ==================== INSTRUÇÕES DE CONFIGURAÇÃO ====================
    
    console.log(`
    🔧 CONFIGURAÇÃO NECESSÁRIA PARA ENVIO DE EMAILS:
    
    1. Acesse https://www.emailjs.com/ e crie uma conta
    2. Crie um service (Gmail, Outlook, etc.)
    3. Crie um template de email com as variáveis:
       - {{to_email}} - Email do destinatário 
       - {{user_name}} - Nome do usuário
       - {{reset_link}} - Link de redefinição
       - {{expiry_time}} - Tempo de expiração
    4. Substitua as configurações no código:
       - EMAILJS_CONFIG.publicKey
       - EMAILJS_CONFIG.serviceID  
       - EMAILJS_CONFIG.templateID
    
    📧 Exemplo de template de email:
    "Olá {{user_name}}, clique no link para redefinir sua senha: {{reset_link}} 
    Este link expira em {{expiry_time}}."
    `);
});