document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM frequentemente usados
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");
    const menuIconMobile = document.getElementById("menu-icon-mobile");
    const notificationsIcon = document.getElementById("notifications-icon");
    const notificationsPopup = document.getElementById("notifications-popup");
    const userIcon = document.getElementById("user-icon");
    const userIconPopup = document.getElementById("user-icon-popup");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const menuLogo = document.getElementById("logomenu");
    
    // Verificar se já existe uma preferência de tema salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        if (themeToggle) themeToggle.checked = true;
    }
    
    // NOVA FUNCIONALIDADE: Restaurar estado do menu ao carregar a página (sem animação)
    const savedMenuState = localStorage.getItem("menuState");
    if (savedMenuState === "active" && sidebar) {
        // Adicionar classe para desabilitar transições
        sidebar.classList.add("no-transition");
        
        // Aplicar o estado ativo
        sidebar.classList.add("active");
        
        // Remover a classe após o DOM estar pronto e reabilitar transições
        requestAnimationFrame(() => {
            setTimeout(() => {
                sidebar.classList.remove("no-transition");
            }, 20);
        });
    }
    
    // Event listener para o toggle de tema
    if (themeToggle) {
        themeToggle.addEventListener("change", function() {
            if (this.checked) {
                // Mudar para tema escuro
                body.classList.add("dark-theme");
                localStorage.setItem("theme", "dark");
            } else {
                // Mudar para tema claro
                body.classList.remove("dark-theme");
                localStorage.setItem("theme", "light");
            }
        });
    }
    
    // Função para verificar o estado do menu e ajustar a logo
    function checkMenuState() {
        if (sidebar && menuLogo) {
            if (sidebar.classList.contains("active")) {
                menuLogo.style.display = "block";
            } else {
                menuLogo.style.display = "none";
            }
        }
    }
    
    // NOVA FUNCIONALIDADE: Função para salvar o estado do menu
    function saveMenuState() {
        if (sidebar) {
            const isActive = sidebar.classList.contains("active");
            localStorage.setItem("menuState", isActive ? "active" : "inactive");
        }
    }
    
    // Verificar estado inicial do menu
    checkMenuState();
    
    // MODIFICADO: Toggle para sidebar (desktop e mobile) com persistência
    if (menuIconSidebar && sidebar) {
        menuIconSidebar.addEventListener("click", function() {
            sidebar.classList.toggle("active");
            saveMenuState(); // Salvar o novo estado
            setTimeout(checkMenuState, 50);
        });
    }
    
    if (menuIconMobile && sidebar) {
        menuIconMobile.addEventListener("click", function() {
            sidebar.classList.toggle("active");
            saveMenuState(); // Salvar o novo estado
            setTimeout(checkMenuState, 50);
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
    
    // Adicionar botão de fechar (X) ao popup de usuário se não existir
    const userIconPopupHeader = document.querySelector('.user-icon-popup .popup-header');
    if (userIconPopupHeader && !userIconPopupHeader.querySelector('.close-popup')) {
        const closeButton = document.createElement('span');
        closeButton.className = 'material-symbols-outlined close-popup';
        closeButton.textContent = 'close';
        userIconPopupHeader.appendChild(closeButton);
    }
    
    // Event listener para os botões de fechar (X) em popups
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains('close-popup')) {
            // Encontrar o popup pai e fechá-lo
            const popup = event.target.closest('.notifications-popup, .user-icon-popup');
            if (popup) {
                popup.style.display = 'none';
            }
        }
    });
    
    // Fecha popups ao clicar fora
    document.addEventListener("click", function(event) {
        if (notificationsPopup && !event.target.closest('#notifications-icon') && !event.target.closest('#notifications-popup')) {
            notificationsPopup.style.display = 'none';
        }
        if (userIconPopup && !event.target.closest('#user-icon') && !event.target.closest('#user-icon-popup')) {
            userIconPopup.style.display = 'none';
        }
    });
    
    // MODIFICADO: Verificar tamanho da janela para ajustes responsivos
    function checkWindowSize() {
        if (window.innerWidth <= 768) {
            checkMenuState();
            // Em dispositivos móveis, não manter o estado ativo para economizar espaço
            if (sidebar && sidebar.classList.contains("active")) {
                // Opcional: você pode comentar essas linhas se quiser manter o estado mesmo no mobile
                // sidebar.classList.remove("active");
                // saveMenuState();
            }
        }
    }
    
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    const languageSelector = document.querySelector('.language-selector');
    const languageOptions = document.querySelector('.language-options');
    const toggleArrow = document.querySelector('.toggle-arrow');
    const languageItems = document.querySelectorAll('.language-options li');
    const selectedLanguageText = document.querySelector('.selected-language');
    
    // Toggle para o dropdown de idiomas
    if (languageSelector) {
        languageSelector.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Alterna a classe active para expandir/recolher o dropdown
            languageOptions.classList.toggle('active');
            toggleArrow.classList.toggle('active');
        });
    }
    
    // Seleção de um idioma
    if (languageItems) {
        languageItems.forEach(item => {
            item.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // Remove a classe active de todos os itens
                languageItems.forEach(opt => opt.classList.remove('active'));
                
                // Adiciona a classe active no item selecionado
                this.classList.add('active');
                
                // Atualiza o texto do idioma selecionado
                const languageName = this.querySelector('.language-name').textContent;
                if (selectedLanguageText) selectedLanguageText.textContent = languageName;
                
                // Obtém o código do idioma
                const langCode = this.getAttribute('data-lang');
                
                // Aplicar o idioma utilizando o sistema i18n
                if (window.i18n) {
                    window.i18n.applyLanguage(langCode);
                }
                
                // Fechar o dropdown
                languageOptions.classList.remove('active');
                toggleArrow.classList.remove('active');
            });
        });
    }
    
    // Fechar o dropdown ao clicar fora
    document.addEventListener('click', function(event) {
        if (languageOptions && !event.target.closest('.language-selector-container')) {
            languageOptions.classList.remove('active');
            if (toggleArrow) toggleArrow.classList.remove('active');
        }
    });
    
    // NOVA FUNCIONALIDADE: Log para debug (pode ser removido em produção)
    console.log("Estado do menu restaurado:", savedMenuState);
    console.log("Menu está ativo:", sidebar?.classList.contains("active"));
    
    // Verificar se o sistema i18n está disponível
    // O restante do sistema de idiomas foi movido para o arquivo i18n.js
});