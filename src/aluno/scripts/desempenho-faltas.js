document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNotifications();
    initUserMenu();
    initFilterSystem();
    initWindowResizeHandler();
});


function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    const menuIconMobile = document.getElementById('menu-icon-mobile');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    if (menuIconMobile) {
        menuIconMobile.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}


function initNotifications() {
    const notificationsIcon = document.getElementById('notifications-icon');
    const notificationsPopup = document.getElementById('notifications-popup');
    
    if (notificationsIcon && notificationsPopup) {
        notificationsIcon.addEventListener('click', function(event) {
            // Alterna visibilidade do popup de notificações
            notificationsPopup.style.display = notificationsPopup.style.display === 'block' ? 'none' : 'block';
            
            // Fecha o menu de usuário se estiver aberto
            const userIconPopup = document.getElementById('user-icon-popup');
            if (userIconPopup) {
                userIconPopup.style.display = 'none';
            }
            
            event.stopPropagation();
        });
        
        // Fecha o popup quando clicar fora dele
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#notifications-icon') && !event.target.closest('#notifications-popup')) {
                notificationsPopup.style.display = 'none';
            }
        });
    }
}


function initUserMenu() {
    const userIcon = document.getElementById('user-icon');
    const userIconPopup = document.getElementById('user-icon-popup');
    
    if (userIcon && userIconPopup) {
        userIcon.addEventListener('click', function(event) {

            userIconPopup.style.display = userIconPopup.style.display === 'block' ? 'none' : 'block';
            

            const notificationsPopup = document.getElementById('notifications-popup');
            if (notificationsPopup) {
                notificationsPopup.style.display = 'none';
            }
            
            event.stopPropagation();
        });
        

        document.addEventListener('click', function(event) {
            if (!event.target.closest('#user-icon') && !event.target.closest('#user-icon-popup')) {
                userIconPopup.style.display = 'none';
            }
        });
    }
}


function initFilterSystem() {
    const searchInput = document.querySelector('#search-sala');
    const anoSelect = document.querySelector('#Série');
    const turmaSelect = document.querySelector('#Turma');
    const salaCards = document.querySelectorAll('.sala-card');
    
    if (!searchInput || !anoSelect || !turmaSelect || salaCards.length === 0) return;
    
    function filtrarSalas() {
        const searchTerm = searchInput.value.toLowerCase();
        const anoSelecionado = anoSelect.value;
        const turmaSelecionada = turmaSelect.value;
        
        salaCards.forEach(card => {
            const tituloSala = card.querySelector('.sala-header').textContent.toLowerCase();
            
            // Extração de informações da sala a partir do título
            // Exemplo de formato: "SALA XXX - 3º A - IFTP"
            const match = tituloSala.match(/(\d+)º\s+([a-z])/i);
            const anoCard = match ? match[1] : '';
            const turmaCard = match ? match[2].toUpperCase() : '';
            

            const passaPesquisa = searchTerm === '' || tituloSala.includes(searchTerm);
            const passaAno = anoSelecionado === '' || anoSelecionado === 'none' || anoSelecionado === anoCard;
            const passaTurma = turmaSelecionada === '' || turmaSelecionada === 'none' || turmaSelecionada === turmaCard;
            

            if (passaPesquisa && passaAno && passaTurma) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    

    searchInput.addEventListener('input', filtrarSalas);
    anoSelect.addEventListener('change', filtrarSalas);
    turmaSelect.addEventListener('change', filtrarSalas);
}

function initWindowResizeHandler() {
    const sidebar = document.getElementById('sidebar');
    
    function checkWindowSize() {
        if (window.innerWidth > 768) {
            // Em telas maiores que 768px, fecha a sidebar
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        }
    }
    
    window.addEventListener('resize', checkWindowSize);
    
    // Execute a verificação inicial
    checkWindowSize();
}