document.addEventListener('DOMContentLoaded', function() {
    // Cronograma das aulas (integrado do calendario.js)
    const cronogramaAulas = {
        manha: {
            'domingo': [],
            'segunda': [
                { id: 101, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                { id: 101, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                { id: 101, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                'Intervalo',
                { id: 104, title: 'Física', professor: 'Prof. Ricardo Alves' },
                { id: 105, title: 'História', professor: 'Profa. Clara Mendes' },
                { id: 106, title: 'Filosofia', professor: 'Profa. Amanda Dias' }
            ],
            'terca': [
                { id: 107, title: 'Português', professor: 'Prof. André Santos' },
                { id: 107, title: 'Português', professor: 'Prof. André Santos' },
                { id: 109, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                'Intervalo',
                { id: 110, title: 'Biologia', professor: 'Prof. Marcelo Costa' },
                { id: 110, title: 'Biologia', professor: 'Prof. Marcelo Costa' },
                { id: 112, title: 'Sociologia', professor: 'Prof. Renato Lopes' }
            ],
            'quarta': [
                { id: 113, title: 'Física', professor: 'Prof. Ricardo Alves' },
                { id: 113, title: 'Física', professor: 'Prof. Ricardo Alves' },
                { id: 115, title: 'Educação Física', professor: 'Prof. Fernando Gomes' },
                'Intervalo',
                { id: 116, title: 'Inglês', professor: 'Prof. Daniel Costa' },
                { id: 117, title: 'Arte', professor: 'Profa. Sofia Oliveira' },
                { id: 118, title: 'Literatura', professor: 'Prof. André Santos' }
            ],
            'quinta': [
                { id: 119, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                { id: 119, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                { id: 119, title: 'Matemática', professor: 'Prof. Carlos Silva' },
                'Intervalo',
                { id: 122, title: 'Português', professor: 'Prof. André Santos' },
                { id: 123, title: 'Sociologia', professor: 'Prof. Renato Lopes' },
                { id: 124, title: 'Redação', professor: 'Profa. Mariana Costa' }
            ],
            'sexta': [
                { id: 125, title: 'Geografia', professor: 'Prof. Rodrigo Matos' },
                { id: 125, title: 'Geografia', professor: 'Prof. Rodrigo Matos' },
                { id: 127, title: 'História', professor: 'Profa. Clara Mendes' },
                'Intervalo',
                { id: 128, title: 'Filosofia', professor: 'Profa. Amanda Dias' },
                { id: 129, title: 'Português', professor: 'Prof. André Santos' },
                { id: 130, title: 'Inteligência Artificial', professor: 'Prof. Marcos Oliveira' }
            ],
            'sabado': []
        }
    };
    
    // Horários das aulas
    const horarios = {
        manha: [
            '7:00 - 7:50',
            '7:50 - 8:40', 
            '8:40 - 9:30',
            'Intervalo',
            '9:50 - 10:40',
            '10:40 - 11:30',
            '11:30 - 12:20'
        ]
    };
    
    // Dados dos alunos (simulado)
    const estudantes = [
        { id: 20250001, nome: 'Ana Carolina Silva', matricula: '00000005662' },
        { id: 20250002, nome: 'Bruno Oliveira Santos', matricula: '00000005663' },
        { id: 20250003, nome: 'Camila Mendes Ferreira', matricula: '00000005664' },
        { id: 20250004, nome: 'Daniel Costa Lima', matricula: '00000005665' },
        { id: 20250005, nome: 'Eduardo Pereira Santos', matricula: '00000005666' },
        { id: 20250006, nome: 'Fernanda Alves Ribeiro', matricula: '00000005667' },
        { id: 20250007, nome: 'Gabriel Martins Sousa', matricula: '00000005668' },
        { id: 20250008, nome: 'Helena Cardoso Dias', matricula: '00000005669' },
        { id: 20250009, nome: 'Igor Teixeira Lima', matricula: '00000005670' },
        { id: 20250010, nome: 'Juliana Rocha Gomes', matricula: '00000005671' },
        { id: 20250011, nome: 'Lucas Menezes Oliveira', matricula: '00000005672' },
        { id: 20250012, nome: 'Mariana Souza Carvalho', matricula: '00000005673' },
        { id: 20250013, nome: 'Nathalia Fernandes Costa', matricula: '00000005674' },
        { id: 20250014, nome: 'Pedro Henrique Almeida', matricula: '00000005675' },
        { id: 20250015, nome: 'Rafael Lima Santos', matricula: '00000005676' }
    ];
    
    // Elementos DOM - VERIFICAÇÃO SEGURA
    const dataSelect = document.getElementById('data-select');
    const disciplinaSelect = document.getElementById('disciplina-select');
    const turmaSelect = document.getElementById('turma-select');
    const loadAttendanceBtn = document.getElementById('load-attendance-btn');
    const markAllPresentBtn = document.getElementById('mark-all-present');
    const markAllAbsentBtn = document.getElementById('mark-all-absent');
    const submitAttendanceBtn = document.getElementById('submit-attendance-btn');
    const saveAttendanceBtn = document.getElementById('save-attendance-btn'); // PODE SER NULL
    const studentsList = document.getElementById('students-list');
    const summaryContent = document.getElementById('summary-content');
    const notePopup = document.getElementById('note-popup');
    const justifyPopup = document.getElementById('justify-popup');
    
    // Elementos para mostrar/esconder
    const attendanceInfo = document.getElementById('attendance-info');
    const quickControls = document.getElementById('quick-controls');
    const attendanceContainer = document.getElementById('attendance-container');
    const attendanceSummary = document.getElementById('attendance-summary');
    const submitSection = document.getElementById('submit-section');
    
    // Elementos dos cabeçalhos das colunas
    const selectAllHeader = document.getElementById('select-all-header');
    const selectAllSubheader = document.getElementById('select-all-subheader');
    const class1Header = document.getElementById('class1-header');
    const class2Header = document.getElementById('class2-header');
    const class3Header = document.getElementById('class3-header');
    const class1Subheader = document.getElementById('class1-subheader');
    const class2Subheader = document.getElementById('class2-subheader');
    const class3Subheader = document.getElementById('class3-subheader');
    
    // Variáveis de estado
    let disciplinasDisponiveis = [];
    let currentClassData = null;
    
    // Inicialização
    initializePage();
    
    function initializePage() {
        // Definir data atual
        const hoje = new Date();
        if (dataSelect) {
            dataSelect.value = formatDateInput(hoje);
        }
        
        // Event listeners - COM VERIFICAÇÃO
        if (dataSelect) {
            dataSelect.addEventListener('change', updateDisciplinasDisponiveis);
        }
        
        if (disciplinaSelect) {
            disciplinaSelect.addEventListener('change', loadStudents);
        }
        
        if (loadAttendanceBtn) {
            loadAttendanceBtn.addEventListener('click', loadStudents);
        }
        
        if (markAllPresentBtn) {
            markAllPresentBtn.addEventListener('click', markAllPresent);
        }
        
        if (markAllAbsentBtn) {
            markAllAbsentBtn.addEventListener('click', markAllAbsent);
        }
        
        if (submitAttendanceBtn) {
            submitAttendanceBtn.addEventListener('click', submitAttendance);
        }
        
        // VERIFICAÇÃO SEGURA PARA O BOTÃO SALVAR
        if (saveAttendanceBtn) {
            saveAttendanceBtn.addEventListener('click', saveAttendance);
        }
        
        // Fechar popups
        document.querySelectorAll('.close-popup, .btn-cancel').forEach(btn => {
            btn.addEventListener('click', closePopups);
        });
        
        // Carregar disciplinas para hoje e auto-selecionar primeira
        updateDisciplinasDisponiveis(true);
    }
    
    function formatDateInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const days = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        return days[date.getDay()];
    }
    
    function formatDateDisplay(dateString) {
        const date = new Date(dateString);
        const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    }
    
    function updateDisciplinasDisponiveis(autoLoad = false) {
        if (!dataSelect) return;
        
        const selectedDate = dataSelect.value;
        if (!selectedDate) return;
        
        const dayOfWeek = getDayOfWeek(selectedDate);
        const aulasDay = cronogramaAulas.manha[dayOfWeek] || [];
        
        // Agrupar aulas por disciplina
        const disciplinasMap = new Map();
        
        aulasDay.forEach((aula, index) => {
            if (aula !== 'Intervalo' && typeof aula === 'object') {
                const key = `${aula.title}-${aula.professor}`;
                if (!disciplinasMap.has(key)) {
                    disciplinasMap.set(key, {
                        titulo: aula.title,
                        professor: aula.professor,
                        aulas: [],
                        sequenciais: 0,
                        indices: [] // Guardar os índices originais
                    });
                }
                
                const disciplina = disciplinasMap.get(key);
                disciplina.aulas.push({
                    numero: disciplina.aulas.length + 1,
                    horario: horarios.manha[index],
                    index: index,
                    posicaoOriginal: index // Guardar posição original no cronograma
                });
                disciplina.indices.push(index);
            }
        });
        
        // Calcular aulas sequenciais
        disciplinasMap.forEach((disciplina) => {
            disciplina.sequenciais = disciplina.aulas.length;
        });
        
        // Atualizar select de disciplinas
        if (!disciplinaSelect) return;
        
        disciplinaSelect.innerHTML = '';
        
        if (disciplinasMap.size === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Nenhuma aula programada para este dia';
            option.disabled = true;
            disciplinaSelect.appendChild(option);
        } else {
            let firstOption = null;
            disciplinasMap.forEach((disciplina, key) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${disciplina.titulo} (${disciplina.sequenciais} aula${disciplina.sequenciais > 1 ? 's' : ''}) - ${disciplina.professor}`;
                disciplinaSelect.appendChild(option);
                
                // Guardar a primeira opção
                if (!firstOption) {
                    firstOption = option;
                }
            });
            
            // Auto-selecionar primeira disciplina e carregar automaticamente
            if (autoLoad && firstOption) {
                disciplinaSelect.value = firstOption.value;
                // Aguardar um momento para garantir que o DOM foi atualizado
                setTimeout(() => {
                    loadStudents();
                }, 100);
            }
        }
        
        disciplinasDisponiveis = disciplinasMap;
    }
    
    function updateTableHeaders(numAulas) {
        if (!selectAllHeader || !class1Header) return;
        
        // Resetar todas as colunas
        selectAllHeader.style.display = 'none';
        if (selectAllSubheader) selectAllSubheader.style.display = 'none';
        class1Header.style.display = 'table-cell';
        if (class2Header) class2Header.style.display = 'none';
        if (class3Header) class3Header.style.display = 'none';
        if (class1Subheader) class1Subheader.style.display = 'table-cell';
        if (class2Subheader) class2Subheader.style.display = 'none';
        if (class3Subheader) class3Subheader.style.display = 'none';
        
        // Mostrar "selecionar todas" apenas se houver mais de 1 aula
        if (numAulas > 1) {
            selectAllHeader.style.display = 'table-cell';
            if (selectAllSubheader) selectAllSubheader.style.display = 'table-cell';
        }
        
        // Mostrar colunas baseado no número de aulas
        if (numAulas >= 2 && class2Header && class2Subheader) {
            class2Header.style.display = 'table-cell';
            class2Subheader.style.display = 'table-cell';
        }
        
        if (numAulas >= 3 && class3Header && class3Subheader) {
            class3Header.style.display = 'table-cell';
            class3Subheader.style.display = 'table-cell';
        }
        
        // Atualizar os horários com base nos dados reais da disciplina
        if (currentClassData && currentClassData.aulas) {
            // Limpar todos os horários primeiro
            const allSubheaders = [class1Subheader, class2Subheader, class3Subheader];
            allSubheaders.forEach(subheader => {
                if (subheader) {
                    const timeElement = subheader.querySelector('.class-time');
                    if (timeElement) {
                        timeElement.textContent = '(-)';
                    }
                }
            });
            
            // Definir horários corretos baseado na disciplina
            currentClassData.aulas.forEach((aula, index) => {
                const subheaderElement = [class1Subheader, class2Subheader, class3Subheader][index];
                if (subheaderElement) {
                    const timeElement = subheaderElement.querySelector('.class-time');
                    if (timeElement) {
                        timeElement.textContent = `(${aula.horario})`;
                    }
                }
            });
        }
    }
    
    function loadStudents() {
        if (!turmaSelect || !dataSelect || !disciplinaSelect) return;
        
        const turma = turmaSelect.value;
        const data = dataSelect.value;
        const disciplinaKey = disciplinaSelect.value;
        
        if (!turma || !data || !disciplinaKey) {
            // Se não houver disciplina selecionada, esconder as seções
            if (!disciplinaKey) {
                hideSections();
            }
            return;
        }
        
        const disciplina = disciplinasDisponiveis.get(disciplinaKey);
        if (!disciplina) {
            hideSections();
            return;
        }
        
        currentClassData = {
            turma: turmaSelect.options[turmaSelect.selectedIndex].text,
            data: data,
            disciplina: disciplina.titulo,
            professor: disciplina.professor,
            aulas: disciplina.aulas,
            totalAulas: disciplina.sequenciais
        };
        
        // Atualizar cabeçalhos da tabela
        updateTableHeaders(currentClassData.totalAulas);
        
        // Mostrar informações da aula
        updateClassInfo();
        
        // Carregar lista de estudantes
        loadStudentsList();
        
        // Mostrar seções
        showSections();
        
        // Inicializar event listeners
        initializeEventListeners();
    }
    
    function updateClassInfo() {
        const infoTurma = document.getElementById('info-turma');
        const infoData = document.getElementById('info-data');
        const infoDisciplina = document.getElementById('info-disciplina');
        const infoProfessor = document.getElementById('info-professor');
        const infoAulas = document.getElementById('info-aulas');
        
        if (infoTurma) infoTurma.textContent = currentClassData.turma;
        if (infoData) infoData.textContent = formatDateDisplay(currentClassData.data);
        if (infoDisciplina) infoDisciplina.textContent = currentClassData.disciplina;
        if (infoProfessor) infoProfessor.textContent = currentClassData.professor;
        
        if (infoAulas) {
            const primeiraAula = currentClassData.aulas[0].horario;
            const ultimaAula = currentClassData.aulas[currentClassData.aulas.length - 1].horario;
            infoAulas.textContent = `${currentClassData.totalAulas} aula${currentClassData.totalAulas > 1 ? 's' : ''} (${primeiraAula.split(' - ')[0]} - ${ultimaAula.split(' - ')[1]})`;
        }
    }
    
    function loadStudentsList() {
        if (!studentsList) return;
        
        // Limpar lista anterior
        studentsList.innerHTML = '';
        
        // Adicionar estudantes
        estudantes.forEach(estudante => {
            const row = createStudentRow(estudante);
            studentsList.appendChild(row);
        });
        
        updateAttendanceSummary();
    }
    
    function createStudentRow(estudante) {
        const row = document.createElement('tr');
        row.dataset.studentId = estudante.id;
        
        // Criar células para as aulas baseado no número de aulas
        let aulasHtml = '';
        
        // Checkbox "selecionar todas" só aparece se houver mais de 1 aula
        let selectAllCell = '';
        if (currentClassData.totalAulas > 1) {
            selectAllCell = `
                <td style="display: table-cell;">
                    <div class="checkbox-container">
                        <input type="checkbox" class="select-all-student">
                    </div>
                </td>
            `;
        }
        
        // Criar células individuais para cada aula
        for (let i = 1; i <= 3; i++) {
            const display = i <= currentClassData.totalAulas ? 'table-cell' : 'none';
            aulasHtml += `
                <td style="display: ${display};">
                    <div class="checkbox-container">
                        <input type="checkbox" class="class-checkbox" data-class="${i}">
                    </div>
                </td>
            `;
        }
        
        row.innerHTML = `
            <td>${estudante.nome}</td>
            <td>${estudante.matricula}</td>
            ${selectAllCell}
            ${aulasHtml}
            <td>
                <span class="status-badge absent">Ausente</span>
            </td>
            <td class="actions-column">
                <button class="btn-icon note-btn" title="Adicionar observação">
                    <span class="material-symbols-outlined">note_add</span>
                </button>
                <button class="btn-icon justify-btn" title="Justificar falta">
                    <span class="material-symbols-outlined">assignment_turned_in</span>
                </button>
            </td>
        `;
        
        return row;
    }
    
    function showSections() {
        if (attendanceInfo) attendanceInfo.style.display = 'block';
        if (quickControls) quickControls.style.display = 'flex';
        if (attendanceContainer) attendanceContainer.style.display = 'block';
        if (attendanceSummary) attendanceSummary.style.display = 'block';
        if (submitSection) submitSection.style.display = 'block';
    }
    
    function hideSections() {
        if (attendanceInfo) attendanceInfo.style.display = 'none';
        if (quickControls) quickControls.style.display = 'none';
        if (attendanceContainer) attendanceContainer.style.display = 'none';
        if (attendanceSummary) attendanceSummary.style.display = 'none';
        if (submitSection) submitSection.style.display = 'none';
    }
    
    function initializeEventListeners() {
        // Checkboxes "selecionar todos" do estudante
        document.querySelectorAll('.select-all-student').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const row = this.closest('tr');
                const classCheckboxes = row.querySelectorAll('.class-checkbox:not([style*="display: none"])');
                const isChecked = this.checked;
                
                classCheckboxes.forEach(cb => {
                    cb.checked = isChecked;
                });
                
                updateStudentStatus(row);
            });
        });
        
        // Checkboxes individuais das aulas
        document.querySelectorAll('.class-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const row = this.closest('tr');
                updateStudentStatus(row);
            });
        });
        
        // Botões de observação
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const studentName = row.querySelector('td').textContent;
                const studentId = row.querySelector('td:nth-child(2)').textContent;
                
                const studentNameElement = document.querySelector('#note-popup .student-name-mini');
                const studentIdElement = document.querySelector('#note-popup .student-id-mini');
                
                if (studentNameElement) studentNameElement.textContent = studentName;
                if (studentIdElement) studentIdElement.textContent = `Matrícula: ${studentId}`;
                
                if (notePopup) notePopup.style.display = 'flex';
            });
        });
        
        // Botões de justificativa
        document.querySelectorAll('.justify-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const studentName = row.querySelector('td').textContent;
                const studentId = row.querySelector('td:nth-child(2)').textContent;
                
                const studentNameElement = document.querySelector('#justify-popup .student-name-mini');
                const studentIdElement = document.querySelector('#justify-popup .student-id-mini');
                
                if (studentNameElement) studentNameElement.textContent = studentName;
                if (studentIdElement) studentIdElement.textContent = `Matrícula: ${studentId}`;
                
                if (justifyPopup) justifyPopup.style.display = 'flex';
            });
        });
    }
    
    function updateStudentStatus(row) {
        const visibleCheckboxes = row.querySelectorAll('.class-checkbox:not([style*="display: none"])');
        const statusBadge = row.querySelector('.status-badge');
        const selectAllCheckbox = row.querySelector('.select-all-student');
        
        let checkedCount = 0;
        let justifiedCount = 0;
        
        visibleCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCount++;
                if (checkbox.classList.contains('justified')) {
                    justifiedCount++;
                }
            }
        });
        
        // Atualizar checkbox "selecionar todos" se existir
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = (checkedCount === visibleCheckboxes.length);
            selectAllCheckbox.indeterminate = (checkedCount > 0 && checkedCount < visibleCheckboxes.length);
        }
        
        // Atualizar status
        if (statusBadge) {
            statusBadge.className = 'status-badge';
            
            if (justifiedCount > 0) {
                statusBadge.classList.add('justified');
                statusBadge.textContent = 'Justificado';
            } else if (checkedCount === 0) {
                statusBadge.classList.add('absent');
                statusBadge.textContent = 'Ausente';
            } else if (checkedCount === visibleCheckboxes.length) {
                statusBadge.classList.add('present');
                statusBadge.textContent = 'Presente';
            } else {
                statusBadge.classList.add('late');
                statusBadge.textContent = 'Atrasado';
            }
        }
        
        updateAttendanceSummary();
    }
    
    function updateAttendanceSummary() {
        if (!summaryContent) return;
        
        const totalStudents = document.querySelectorAll('#students-list tr').length;
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let justifiedCount = 0;
        
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
        
        summaryContent.innerHTML = `
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
    
    function markAllPresent() {
        document.querySelectorAll('#students-list tr').forEach(row => {
            row.querySelectorAll('.class-checkbox:not([style*="display: none"])').forEach(cb => {
                cb.checked = true;
            });
            
            const selectAllCheckbox = row.querySelector('.select-all-student');
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = true;
            }
            
            updateStudentStatus(row);
        });
    }
    
    function markAllAbsent() {
        document.querySelectorAll('#students-list tr').forEach(row => {
            row.querySelectorAll('.class-checkbox:not([style*="display: none"])').forEach(cb => {
                cb.checked = false;
            });
            
            const selectAllCheckbox = row.querySelector('.select-all-student');
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = false;
            }
            
            updateStudentStatus(row);
        });
    }
    
    function saveAttendance() {
        if (!currentClassData) {
            alert('Nenhuma aula carregada.');
            return;
        }
        
        // Simular salvamento
        const attendanceData = collectAttendanceData();
        console.log('Dados da chamada salvos:', attendanceData);
        
        // Feedback visual - VERIFICAÇÃO SEGURA
        if (saveAttendanceBtn) {
            const originalText = saveAttendanceBtn.innerHTML;
            saveAttendanceBtn.innerHTML = '<span class="material-symbols-outlined">check</span> Salvo!';
            saveAttendanceBtn.style.backgroundColor = '#16a34a';
            
            setTimeout(() => {
                saveAttendanceBtn.innerHTML = originalText;
                saveAttendanceBtn.style.backgroundColor = '';
            }, 2000);
        }
    }
    
    function submitAttendance() {
        if (!currentClassData) {
            alert('Nenhuma aula carregada.');
            return;
        }
        
        if (confirm('Deseja enviar a lista de chamada? Esta ação não pode ser desfeita.')) {
            // Simular envio
            const attendanceData = collectAttendanceData();
            console.log('Lista de chamada enviada:', attendanceData);
            
            // Feedback visual
            if (submitAttendanceBtn) {
                const originalText = submitAttendanceBtn.innerHTML;
                submitAttendanceBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Enviado com Sucesso!';
                submitAttendanceBtn.style.backgroundColor = '#16a34a';
                submitAttendanceBtn.disabled = true;
            }
            
            // Desabilitar edição
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.disabled = true;
            });
            
            setTimeout(() => {
                alert('Lista de chamada enviada com sucesso!\nVocê pode visualizar o relatório na seção de relatórios.');
            }, 1000);
        }
    }
    
    function collectAttendanceData() {
        const attendanceData = {
            classInfo: currentClassData,
            students: []
        };
        
        document.querySelectorAll('#students-list tr').forEach(row => {
            const studentId = row.dataset.studentId;
            const studentName = row.querySelector('td').textContent;
            const studentMatricula = row.querySelector('td:nth-child(2)').textContent;
            const statusElement = row.querySelector('.status-badge');
            const status = statusElement ? statusElement.textContent : 'Ausente';
            
            const classes = [];
            row.querySelectorAll('.class-checkbox:not([style*="display: none"])').forEach((cb, index) => {
                classes.push({
                    classNumber: index + 1,
                    present: cb.checked,
                    justified: cb.classList.contains('justified')
                });
            });
            
            attendanceData.students.push({
                id: studentId,
                name: studentName,
                matricula: studentMatricula,
                status: status,
                classes: classes
            });
        });
        
        return attendanceData;
    }
    
    function closePopups() {
        if (notePopup) notePopup.style.display = 'none';
        if (justifyPopup) justifyPopup.style.display = 'none';
    }
    
    // Fechar popups clicando fora
    [notePopup, justifyPopup].forEach(popup => {
        if (popup) {
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    popup.style.display = 'none';
                }
            });
        }
    });
    
    // Event listeners para confirmar ações dos popups
    const noteConfirmBtn = document.querySelector('#note-popup .btn-confirm');
    if (noteConfirmBtn) {
        noteConfirmBtn.addEventListener('click', function() {
            const noteContentElement = document.getElementById('note-content');
            const noteContent = noteContentElement ? noteContentElement.value : '';
            
            if (noteContent.trim()) {
                alert('Observação salva com sucesso!');
                if (noteContentElement) noteContentElement.value = '';
                closePopups();
            } else {
                alert('Por favor, digite uma observação.');
            }
        });
    }
    
    const justifyConfirmBtn = document.querySelector('#justify-popup .btn-confirm');
    if (justifyConfirmBtn) {
        justifyConfirmBtn.addEventListener('click', function() {
            const justifyTypeElement = document.getElementById('justify-type');
            const justifyContentElement = document.getElementById('justify-content');
            const justifyDateElement = document.getElementById('justify-date');
            
            const justifyType = justifyTypeElement ? justifyTypeElement.value : '';
            const justifyContent = justifyContentElement ? justifyContentElement.value : '';
            
            if (justifyType && justifyContent.trim()) {
                alert('Justificativa registrada com sucesso!');
                if (justifyTypeElement) justifyTypeElement.value = '';
                if (justifyContentElement) justifyContentElement.value = '';
                if (justifyDateElement) justifyDateElement.value = '';
                closePopups();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});