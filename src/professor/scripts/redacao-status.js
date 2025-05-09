document.addEventListener("DOMContentLoaded", function() {
    // Sidebar toggle
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");
    const menuIconMobile = document.getElementById("menu-icon-mobile");

    menuIconSidebar.addEventListener("click", function() {
        sidebar.classList.toggle("active");
    });

    menuIconMobile.addEventListener("click", function() {
        sidebar.classList.toggle("active"); 
    });

    // Notifications popup
    const notificationsIcon = document.getElementById("notifications-icon");
    const notificationsPopup = document.getElementById("notifications-popup");
    
    notificationsIcon.addEventListener("click", function(event) {
        notificationsPopup.style.display = 
            (notificationsPopup.style.display === "none" || notificationsPopup.style.display === "") ? "block" : "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!notificationsPopup.contains(event.target) && event.target !== notificationsIcon) {
            notificationsPopup.style.display = "none";
        }
    });

    // User popup
    const userIcon = document.getElementById("user-icon");
    const userIconPopup = document.getElementById("user-icon-popup");

    userIcon.addEventListener("click", function(event) {
        userIconPopup.style.display = 
            (userIconPopup.style.display === "none" || userIconPopup.style.display === "") ? "block" : "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!userIconPopup.contains(event.target) && event.target !== userIcon) {
            userIconPopup.style.display = "none";
        }
    });

    // Responsive check
    function checkWindowSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        }
    }

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    // Get redacao ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redacaoId = urlParams.get('id');

    if (!redacaoId) {
        alert('ID da redação não especificado');
        window.location.href = 'index.html';
        return;
    }

    // Dados fictícios da redação (em produção, esses dados viriam do servidor)
    // Simular carregamento de dados da redação
    const redacaoData = {
        id: parseInt(redacaoId),
        tema: "A importância da leitura na formação do pensamento crítico",
        descricao: "Escreva uma redação dissertativa-argumentativa sobre a importância da leitura na formação do pensamento crítico na sociedade contemporânea. Aborde como o hábito de leitura contribui para o desenvolvimento da capacidade de análise e reflexão.",
        dataEntrega: "2025-04-15",
        dataCriacao: "2025-03-25",
        arquivo: "orientacoes_redacao.pdf",
        turmas: ["3A", "3B", "3C"],
        totalAlunos: 87,
        entregues: 64,
        corrigidas: 38,
        notaMedia: 7.5
    };

    // Carregar dados da redação
    loadRedacaoDetails(redacaoData);

    // Dados fictícios dos alunos (em produção, esses dados viriam do servidor)
    const studentsData = [
        { id: 1, nome: "Ana Silva", turma: "3A", status: "submitted", dataEntrega: "2025-04-10", nota: 8.5 },
        { id: 2, nome: "Bruno Oliveira", turma: "3A", status: "submitted", dataEntrega: "2025-04-12", nota: 7.5 },
        { id: 3, nome: "Carla Santos", turma: "3A", status: "pending", dataEntrega: null, nota: null },
        { id: 4, nome: "Daniel Costa", turma: "3B", status: "graded", dataEntrega: "2025-04-05", nota: 9.0 },
        { id: 5, nome: "Eduarda Lima", turma: "3B", status: "submitted", dataEntrega: "2025-04-11", nota: null },
        { id: 6, nome: "Fábio Pereira", turma: "3B", status: "pending", dataEntrega: null, nota: null },
        { id: 7, nome: "Gabriela Martins", turma: "3C", status: "graded", dataEntrega: "2025-04-08", nota: 8.0 },
        { id: 8, nome: "Henrique Souza", turma: "3C", status: "submitted", dataEntrega: "2025-04-10", nota: null },
        { id: 9, nome: "Isabela Almeida", turma: "3C", status: "pending", dataEntrega: null, nota: null },
        { id: 10, nome: "João Vieira", turma: "3A", status: "graded", dataEntrega: "2025-04-07", nota: 6.5 },
        { id: 11, nome: "Karina Gomes", turma: "3B", status: "submitted", dataEntrega: "2025-04-09", nota: null },
        { id: 12, nome: "Lucas Fernandes", turma: "3C", status: "graded", dataEntrega: "2025-04-10", nota: 7.0 }
    ];

    loadStudentsSubmissions(studentsData);

    // Evento para filtro de turma
    document.getElementById('filter-class').addEventListener('change', function() {
        filterSubmissions();
    });

    // Evento para filtro de status
    document.getElementById('filter-status').addEventListener('change', function() {
        filterSubmissions();
    });

    // Evento para busca de alunos
    document.getElementById('search-students').addEventListener('input', function() {
        filterSubmissions();
    });

    // Função para filtrar submissões
    function filterSubmissions() {
        const turmaFilter = document.getElementById('filter-class').value;
        const statusFilter = document.getElementById('filter-status').value;
        const searchFilter = document.getElementById('search-students').value.toLowerCase();

        const filteredData = studentsData.filter(student => {
            const matchTurma = turmaFilter === 'all' || student.turma === turmaFilter;
            const matchStatus = statusFilter === 'all' || student.status === statusFilter;
            const matchSearch = student.nome.toLowerCase().includes(searchFilter);

            return matchTurma && matchStatus && matchSearch;
        });

        loadStudentsSubmissions(filteredData);
    }

    // Configurar o clique nos botões de ação
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-submission-btn') || e.target.parentElement.classList.contains('view-submission-btn')) {
            const studentId = e.target.closest('[data-student-id]').getAttribute('data-student-id');
            viewSubmission(studentId);
        } else if (e.target.classList.contains('grade-submission-btn') || e.target.parentElement.classList.contains('grade-submission-btn')) {
            const studentId = e.target.closest('[data-student-id]').getAttribute('data-student-id');
            gradeSubmission(studentId);
        }
    });

    // Anexo clicável
    const attachmentContainer = document.getElementById('attachment-container');
    if (attachmentContainer) {
        attachmentContainer.addEventListener('click', function() {
            alert('Baixando anexo: ' + redacaoData.arquivo);
            // Em produção, aqui seria o código para download do arquivo
        });
        attachmentContainer.style.cursor = 'pointer';
        attachmentContainer.title = 'Clique para baixar o anexo';
    }
});

