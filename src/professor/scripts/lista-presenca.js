// Toggle da sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const header = document.querySelector('.header');
    
    sidebar.classList.toggle('minimized');
    mainContent.classList.toggle('shifted');
    header.classList.toggle('shifted');
}

// Toggle do menu mobile
document.getElementById('menu-icon-mobile').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

// Toggle do menu de notificações
function toggleNotifications() {
    const popup = document.getElementById('notifications-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Toggle do menu de usuário
function toggleUserMenu() {
    const popup = document.getElementById('user-icon-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Captura mudanças nos selects para futura lógica
document.getElementById('disciplineSelect').addEventListener('change', (event) => {
    console.log('Disciplina selecionada:', event.target.value);
});

document.getElementById('dateSelect').addEventListener('change', (event) => {
    console.log('Data selecionada:', event.target.value);
});

document.getElementById('serieSelect').addEventListener('change', (event) => {
    console.log('Série selecionada:', event.target.value);
});

document.getElementById('turmaSelect').addEventListener('change', (event) => {
    console.log('Turma selecionada:', event.target.value);
});

// Script para controlar as checkboxes e presença

// Função para inicializar os checkboxes em cada linha
function inicializarCheckboxes() {
    // Seleciona todas as linhas da tabela
    const linhas = document.querySelectorAll('tbody tr');
    
    // Para cada linha
    linhas.forEach((linha, index) => {
        // Seleciona os checkboxes dentro desta linha
        const checkboxes = linha.querySelectorAll('td:nth-child(3) input[type="checkbox"]');
        
        // Se há pelo menos um checkbox na linha
        if (checkboxes.length > 0) {
            // Primeiro checkbox da linha é o principal
            const checkboxPrincipal = checkboxes[0];
            
            // Adiciona evento ao checkbox principal
            checkboxPrincipal.addEventListener('change', function() {
                // Marca/desmarca todos os outros checkboxes desta linha
                checkboxes.forEach((checkbox, i) => {
                    if (i > 0) { // Pula o primeiro (que é o principal)
                        checkbox.checked = checkboxPrincipal.checked;
                    }
                });
            });
            
            // Adiciona evento a todas as checkboxes (incluindo a principal)
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    // Aqui poderia atualizar a presença se você adicionar um elemento para isso
                    // Como seu HTML não tem uma coluna específica para "Presente/Ausente",
                    // esse código apenas gerenciará as checkboxes
                    
                    // Se quiser adicionar um status visual, você pode usar algo como:
                    const nomeAluno = linha.querySelector('td:first-child');
                    if (Array.from(checkboxes).some(cb => cb.checked)) {
                        nomeAluno.style.color = 'green'; // Aluno presente se qualquer checkbox estiver marcada
                    } else {
                        nomeAluno.style.color = ''; // Volta à cor normal se nenhuma estiver marcada
                    }
                });
            });
        }
    });
}

// Inicializa os checkboxes quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarCheckboxes);