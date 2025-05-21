document.addEventListener('DOMContentLoaded', function() {
    // Obter referências para elementos DOM
    const turmaCards = document.querySelectorAll('.turma-card');
    const turmaSearch = document.getElementById('turma-search');
    const anoFilter = document.getElementById('ano-filter');
    const turmaFilter = document.getElementById('turma-filter');
    const statusFilter = document.getElementById('status-filter');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    // Checar o estado do sidebar e aplicar classes
    function verificarSidebar() {
        if (sidebar && sidebar.classList.contains('active')) {
            body.classList.add('sidebar-active');
        } else {
            body.classList.remove('sidebar-active');
        }
    }
    
    // Verificar inicialmente e adicionar listener para mudanças no sidebar
    verificarSidebar();
    
    // Observer para monitorar mudanças nas classes do sidebar
    const observer = new MutationObserver(verificarSidebar);
    if (sidebar) {
        observer.observe(sidebar, { attributes: true });
    }
    
    // Função para navegar para o dashboard da turma
    const verDashboard = function(sala) {
        // Por enquanto, apenas alertamos que o link seria acessado
        console.log(`Navegando para o dashboard da sala ${sala}`);
        // Aqui você adicionaria o redirecionamento real no futuro
        alert(`Redirecionando para o Dashboard da Sala ${sala}`);
        // window.location.href = `dashboard-turma.html?sala=${sala}`;
    };
    
    // Adicionar evento de clique aos botões de ver dashboard
    document.querySelectorAll('.btn-primary').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const sala = turmaCards[index].getAttribute('data-sala');
            verDashboard(sala);
        });
    });
    
    // Adicionar evento de clique aos cards para navegar para o dashboard
    turmaCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Garantir que o clique não foi em um botão ou no dropdown
            if (!e.target.closest('button') && !e.target.closest('.dropdown-menu')) {
                const sala = this.getAttribute('data-sala');
                verDashboard(sala);
            }
        });
    });
    
    // Função para filtrar turmas
    const filtrarTurmas = function() {
        const searchTerm = turmaSearch.value.toLowerCase();
        const anoSelecionado = anoFilter.value;
        const turmaSelecionada = turmaFilter.value;
        const statusSelecionado = statusFilter.value;
        
        turmaCards.forEach(card => {
            const titulo = card.querySelector('h2').textContent.toLowerCase();
            const ano = card.getAttribute('data-ano');
            const turma = card.getAttribute('data-turma');
            const status = card.querySelector('.turma-status').classList.contains('em-andamento') ? 'em-andamento' : 'finalizada';
            
            // Verificar se o card corresponde a todos os filtros
            const matchSearch = searchTerm === '' || titulo.includes(searchTerm);
            const matchAno = anoSelecionado === 'todos' || ano === anoSelecionado;
            const matchTurma = turmaSelecionada === 'todas' || turma === turmaSelecionada;
            const matchStatus = statusSelecionado === 'todos' || status === statusSelecionado;
            
            // Mostrar ou esconder o card com base nos filtros
            if (matchSearch && matchAno && matchTurma && matchStatus) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    // Adicionar eventos para filtrar turmas
    turmaSearch.addEventListener('input', filtrarTurmas);
    anoFilter.addEventListener('change', filtrarTurmas);
    turmaFilter.addEventListener('change', filtrarTurmas);
    statusFilter.addEventListener('change', filtrarTurmas);
    
    // Gerenciar os dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Fechar todos os outros dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown !== this.parentElement) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Toggle para o dropdown atual
            this.parentElement.classList.toggle('active');
        });
    });
    
    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Gerenciar popups de ação para os itens de dropdown
    const relatorioPopup = document.getElementById('relatorio-popup');
    const comunicadoPopup = document.getElementById('comunicado-popup');
    const relatorioTurmaEl = document.getElementById('relatorio-turma');
    const comunicadoTurmaEl = document.getElementById('comunicado-turma');
    
    // Adicionar eventos para os itens do dropdown
    document.querySelectorAll('.gerar-relatorio').forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tituloTurma = turmaCards[Math.floor(index/4)].querySelector('h2').textContent;
            if (relatorioTurmaEl) relatorioTurmaEl.textContent = tituloTurma;
            if (relatorioPopup) relatorioPopup.style.display = 'flex';
            
            // Fechar o dropdown
            this.closest('.dropdown').classList.remove('active');
        });
    });
    
    document.querySelectorAll('.enviar-comunicado').forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tituloTurma = turmaCards[Math.floor(index/4)].querySelector('h2').textContent;
            if (comunicadoTurmaEl) comunicadoTurmaEl.textContent = tituloTurma;
            if (comunicadoPopup) comunicadoPopup.style.display = 'flex';
            
            // Fechar o dropdown
            this.closest('.dropdown').classList.remove('active');
        });
    });
    
    document.querySelectorAll('.ver-materiais').forEach((item) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Acessando materiais de aula para esta turma...');
            // Fechar o dropdown
            this.closest('.dropdown').classList.remove('active');
        });
    });
    
    document.querySelectorAll('.ver-chamada').forEach((item) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Acessando lista de chamada para esta turma...');
            // Fechar o dropdown
            this.closest('.dropdown').classList.remove('active');
        });
    });
    
    // Fechar popups
    document.querySelectorAll('.close-popup, .btn-cancel').forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            if (popup) popup.style.display = 'none';
        });
    });
    
    // Fechar popups ao clicar fora deles
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Lidar com o envio dos formulários
    if (document.getElementById('gerar-relatorio-btn')) {
        document.getElementById('gerar-relatorio-btn').addEventListener('click', function() {
            const tipoRelatorio = document.querySelector('input[name="tipo-relatorio"]:checked').value;
            const periodoRelatorio = document.getElementById('periodo-relatorio').value;
            
            alert(`Gerando relatório do tipo "${tipoRelatorio}" para o período "${periodoRelatorio}"...`);
            relatorioPopup.style.display = 'none';
        });
    }
    
    if (document.getElementById('comunicado-form')) {
        document.getElementById('comunicado-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const assunto = document.getElementById('comunicado-assunto').value;
            const mensagem = document.getElementById('comunicado-mensagem').value;
            const destinatarios = [];
            
            document.querySelectorAll('input[name="destinatarios"]:checked').forEach(input => {
                destinatarios.push(input.value);
            });
            
            alert(`Enviando comunicado: "${assunto}" para ${destinatarios.join(' e ')}`);
            comunicadoPopup.style.display = 'none';
            this.reset();
        });
    }
    
    // Eventos dos popups originais
    const alterarSenhaLink = document.querySelector('.alterar-senha-link');
    const passwordPopup = document.getElementById('password-popup');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const resetPasswordPopup = document.getElementById('reset-password-popup');
    const btnBack = document.querySelector('.btn-back');
    const logoutButton = document.querySelector('.logout-button');
    const logoutPopup = document.getElementById('logout-popup');
    const btnCancelLogout = document.querySelector('.btn-cancel-logout');
    
    // Alterar senha
    if (alterarSenhaLink) {
        alterarSenhaLink.addEventListener('click', function(e) {
            e.preventDefault();
            passwordPopup.style.display = 'flex';
        });
    }
    
    // Esqueceu a senha
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            passwordPopup.style.display = 'none';
            resetPasswordPopup.style.display = 'flex';
        });
    }
    
    // Voltar para o popup de alterar senha
    if (btnBack) {
        btnBack.addEventListener('click', function() {
            resetPasswordPopup.style.display = 'none';
            passwordPopup.style.display = 'flex';
        });
    }
    
    // Abrir popup de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logoutPopup.style.display = 'flex';
        });
    }
    
    // Cancelar logout
    if (btnCancelLogout) {
        btnCancelLogout.addEventListener('click', function() {
            logoutPopup.style.display = 'none';
        });
    }
    
    // Toggle visibilidade de senha
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
        });
    });
});