// Função para carregar os detalhes da redação
function loadRedacaoDetails(redacao) {
    document.title = `Detalhes - ${redacao.tema}`;
    
    document.getElementById('redacao-title-breadcrumb').textContent = redacao.tema;
    document.getElementById('redacao-title').textContent = redacao.tema;
    document.getElementById('redacao-description').textContent = redacao.descricao;
    
    // Formatar datas
    const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('redacao-created').textContent = new Date(redacao.dataCriacao).toLocaleDateString('pt-BR', optionsDate);
    document.getElementById('redacao-deadline').textContent = new Date(redacao.dataEntrega).toLocaleDateString('pt-BR', optionsDate);
    
    // Verificar se há anexo
    if (redacao.arquivo) {
        document.getElementById('redacao-attachment').textContent = redacao.arquivo;
    } else {
        document.getElementById('redacao-attachment').textContent = 'Nenhum anexo';
    }
    
    // Estatísticas
    document.getElementById('total-students').textContent = `${redacao.entregues}/${redacao.totalAlunos}`;
    
    const percentageSubmitted = Math.round((redacao.entregues / redacao.totalAlunos) * 100);
    document.getElementById('total-submissions').textContent = `${redacao.entregues} (${percentageSubmitted}%)`;
    
    const percentageGraded = Math.round((redacao.corrigidas / redacao.totalAlunos) * 100);
    document.getElementById('total-graded').textContent = `${redacao.corrigidas} (${percentageGraded}%)`;
    
    document.getElementById('average-grade').textContent = redacao.notaMedia.toFixed(1);
}

// Função para carregar as submissões dos alunos
function loadStudentsSubmissions(students) {
    const tableBody = document.getElementById('submissions-list');
    tableBody.innerHTML = '';
    
    if (students.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="6" class="text-center">Nenhum resultado encontrado</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    students.forEach(student => {
        const row = document.createElement('tr');
        
        // Determinar o status visual
        let statusHTML = '';
        let actions = '';
        
        switch(student.status) {
            case 'submitted':
                statusHTML = '<span class="status-badge status-submitted">Entregue</span>';
                actions = `
                    <button class="action-btn view-submission-btn" title="Ver redação" data-student-id="${student.id}">
                        <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button class="action-btn grade-submission-btn" title="Corrigir" data-student-id="${student.id}">
                        <span class="material-symbols-outlined">grading</span>
                    </button>
                `;
                break;
            case 'pending':
                statusHTML = '<span class="status-badge status-pending">Pendente</span>';
                actions = '';
                break;
            case 'graded':
                statusHTML = '<span class="status-badge status-graded">Corrigido</span>';
                actions = `
                    <button class="action-btn view-submission-btn" title="Ver redação" data-student-id="${student.id}">
                        <span class="material-symbols-outlined">visibility</span>
                    </button>
                `;
                break;
        }
        
        // Formatar data de entrega
        let entregaFormatada = student.dataEntrega 
            ? new Date(student.dataEntrega).toLocaleDateString('pt-BR') 
            : '-';
        
        // Formatar nota
        let notaFormatada = student.nota !== null ? student.nota.toFixed(1) : '-';
        
        row.innerHTML = `
            <td>${student.nome}</td>
            <td>${student.turma}</td>
            <td>${statusHTML}</td>
            <td>${entregaFormatada}</td>
            <td>${notaFormatada}</td>
            <td class="actions-cell" data-student-id="${student.id}">${actions}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Função para visualizar a submissão
function viewSubmission(studentId) {
    alert(`Visualizando redação do aluno ID: ${studentId}`);
    // Em produção, abriria uma modal ou página com a redação do aluno
}

// Função para corrigir a submissão
function gradeSubmission(studentId) {
    alert(`Corrigindo redação do aluno ID: ${studentId}`);
    // Em produção, abriria uma interface de correção
}