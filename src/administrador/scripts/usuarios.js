document.addEventListener("DOMContentLoaded", function() {
    
    // Elementos do Modal de Importação
    const importBtn = document.getElementById('import-users-btn');
    const importModal = document.getElementById('import-modal');
    const closeModalBtn = document.getElementById('close-import-modal');
    const cancelImportBtn = document.getElementById('cancel-import-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name-display');

    const step1 = document.getElementById('import-step-1');
    const step2 = document.getElementById('import-step-2');

    let uploadedFile = null;

    // Abrir e Fechar Modal
    importBtn.addEventListener('click', () => {
        importModal.style.display = 'flex';
        resetImportModal();
    });

    closeModalBtn.addEventListener('click', () => {
        importModal.style.display = 'none';
    });
    
    cancelImportBtn.addEventListener('click', () => {
        importModal.style.display = 'none';
    });

    // Lógica do Drop Zone
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFile(fileInput.files[0]);
        }
    });

    function handleFile(file) {
        uploadedFile = file;
        fileNameDisplay.textContent = `Arquivo selecionado: ${file.name}`;
        fileNameDisplay.style.display = 'block';
        nextStepBtn.disabled = false;
    }

    // Lógica dos Passos (Steps) do Modal
    nextStepBtn.addEventListener('click', () => {
        if (nextStepBtn.textContent.includes('Verificar')) {
            // Simula a verificação e avança para o passo 2
            step1.style.display = 'none';
            step2.style.display = 'block';
            nextStepBtn.textContent = 'Importar 254 Usuários';
        } else {
            // Simula a importação e fecha o modal
            alert('Usuários importados com sucesso! (Simulação)');
            importModal.style.display = 'none';
        }
    });

    function resetImportModal() {
        step1.style.display = 'block';
        step2.style.display = 'none';
        uploadedFile = null;
        fileInput.value = '';
        fileNameDisplay.textContent = '';
        fileNameDisplay.style.display = 'none';
        nextStepBtn.textContent = 'Verificar Planilha';
        nextStepBtn.disabled = true;
    }

    // Lógica do Filtro da Tabela
    const searchInput = document.getElementById('search-name');
    const roleFilter = document.getElementById('filter-role');
    const statusFilter = document.getElementById('filter-status');
    const tableBody = document.getElementById('users-table-body');
    const tableRows = tableBody.getElementsByTagName('tr');

    function filterTable() {
        const searchText = searchInput.value.toLowerCase();
        const roleText = roleFilter.value.toLowerCase();
        const statusText = statusFilter.value.toLowerCase();

        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();
            const role = row.cells[2].textContent.toLowerCase();
            const status = row.cells[4].textContent.toLowerCase();

            const matchesSearch = name.includes(searchText) || email.includes(searchText);
            const matchesRole = roleText === 'todos' || role.includes(roleText);
            const matchesStatus = statusText === 'todos' || status.includes(statusText);

            if (matchesSearch && matchesRole && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    searchInput.addEventListener('keyup', filterTable);
    roleFilter.addEventListener('change', filterTable);
    statusFilter.addEventListener('change', filterTable);

        // --- LÓGICA PARA O MODAL DE ADICIONAR USUÁRIO ---
    
    // Elementos do Modal de Adicionar Usuário
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserModal = document.getElementById('add-user-modal');
    const closeAddUserModalBtn = document.getElementById('close-add-user-modal');
    const cancelAddUserBtn = document.getElementById('cancel-add-user-btn');
    const addUserForm = document.getElementById('add-user-form');
    
    // Elementos do formulário
    const userTypeSelect = document.getElementById('user-type');
    const dynamicFieldContainer = document.getElementById('dynamic-field-container');
    const turmaField = document.getElementById('turma-field');
    const cargoField = document.getElementById('cargo-field');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    // Abrir e Fechar o modal
    addUserBtn.addEventListener('click', () => {
        addUserModal.style.display = 'flex';
    });

    closeAddUserModalBtn.addEventListener('click', () => {
        addUserModal.style.display = 'none';
        addUserForm.reset(); // Limpa o formulário ao fechar
        resetDynamicFields();
    });

    cancelAddUserBtn.addEventListener('click', () => {
        addUserModal.style.display = 'none';
        addUserForm.reset();
        resetDynamicFields();
    });

    // Lógica do campo dinâmico (Turma/Cargo)
    userTypeSelect.addEventListener('change', (event) => {
        const selectedType = event.target.value;
        resetDynamicFields();

        if (selectedType === 'Aluno') {
            dynamicFieldContainer.style.display = 'block';
            turmaField.style.display = 'block';
            turmaField.querySelector('select').required = true;
        } else if (selectedType === 'Professor' || selectedType === 'Administrador') {
            dynamicFieldContainer.style.display = 'block';
            cargoField.style.display = 'block';
            cargoField.querySelector('input').required = true;
        }
    });

    function resetDynamicFields() {
        dynamicFieldContainer.style.display = 'none';
        turmaField.style.display = 'none';
        cargoField.style.display = 'none';
        turmaField.querySelector('select').required = false;
        cargoField.querySelector('input').required = false;
    }

    // Lógica para mostrar/ocultar senha
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.textContent = 'visibility';
            } else {
                passwordInput.type = 'password';
                icon.textContent = 'visibility_off';
            }
        });
    });

    // Lógica de submissão do formulário
    addUserForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio real do formulário
        
        // Aqui você faria a chamada para o backend (API)
        console.log('Dados do formulário a serem enviados:');
        const formData = new FormData(addUserForm);
        // Exemplo de como pegar os dados (lembre-se que FormData não pega tudo direto)
        console.log('Nome:', document.getElementById('user-fullname').value);
        console.log('Email:', document.getElementById('user-email').value);
        console.log('Tipo:', document.getElementById('user-type').value);

        alert('Usuário salvo com sucesso! (Simulação)');
        addUserModal.style.display = 'none';
        addUserForm.reset();
        resetDynamicFields();
    });

    // --- LÓGICA DO INDICADOR DE LIMITE DE USUÁRIOS ---
        
    // Simulação dos dados do plano
    const maxUsers = 250;
    const alertThreshold = 20;

    // Elementos do DOM
    const currentUsersSpan = document.getElementById('current-users-count');
    const maxUsersSpan = document.getElementById('max-users-count');
    const remainingUsersSpan = document.getElementById('remaining-users-text');
    const usersTableBody = document.getElementById('users-table-body');
    const alertMessage = document.getElementById('limit-alert-message'); // Novo elemento

    function updateUserLimitIndicator() {
        const currentUserCount = usersTableBody.getElementsByTagName('tr').length;
        const remainingUsers = maxUsers - currentUserCount;

        // Atualiza os textos do indicador principal (que está sempre visível)
        currentUsersSpan.textContent = currentUserCount;
        maxUsersSpan.textContent = maxUsers;
        remainingUsersSpan.textContent = `(${remainingUsers} restantes)`;

        // Verifica se o limite está próximo para MOSTRAR ou ESCONDER a mensagem de alerta
        if (remainingUsers <= alertThreshold) {
            alertMessage.classList.add('visible'); // Mostra a mensagem
        } else {
            alertMessage.classList.remove('visible'); // Esconde a mensagem
        }
    }

    // Chama a função ao carregar a página
    updateUserLimitIndicator();
});