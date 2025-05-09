document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");
    const themeToggles = document.querySelectorAll(".switch__input");
    
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
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");

    menuIcon.addEventListener("click", function() {
        sidebar.classList.toggle("active");
        menuIcon.textContent = sidebar.classList.contains("active") ? "close" : "menu";
    });

    function fecharMenuSeNecessario() {
        if (window.innerWidth > 1290) { 
            sidebar.classList.remove("active"); 
            menuIcon.textContent = "menu"; 
        }
    }

    window.addEventListener("resize", fecharMenuSeNecessario);
});
