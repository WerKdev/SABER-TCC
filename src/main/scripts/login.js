document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");
    const themeToggles = document.querySelectorAll(".switch__input");
    
    menuIcon.addEventListener("click", function() {
        sidebar.classList.toggle("active");
        this.textContent = sidebar.classList.contains("active") ? "close" : "menu";
    });
    
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
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        aplicarTema(savedTheme);
    }

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

    try {
        var animation = bodymovin.loadAnimation({
            container: document.getElementById('lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'content/animationsvg.json'
        });
    } catch (error) {
        console.log("Erro ao carregar animação:", error);
    }

    const forgotPasswordLink = document.querySelector(".forgot-password");
    const passwordRecoveryModal = document.getElementById("password-recovery-modal");
    const confirmationModal = document.getElementById("confirmation-modal");
    const recoveryForm = document.getElementById("recovery-form");
    const closeButtons = document.querySelectorAll(".close-modal, .close-btn");
    
    forgotPasswordLink.addEventListener("click", function(e) {
        e.preventDefault();
        passwordRecoveryModal.style.display = "block";
        document.body.style.overflow = "hidden";
    });
    
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            passwordRecoveryModal.style.display = "none";
            confirmationModal.style.display = "none";
            document.body.style.overflow = "auto"; 
        });
    });
    
    window.addEventListener("click", function(event) {
        if (event.target === passwordRecoveryModal) {
            passwordRecoveryModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (event.target === confirmationModal) {
            confirmationModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    const loginForm = document.querySelector(".login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const remember = document.getElementById("remember").checked;
            
            console.log("Tentativa de login:", { email, password, remember });
            
            alert("Login realizado com sucesso!");
            

        });
    }
    
    recoveryForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("recovery-email").value;
        
        console.log("Solicitação de recuperação para:", email);
        
        setTimeout(function() {
            passwordRecoveryModal.style.display = "none";
            
            confirmationModal.style.display = "block";
            
            document.getElementById("recovery-email").value = "";
        }, 1000);
    });

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (emailInput && passwordInput) {
        emailInput.addEventListener("blur", function() {
            validateEmail(this);
        });

        passwordInput.addEventListener("blur", function() {
            validatePassword(this);
        });
    }

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value) && input.value !== "") {
            input.style.borderColor = "#ff3860";
            return false;
        } else {
            input.style.borderColor = input.value ? "#4CAF50" : "";
            return true;
        }
    }

    function validatePassword(input) {
        if (input.value.length < 6 && input.value !== "") {
            input.style.borderColor = "#ff3860";
            return false;
        } else {
            input.style.borderColor = input.value ? "#4CAF50" : "";
            return true;
        }
    }
});