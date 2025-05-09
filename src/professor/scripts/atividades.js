document.addEventListener("DOMContentLoaded", function() {
    
    const sidebar = document.getElementById("sidebar");
    const menuIconSidebar = document.getElementById("menu-icon");
    const menuIconMobile = document.getElementById("menu-icon-mobile");
    
    
    const notificationsIcon = document.getElementById("notifications-icon");
    const notificationsPopup = document.getElementById("notifications-popup");
    const userIcon = document.getElementById("user-icon");
    const userIconPopup = document.getElementById("user-icon-popup");
    
    
    const activitiesList = document.querySelector('.activities-list');
    const newActivityBtn = document.getElementById('new-activity-btn');
    const activityModal = document.getElementById('activity-modal');
    const deliveryModal = document.getElementById('delivery-modal');
    const activityForm = document.getElementById('activity-form');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-delivery-modal');
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    
    let activities = [
        {
            id: 1,
            title: "Exercícios de Matemática",
            class: "A",
            year: "1",
            subject: "matematica",
            dueDate: "2023-11-15",
            questions: "1. Resolva as equações:\na) 2x + 5 = 17\nb) 3(x - 4) = 21\n\n2. Calcule a área de um retângulo com lados 5cm e 8cm.\n\n3. Resolva o problema:\nJoão tem 12 anos e é 3 anos mais novo que Maria. Quantos anos Maria tem?",
            deliveries: {
                delivered: [
                    { name: "João Silva", date: "2023-11-14" },
                    { name: "Maria Oliveira", date: "2023-11-13" }
                ],
                notDelivered: [
                    { name: "Carlos Souza" },
                    { name: "Ana Pereira" }
                ]
            }
        },
        {
            id: 2,
            title: "Redação sobre Sustentabilidade",
            class: "B",
            year: "2",
            subject: "portugues",
            dueDate: "2023-11-20",
            questions: "Escreva uma redação de 30 linhas sobre sustentabilidade ambiental, abordando:\n\n- O conceito de desenvolvimento sustentável\n- Os principais problemas ambientais atuais\n- O que podemos fazer no dia a dia para preservar o meio ambiente\n\nA redação deve seguir a estrutura dissertativa-argumentativa com introdução, desenvolvimento e conclusão.",
            deliveries: {
                delivered: [
                    { name: "Pedro Costa", date: "2023-11-19" }
                ],
                notDelivered: [
                    { name: "Juliana Santos" },
                    { name: "Lucas Martins" },
                    { name: "Fernanda Lima" }
                ]
            }
        },
        {
            id: 3,
            title: "Revolução Industrial",
            class: "C",
            year: "3",
            subject: "historia",
            dueDate: "2023-11-18",
            questions: "1. Quais foram as principais causas da Revolução Industrial na Inglaterra?\n\n2. Descreva as condições de trabalho nas fábricas durante a Revolução Industrial.\n\n3. Quais foram as consequências sociais da Revolução Industrial?\n\n4. Compare a Primeira e a Segunda Revolução Industrial.",
            deliveries: {
                delivered: [
                    { name: "Rafael Almeida", date: "2023-11-17" },
                    { name: "Camila Rocha", date: "2023-11-16" },
                    { name: "Gustavo Henrique", date: "2023-11-17" }
                ],
                notDelivered: [
                    { name: "Patricia Mendes" }
                ]
            }
        }
    ];

    
    menuIconSidebar.addEventListener("click", function() {
        sidebar.classList.toggle("active");
    });

    menuIconMobile.addEventListener("click", function() {
        sidebar.classList.toggle("active");
    });

    
    notificationsIcon.addEventListener("click", function(event) {
        notificationsPopup.style.display = 
            (notificationsPopup.style.display === "none" || notificationsPopup.style.display === "") ? "block" : "none";
        userIconPopup.style.display = "none";
        event.stopPropagation();
    });

    userIcon.addEventListener("click", function(event) {
        userIconPopup.style.display = 
            (userIconPopup.style.display === "none" || userIconPopup.style.display === "") ? "block" : "none";
        notificationsPopup.style.display = "none";
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!notificationsPopup.contains(event.target) && event.target !== notificationsIcon) {
            notificationsPopup.style.display = "none";
        }
        if (!userIconPopup.contains(event.target) && event.target !== userIcon) {
            userIconPopup.style.display = "none";
        }
    });

    
    function checkWindowSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        }
    }

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    
    loadActivities();

   
    newActivityBtn.addEventListener('click', () => {
        openActivityModal();
    });

    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activityModal.style.display = 'none';
            deliveryModal.style.display = 'none';
        });
    });

    
    window.addEventListener('click', (event) => {
        if (event.target === activityModal) {
            activityModal.style.display = 'none';
        }
        if (event.target === deliveryModal) {
            deliveryModal.style.display = 'none';
        }
    });

   
    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveActivity();
    });

    
    applyFiltersBtn.addEventListener('click', () => {
        loadActivities();
    });

    
    function loadActivities() {
        const classFilter = document.getElementById('class-filter').value;
        const yearFilter = document.getElementById('year-filter').value;
        const subjectFilter = document.getElementById('subject-filter').value;

        let filteredActivities = activities.filter(activity => {
            return (classFilter === 'all' || activity.class === classFilter) &&
                   (yearFilter === 'all' || activity.year === yearFilter) &&
                   (subjectFilter === 'all' || activity.subject === subjectFilter);
        });

        renderActivities(filteredActivities);
    }

    
    function renderActivities(activitiesToRender) {
        activitiesList.innerHTML = '';

        if (activitiesToRender.length === 0) {
            activitiesList.innerHTML = '<p class="no-activities">Nenhuma atividade encontrada com os filtros selecionados.</p>';
            return;
        }

        activitiesToRender.forEach(activity => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            activityCard.dataset.id = activity.id;

            const dueDate = new Date(activity.dueDate);
            const formattedDate = dueDate.toLocaleDateString('pt-BR');

            activityCard.innerHTML = `
                <h3>${activity.title}</h3>
                <div class="activity-meta">
                    <span class="activity-meta-item">
                        <span class="material-symbols-outlined">groups</span>
                        Turma ${activity.class} - ${activity.year}º Ano
                    </span>
                    <span class="activity-meta-item">
                        <span class="material-symbols-outlined">book</span>
                        ${getSubjectName(activity.subject)}
                    </span>
                </div>
                <div class="activity-due-date">
                    <span class="label">Data de entrega:</span>
                    <span class="date">${formattedDate}</span>
                </div>
                <div class="activity-actions">
                    <button class="action-btn edit" data-id="${activity.id}">
                        <span class="material-symbols-outlined">edit</span>
                        Editar
                    </button>
                    <button class="action-btn delete" data-id="${activity.id}">
                        <span class="material-symbols-outlined">delete</span>
                        Excluir
                    </button>
                    <button class="action-btn view-deliveries" data-id="${activity.id}">
                        <span class="material-symbols-outlined">visibility</span>
                        Entregas
                    </button>
                </div>
            `;

            activitiesList.appendChild(activityCard);
        });

        
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const activityId = parseInt(e.currentTarget.dataset.id);
                openActivityModal(activityId);
            });
        });

        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const activityId = parseInt(e.currentTarget.dataset.id);
                deleteActivity(activityId);
            });
        });

        document.querySelectorAll('.action-btn.view-deliveries').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const activityId = parseInt(e.currentTarget.dataset.id);
                viewDeliveries(activityId);
            });
        });
    }

    
    function openActivityModal(activityId = null) {
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('activity-form');
        
        if (activityId) {
            
            modalTitle.textContent = 'Editar Atividade';
            const activity = activities.find(a => a.id === activityId);
            
            document.getElementById('activity-title').value = activity.title;
            document.getElementById('activity-class').value = activity.class;
            document.getElementById('activity-year').value = activity.year;
            document.getElementById('activity-subject').value = activity.subject;
            document.getElementById('activity-due-date').value = activity.dueDate;
            document.getElementById('activity-questions').value = activity.questions;
            
            form.dataset.editId = activityId;
        } else {
          
            modalTitle.textContent = 'Nova Atividade';
            form.reset();
            delete form.dataset.editId;
            
          
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const formattedDate = nextWeek.toISOString().split('T')[0];
            document.getElementById('activity-due-date').value = formattedDate;
        }
        
        activityModal.style.display = 'block';
    }

    
    function saveActivity() {
        const form = document.getElementById('activity-form');
        const isEdit = form.dataset.editId !== undefined;
        
        const activityData = {
            title: document.getElementById('activity-title').value,
            class: document.getElementById('activity-class').value,
            year: document.getElementById('activity-year').value,
            subject: document.getElementById('activity-subject').value,
            dueDate: document.getElementById('activity-due-date').value,
            questions: document.getElementById('activity-questions').value
        };
        
        if (isEdit) {
            
            const activityId = parseInt(form.dataset.editId);
            const index = activities.findIndex(a => a.id === activityId);
            
            if (index !== -1) {
                
                activityData.id = activityId;
                activityData.deliveries = activities[index].deliveries;
                activities[index] = activityData;
            }
        } else {
            
            const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
            activityData.id = newId;
            activityData.deliveries = {
                delivered: [],
                notDelivered: generateStudentList(activityData.class, activityData.year)
            };
            activities.push(activityData);
        }
        
        loadActivities();
        activityModal.style.display = 'none';
    }

    
    function deleteActivity(activityId) {
        if (confirm('Tem certeza que deseja excluir esta atividade? Esta ação não pode ser desfeita.')) {
            activities = activities.filter(a => a.id !== activityId);
            loadActivities();
        }
    }

    
    function viewDeliveries(activityId) {
        const activity = activities.find(a => a.id === activityId);
        if (!activity) return;
        
        document.getElementById('delivery-modal-title').textContent = `Entregas: ${activity.title}`;
        document.getElementById('total-students').textContent = 
            activity.deliveries.delivered.length + activity.deliveries.notDelivered.length;
        document.getElementById('delivered-count').textContent = activity.deliveries.delivered.length;
        document.getElementById('not-delivered-count').textContent = activity.deliveries.notDelivered.length;
        
        document.getElementById('delivered-tab-count').textContent = activity.deliveries.delivered.length;
        document.getElementById('not-delivered-tab-count').textContent = activity.deliveries.notDelivered.length;
        
        
        const deliveredList = document.getElementById('delivered-list');
        deliveredList.innerHTML = '';
        activity.deliveries.delivered.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="student-name">${student.name}</span>
                <span class="student-delivery-date">Entregue em: ${formatDeliveryDate(student.date)}</span>
            `;
            deliveredList.appendChild(li);
        });
        
        
        const notDeliveredList = document.getElementById('not-delivered-list');
        notDeliveredList.innerHTML = '';
        activity.deliveries.notDelivered.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="student-name">${student.name}</span>
                <span class="student-delivery-date">Pendente</span>
            `;
            notDeliveredList.appendChild(li);
        });
        
        
        setupTabs();
        
        deliveryModal.style.display = 'block';
    }

    
    function getSubjectName(subjectKey) {
        const subjects = {
            matematica: 'Matemática',
            portugues: 'Português',
            historia: 'História',
            geografia: 'Geografia',
            ciencias: 'Ciências',
            ingles: 'Inglês'
        };
        return subjects[subjectKey] || subjectKey;
    }

    function formatDeliveryDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    function generateStudentList(classLetter, year) {
        
        const firstNames = ["João", "Maria", "Carlos", "Ana", "Pedro", "Juliana", "Lucas", "Fernanda", "Rafael", "Camila", "Gustavo", "Patricia"];
        const lastNames = ["Silva", "Oliveira", "Souza", "Pereira", "Costa", "Santos", "Martins", "Lima", "Almeida", "Rocha", "Henrique", "Mendes"];
        
       
        const studentNames = [];
        for (let i = 0; i < 8; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            studentNames.push(`${firstName} ${lastName}`);
        }
        
        return studentNames.map(name => ({ name }));
    }

    function setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
               
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                
                btn.classList.add('active');
                
                
                const tabId = btn.dataset.tab + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});