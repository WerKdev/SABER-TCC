document.addEventListener("DOMContentLoaded", function() {
    // Elementos do popup de logout
    const logoutLink = document.querySelector('.logout-button');
    const logoutPopup = document.getElementById('logout-popup');
    const logoutButton = document.querySelector('.btn-logout');
    const cancelLogoutButton = document.querySelector('.btn-cancel-logout');
    
    // Verificar se os elementos existem (para depuração)
    console.log("Link de logout encontrado:", !!logoutLink);
    console.log("Popup de logout encontrado:", !!logoutPopup);
    console.log("Botão de logout encontrado:", !!logoutButton);
    console.log("Botão de cancelar logout encontrado:", !!cancelLogoutButton);
    
    // Função para abrir o popup de confirmação de saída
    function openLogoutPopup(e) {
        if (e) e.preventDefault(); // Impedir o comportamento padrão do link
        
        console.log("Abrindo popup de logout");
        if (logoutPopup) {
            logoutPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevenir rolagem
        }
    }
    
    // Função para fechar o popup
    function closeLogoutPopup() {
        console.log("Fechando popup de logout");
        if (logoutPopup) {
            logoutPopup.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar rolagem
        }
    }
    
    // Abrir popup ao clicar no link de logout
    if (logoutLink) {
        logoutLink.addEventListener('click', openLogoutPopup);
    }
    
    // Fechar popup ao clicar em "Cancelar"
    if (cancelLogoutButton) {
        cancelLogoutButton.addEventListener('click', closeLogoutPopup);
    }
    
    // Processar o logout ao confirmar
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log("Realizando logout...");
            
            // Redirecionar para a página de login definida
            window.location.href = '../../main/pages/login.html';
        });
    }
    
    // Fechar popup quando clicar no X (se existir)
    const closeLogoutX = logoutPopup ? logoutPopup.querySelector('.close-popup') : null;
    if (closeLogoutX) {
        closeLogoutX.addEventListener('click', closeLogoutPopup);
    }
});