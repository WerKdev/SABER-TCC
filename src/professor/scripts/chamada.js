document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const selectAllStudentCheckboxes = document.querySelectorAll('.select-all-student');
    const classCheckboxes = document.querySelectorAll('.class-checkbox');
    const markAllPresentBtn = document.getElementById('mark-all-present');
    const markAllAbsentBtn = document.getElementById('mark-all-absent');
    const noteButtons = document.querySelectorAll('.note-btn');
    const justifyButtons = document.querySelectorAll('.justify-btn');
    const notePopup = document.getElementById('note-popup');
    const justifyPopup = document.getElementById('justify-popup');
    const closePopupButtons = document.querySelectorAll('.close-popup');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    const saveAttendanceBtn = document.getElementById('save-attendance-btn');
    const loadAttendanceBtn = document.getElementById('load-attendance-btn');
    const turmaSelect = document.getElementById('turma-select');
    const disciplinaSelect = document.getElementById('disciplina-select');
    const dataSelect = document.getElementById('data-select');

    // Integração com o calendário
    const calendarioIntegration = {
        // Faz a integração com o sistema de calendário para obter informações de aulas
        getClassesInfo: function(turmaId, disciplinaId, data) {
            // Em uma aplicação real, esta função faria uma chamada à API 
            // para obter as informações do cronograma de aulas
            
            // Podemos usar o formato de dados similar ao do calendario.js
            return new Promise(function(resolve) {
                // Simulação de chamada de API
                setTimeout(function() {
                    // Determinar o dia da semana
                    const date = new Date(data);
                    const dayOfWeek = date.getDay(); // 0-6 (Domingo-Sábado)
                    const daysMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
                    const nomeDiaSemana = daysMap[dayOfWeek];
                    
                    // Verificar a matéria selecionada
                    let selectedSubject = '';
                    let selectedTeacher = '';
                    let sequentialClasses = 0;
                    
                    // Simular verificação no cronograma com base no dia da semana
                    if (disciplinaId === 'matematica') {
                        if (nomeDiaSemana === 'segunda' || nomeDiaSemana === 'quinta') {
                            // Matemática tem 3 aulas sequenciais às segundas e quintas
                            selectedSubject = 'Matemática';
                            selectedTeacher = 'Prof. Carlos Silva';
                            sequentialClasses = 3;
                        } else if (nomeDiaSemana === 'terca') {
                            // Matemática tem 1 aula às terças
                            selectedSubject = 'Matemática';
                            selectedTeacher = 'Prof. Carlos Silva';
                            sequentialClasses = 1;
                        } else {
                            // Não há aulas de matemática nos outros dias
                            sequentialClasses = 0;
                        }
                    } else if (disciplinaId === 'portugues') {
                        if (nomeDiaSemana === 'terca') {
                            // Português tem 2 aulas sequenciais às terças
                            selectedSubject = 'Português';
                            selectedTeacher = 'Prof. André Santos';
                            sequentialClasses = 2;
                        } else if (nomeDiaSemana === 'quinta' || nomeDiaSemana === 'sexta') {
                            // Português tem 1 aula às quintas e sextas
                            selectedSubject = 'Português';
                            selectedTeacher = 'Prof. André Santos';
                            sequentialClasses = 1;
                        } else {
                            // Não há aulas de português nos outros dias
                            sequentialClasses = 0;
                        }
                    } else if (disciplinaId === 'fisica') {
                        if (nomeDiaSemana === 'quarta') {
                            // Física tem 2 aulas sequenciais às quartas
                            selectedSubject = 'Física';
                            selectedTeacher = 'Prof. Ricardo Alves';
                            sequentialClasses = 2;
                        } else if (nomeDiaSemana === 'segunda') {
                            // Física tem 1 aula às segundas
                            selectedSubject = 'Física';
                            selectedTeacher = 'Prof. Ricardo Alves';
                            sequentialClasses = 1;
                        } else {
                            // Não há aulas de física nos outros dias
                            sequentialClasses = 0;
                        }
                    }
                    
                    // Se não houver aulas, retorna um objeto vazio
                    if (sequentialClasses === 0) {
                        resolve({
                            hasClasses: false,
                            message: `Não há aulas de ${disciplinaId} para esta turma neste dia.`
                        });
                        return;
                    }
                    
                    // Determinar os horários das aulas com base no número de aulas sequenciais
                    const horarios = [
                        '7:00 - 7:50',
                        '7:50 - 8:40',
                        '8:40 - 9:30',
                        'Intervalo',
                        '9:50 - 10:40',
                        '10:40 - 11:30',
                        '11:30 - 12:20'
                    ];
                    
                    // Obter os horários para as aulas sequenciais
                    const classHorarios = [];
                    for (let i = 0; i < sequentialClasses; i++) {
                        classHorarios.push(horarios[i]);
                    }
                    
                    // Criar um objeto com as informações das aulas
                    const result = {
                        hasClasses: true,
                        turma: turmaSelect.options[turmaSelect.selectedIndex].text,
                        data: data,
                        diaSemana: nomeDiaSemana,
                        disciplina: selectedSubject,
                        professor: selectedTeacher,
                        numAulas: sequentialClasses,
                        horarios: classHorarios,
                        horariosCompletos: horarios
                    };
                    
                    resolve(result);
                }, 500); // Simula um pequeno atraso de rede
            });
        },
        
        // Carrega os alunos da turma (simulado)
        getStudents: function(turmaId) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    // Dados simulados dos alunos
                    const students = [
                        { id: 20250001, nome: 'Ana Carolina Silva', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250002, nome: 'Bruno Oliveira Santos', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250003, nome: 'Camila Mendes Ferreira', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250004, nome: 'Daniel Costa Lima', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250005, nome: 'Eduardo Pereira Santos', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250006, nome: 'Fernanda Alves Ribeiro', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250007, nome: 'Gabriel Martins Sousa', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250008, nome: 'Helena Cardoso Dias', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250009, nome: 'Igor Teixeira Lima', foto: '../../../assets/images/student-placeholder.png' },
                        { id: 20250010, nome: 'Juliana Rocha Gomes', foto: '../../../assets/images/student-placeholder.png' }
                    ];
                    
                    resolve(students);
                }, 300);
            });
        }
    };

    // Função para formatar a data para exibição
    function formatDate(dateString) {
        const date = new Date(dateString);
        const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    }

    // Função para carregar os alunos da turma
    function loadStudents(students, numClasses) {
        const studentsList = document.getElementById('students-list');
        studentsList.innerHTML = ''; // Limpa a lista
        
        students.forEach(student => {
            // Criar a linha do aluno
            const studentRow = document.createElement('div');
            studentRow.className = 'student-row';
            studentRow.dataset.studentId = student.id;
            
            // Informações do aluno
            const studentInfo = document.createElement('div');
            studentInfo.className = 'student-info';
            studentInfo.innerHTML = `
                <div class="student-photo">
                    <img src="${student.foto}" alt="Foto do aluno">
                </div>
                <div class="student-details">
                    <p class="student-name">${student.nome}</p>
                    <p class="student-id">Matrícula: ${student.id}</p>
                </div>
            `;
            
            // Controles de presença
            const attendanceControls = document.createElement('div');
            attendanceControls.className = 'attendance-controls';
            
            // Checkbox para selecionar todas as aulas do aluno
            const selectAllContainer = document.createElement('div');
            selectAllContainer.className = 'select-all-container';
            selectAllContainer.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" class="select-all-student">
                    <span class="custom-checkbox"></span>
                </label>
            `;
            
            // Checkboxes para cada aula
            const individualClasses = document.createElement('div');
            individualClasses.className = 'individual-classes';
            
            let checkboxesHtml = '';
            for (let i = 1; i <= numClasses; i++) {
                checkboxesHtml += `
                    <label class="checkbox-container">
                        <input type="checkbox" class="class-checkbox" data-class="${i}">
                        <span class="custom-checkbox"></span>
                    </label>
                `;
            }
            individualClasses.innerHTML = checkboxesHtml;
            
            // Status de presença e ações
            const attendanceStatus = document.createElement('div');
            attendanceStatus.className = 'attendance-status';
            attendanceStatus.innerHTML = `<span class="status-badge absent">Ausente</span>`;
            
            const attendanceActions = document.createElement('div');
            attendanceActions.className = 'attendance-actions';
            attendanceActions.innerHTML = `
                <button class="btn-icon note-btn" title="Adicionar observação">
                    <span class="material-symbols-outlined">note_add</span>
                </button>
                <button class="btn-icon justify-btn" title="Justificar falta">
                    <span class="material-symbols-outlined">assignment_turned_in</span>
                </button>
            `;
            
            // Adicionar os elementos à linha
            attendanceControls.appendChild(selectAllContainer);
            attendanceControls.appendChild(individualClasses);
            attendanceControls.appendChild(attendanceStatus);
            attendanceControls.appendChild(attendanceActions);
            
            studentRow.appendChild(studentInfo);
            studentRow.appendChild(attendanceControls);
            
            // Adicionar a linha à lista
            studentsList.appendChild(studentRow);
        });
        
        // Reinicializar os event listeners
        initEventListeners();
    }

    // Função para atualizar o cabeçalho das aulas
    function updateClassHeaders(classInfo) {
        const individualClasses = document.querySelector('.individual-classes');
        const horarios = classInfo.horarios;
        
        let headerHtml = '';
        for (let i = 0; i < horarios.length; i++) {
            headerHtml += `
                <div class="class-header">${i+1}ª Aula <span class="class-time">(${horarios[i]})</span></div>
            `;
        }
        
        // Atualizar o cabeçalho
        individualClasses.innerHTML = headerHtml;
    }

    // Função para atualizar as informações da aula
    function updateClassInfo(classInfo) {
        // Selecionar os elementos de informação
        const infoCard = document.querySelector('.info-card');
        
        // Formatar a data
        const formattedDate = formatDate(classInfo.data);
        
        // Atualizar o conteúdo
        infoCard.innerHTML = `
            <div class="info-item">
                <span class="info-label">Turma:</span>
                <span class="info-value">${classInfo.turma}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Data:</span>
                <span class="info-value">${formattedDate}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Disciplina:</span>
                <span class="info-value">${classInfo.disciplina}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Professor:</span>
                <span class="info-value">${classInfo.professor}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Aulas:</span>
                <span class="info-value">${classInfo.numAulas} aulas (${classInfo.horarios[0]} - ${classInfo.horarios[classInfo.horarios.length - 1]})</span>
            </div>
        `;
    }

    // Função para atualizar o resumo da chamada
    function updateAttendanceSummary() {
        const totalStudents = document.querySelectorAll('.student-row').length;
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let justifiedCount = 0;
        
        // Percorre os status dos alunos
        document.querySelectorAll('.status-badge').forEach(badge => {
            if (badge.classList.contains('present')) {
                presentCount++;
            } else if (badge.classList.contains('absent')) {
                absentCount++;
            } else if (badge.classList.contains('late')) {
                lateCount++;
            } else if (badge.classList.contains('justified')) {
                justifiedCount++;
            }
        });
        
        // Atualiza o resumo
        document.querySelector('.summary-content').innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Total de alunos:</span>
                <span class="summary-value">${totalStudents}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Presentes:</span>
                <span class="summary-value">${presentCount}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Ausentes:</span>
                <span class="summary-value">${absentCount}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Atrasados:</span>
                <span class="summary-value">${lateCount}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Faltas justificadas:</span>
                <span class="summary-value">${justifiedCount}</span>
            </div>
        `;
    }

    // Função para atualizar o status de presença de um aluno
    function updateStudentStatus(studentRow) {
        const checkboxes = studentRow.querySelectorAll('.class-checkbox');
        const statusBadge = studentRow.querySelector('.status-badge');
        const selectAllCheckbox = studentRow.querySelector('.select-all-student');
        
        // Contar checkboxes marcados
        let checkedCount = 0;
        let justifiedCount = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCount++;
                if (checkbox.classList.contains('justified')) {
                    justifiedCount++;
                }
            }
        });
        
        // Atualizar o checkbox "selecionar todos" do aluno
        selectAllCheckbox.checked = (checkedCount === checkboxes.length);
        selectAllCheckbox.indeterminate = (checkedCount > 0 && checkedCount < checkboxes.length);
        
        // Atualizar o status
        statusBadge.className = 'status-badge';
        
        if (justifiedCount > 0) {
            // Se pelo menos uma aula está justificada
            statusBadge.classList.add('justified');
            statusBadge.textContent = 'Justificado';
        } else if (checkedCount === 0) {
            // Se nenhuma aula está marcada
            statusBadge.classList.add('absent');
            statusBadge.textContent = 'Ausente';
        } else if (checkedCount === checkboxes.length) {
            // Se todas as aulas estão marcadas
            statusBadge.classList.add('present');
            statusBadge.textContent = 'Presente';
        } else {
            // Se algumas aulas estão marcadas
            statusBadge.classList.add('late');
            statusBadge.textContent = 'Atrasado';
        }
        
        // Atualizar o resumo geral
        updateAttendanceSummary();
    }

    // Função para inicializar os event listeners
    function initEventListeners() {
        // Checkbox principal para selecionar todos os alunos em todas as aulas
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                const isChecked = this.checked;
                
                // Selecionar todos os checkboxes de alunos
                document.querySelectorAll('.select-all-student').forEach(checkbox => {
                    checkbox.checked = isChecked;
                    
                    // Propagar o evento para os checkboxes individuais
                    const studentRow = checkbox.closest('.student-row');
                    studentRow.querySelectorAll('.class-checkbox').forEach(classCheckbox => {
                        classCheckbox.checked = isChecked;
                    });
                    
                    // Atualizar o status do aluno
                    updateStudentStatus(studentRow);
                });
            });
        }
        
        // Checkboxes para selecionar todas as aulas de um aluno
        document.querySelectorAll('.select-all-student').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const isChecked = this.checked;
                const studentRow = this.closest('.student-row');
                
                // Selecionar todos os checkboxes das aulas do aluno
                studentRow.querySelectorAll('.class-checkbox').forEach(classCheckbox => {
                    classCheckbox.checked = isChecked;
                });
                
                // Atualizar o status do aluno
                updateStudentStatus(studentRow);
            });
        });
        
        // Checkboxes individuais das aulas
        document.querySelectorAll('.class-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const studentRow = this.closest('.student-row');
                
                // Atualizar o status do aluno
                updateStudentStatus(studentRow);
            });
        });
        
        // Botão para marcar todos presentes
        if (markAllPresentBtn) {
            markAllPresentBtn.addEventListener('click', function() {
                document.querySelectorAll('.student-row').forEach(studentRow => {
                    // Marcar todos os checkboxes
                    studentRow.querySelectorAll('.class-checkbox').forEach(checkbox => {
                        checkbox.checked = true;
                    });
                    
                    // Marcar o checkbox "selecionar todos"
                    const selectAllCheckbox = studentRow.querySelector('.select-all-student');
                    if (selectAllCheckbox) {
                        selectAllCheckbox.checked = true;
                    }
                    
                    // Atualizar o status
                    updateStudentStatus(studentRow);
                });
                
                // Atualizar o checkbox principal
                if (selectAllCheckbox) {
                    selectAllCheckbox.checked = true;
                }
            });
        }
        
        // Botão para marcar todos ausentes
        if (markAllAbsentBtn) {
            markAllAbsentBtn.addEventListener('click', function() {
                document.querySelectorAll('.student-row').forEach(studentRow => {
                    // Desmarcar todos os checkboxes
                    studentRow.querySelectorAll('.class-checkbox').forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    
                    // Desmarcar o checkbox "selecionar todos"
                    const selectAllCheckbox = studentRow.querySelector('.select-all-student');
                    if (selectAllCheckbox) {
                        selectAllCheckbox.checked = false;
                    }
                    
                    // Atualizar o status
                    updateStudentStatus(studentRow);
                });
                
                // Atualizar o checkbox principal
                if (selectAllCheckbox) {
                    selectAllCheckbox.checked = false;
                }
            });
        }
        
        // Botões para adicionar observação
        document.querySelectorAll('.note-btn').forEach(button => {
            button.addEventListener('click', function() {
                const studentRow = this.closest('.student-row');
                const studentName = studentRow.querySelector('.student-name').textContent;
                const studentId = studentRow.querySelector('.student-id').textContent;
                
                // Atualizar os dados no popup
                const nameElement = notePopup.querySelector('.student-name-mini');
                const idElement = notePopup.querySelector('.student-id-mini');
                
                nameElement.textContent = studentName;
                idElement.textContent = studentId;
                
                // Mostrar o popup
                notePopup.style.display = 'flex';
            });
        });
        
        // Botões para justificar falta
        document.querySelectorAll('.justify-btn').forEach(button => {
            button.addEventListener('click', function() {
                const studentRow = this.closest('.student-row');
                const studentName = studentRow.querySelector('.student-name').textContent;
                const studentId = studentRow.querySelector('.student-id').textContent;
                
                // Atualizar os dados no popup
                const nameElement = justifyPopup.querySelector('.student-name-mini');
                const idElement = justifyPopup.querySelector('.student-id-mini');
                
                nameElement.textContent = studentName;
                idElement.textContent = studentId;
                
                // Mostrar o popup
                justifyPopup.style.display = 'flex';
            });
        });
        
        // Botões para fechar popups
        closePopupButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Encontrar o popup pai
                const popup = this.closest('.popup-overlay');
                popup.style.display = 'none';
            });
        });
        
        // Botões de cancelar
        cancelButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Encontrar o popup pai
                const popup = this.closest('.popup-overlay');
                popup.style.display = 'none';
            });
        });
    }

    // Inicializar a integração com o calendário
    if (loadAttendanceBtn) {
        loadAttendanceBtn.addEventListener('click', function() {
            const turmaId = turmaSelect.value;
            const disciplinaId = disciplinaSelect.value;
            const data = dataSelect.value;
            
            if (!turmaId || !disciplinaId || !data) {
                alert('Por favor, selecione todas as informações necessárias.');
                return;
            }
            
            // Carregar informações das aulas
            calendarioIntegration.getClassesInfo(turmaId, disciplinaId, data)
                .then(classInfo => {
                    if (!classInfo.hasClasses) {
                        alert(classInfo.message);
                        return;
                    }
                    
                    // Atualizar as informações da aula
                    updateClassInfo(classInfo);
                    
                    // Atualizar o cabeçalho das aulas
                    updateClassHeaders(classInfo);
                    
                    // Carregar os alunos
                    return calendarioIntegration.getStudents(turmaId)
                        .then(students => {
                            // Atualizar a lista de alunos
                            loadStudents(students, classInfo.numAulas);
                            
                            // Atualizar o resumo
                            updateAttendanceSummary();
                        });
                })
                .catch(error => {
                    console.error('Erro ao carregar informações:', error);
                    alert('Ocorreu um erro ao carregar as informações. Tente novamente.');
                });
        });
    }

    // Salvar chamada
    if (saveAttendanceBtn) {
        saveAttendanceBtn.addEventListener('click', function() {
            // Em uma aplicação real, aqui seria enviado um POST para o servidor
            // Para este exemplo, apenas mostramos um alerta
            alert('Chamada salva com sucesso!');
        });
    }

    // Inicializar os event listeners
    initEventListeners();
});