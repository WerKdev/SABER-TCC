document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo das atividades (em produção viria do backend)
    const activities = [
        {
            id: 123,
            title: 'Exercícios de Álgebra',
            subject: 'Matemática',
            dueDate: '2025-05-13',
            dueTime: '23:59',
            status: 'pendente',
            description: 'Resolver os exercícios 1 ao 10 da página 45.'
        },
        {
            id: 124,
            title: 'Análise Combinatória',
            subject: 'Matemática',
            dueDate: '2025-05-15',
            dueTime: '15:00',
            status: 'pendente',
            description: 'Resolver problemas de análise combinatória do livro.'
        },
        {
            id: 125,
            title: 'Revolução Industrial',
            subject: 'História',
            dueDate: '2025-05-10',
            dueTime: '14:00',
            status: 'concluida',
            description: 'Resumo sobre as causas e consequências da Revolução Industrial.',
            grade: '9.5'
        },
        {
            id: 126,
            title: 'Análise de Texto',
            subject: 'Português',
            dueDate: '2025-05-05',
            dueTime: '16:00',
            status: 'avaliada',
            description: 'Análise do conto "A Cartomante" de Machado de Assis.',
            grade: '8.0'
        },
        {
            id: 127,
            title: 'Relatório de Experimento',
            subject: 'Ciências',
            dueDate: '2025-05-18',
            dueTime: '14:00',
            status: 'pendente',
            description: 'Relatório sobre o experimento de germinação de sementes.'
        },
        {
            id: 128,
            title: 'Mapa Conceitual',
            subject: 'Geografia',
            dueDate: '2025-05-22',
            dueTime: '15:00',
            status: 'pendente',
            description: 'Criar um mapa conceitual sobre as principais regiões do Brasil.'
        }
    ];

    // Variáveis globais
    let currentDate = new Date(2025, 4, 10); // 10 de maio de 2025
    const today = new Date(2025, 4, 10);
    let selectedDate = null;
    let currentFilter = 'todas';

    // Elementos DOM
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthYear = document.getElementById('current-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const selectedDateTitle = document.getElementById('selected-date-title');
    const dayActivitiesList = document.getElementById('day-activities-list');
    const notificationsList = document.getElementById('notifications-list');
    const activityFilter = document.getElementById('activity-filter');
    const todayBtn = document.getElementById('today-btn');
    const activityDetailPopup = document.getElementById('activity-detail-popup');
    const activityDetailContent = document.getElementById('activity-detail-content');
    const closePopup = document.querySelector('.activity-detail-popup .close-popup');

    // Função auxiliar para parsing correto de datas
    function parseLocalDate(dateString) {
        // Divide a data em partes (ano, mês, dia)
        const [year, month, day] = dateString.split('-').map(Number);
        // Cria a data usando os valores locais (mês é 0-indexado)
        return new Date(year, month - 1, day);
    }

    // Inicialização
    renderCalendar();
    renderNotifications();

    // Event Listeners
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date(today);
        selectedDate = new Date(today);
        renderCalendar();
        renderDayActivities(selectedDate);
    });

    activityFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderCalendar();
        if (selectedDate) {
            renderDayActivities(selectedDate);
        }
    });

    // Event listener para fechar o popup
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            activityDetailPopup.style.display = 'none';
        });
    }

    activityDetailPopup.addEventListener('click', (e) => {
        if (e.target === activityDetailPopup) {
            activityDetailPopup.style.display = 'none';
        }
    });

    // Fechar popup com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activityDetailPopup.style.display === 'flex') {
            activityDetailPopup.style.display = 'none';
        }
    });

    // Funções principais
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Atualizar título do mês/ano
        currentMonthYear.textContent = `${getMonthName(month)} ${year}`;
        
        // Limpar dias existentes
        calendarDays.innerHTML = '';
        
        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        
        // Dias do mês anterior
        for (let i = firstDay.getDay(); i > 0; i--) {
            const day = prevLastDay.getDate() - i + 1;
            const dayElement = createDayElement(new Date(year, month - 1, day), true);
            calendarDays.appendChild(dayElement);
        }
        
        // Dias do mês atual
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const dayElement = createDayElement(date);
            calendarDays.appendChild(dayElement);
        }
        
        // Dias do próximo mês
        const remainingDays = 42 - calendarDays.children.length; // 6 semanas
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            const dayElement = createDayElement(date, true);
            calendarDays.appendChild(dayElement);
        }
    }

    function createDayElement(date, otherMonth = false) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (otherMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Verificar se é hoje
        if (isToday(date)) {
            dayElement.classList.add('today');
        }
        
        // Verificar se está selecionado
        if (selectedDate && isSameDay(date, selectedDate)) {
            dayElement.classList.add('selected');
        }
        
        // Número do dia
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);
        
        // Atividades do dia
        const dayActivities = getActivitiesForDate(date);
        if (dayActivities.length > 0) {
            // Indicadores de pontos
            const indicators = document.createElement('div');
            indicators.className = 'activity-indicators';
            
            dayActivities.slice(0, 3).forEach(activity => {
                const dot = document.createElement('div');
                dot.className = `activity-dot ${activity.status}`;
                indicators.appendChild(dot);
            });
            
            dayElement.appendChild(indicators);
            
            // Mini cards (máximo 2)
            dayActivities.slice(0, 2).forEach(activity => {
                const miniCard = document.createElement('div');
                miniCard.className = `activity-mini-card ${activity.status}`;
                miniCard.textContent = activity.title;
                miniCard.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showActivityDetails(activity);
                });
                dayElement.appendChild(miniCard);
            });
            
            if (dayActivities.length > 2) {
                const moreText = document.createElement('div');
                moreText.className = 'more-activities';
                moreText.textContent = `+${dayActivities.length - 2} mais`;
                moreText.style.fontSize = '11px';
                moreText.style.color = 'var(--texto-secundario)';
                moreText.style.marginTop = '2px';
                dayElement.appendChild(moreText);
            }
        }
        
        // Click handler
        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            dayElement.classList.add('selected');
            selectedDate = new Date(date);
            renderDayActivities(date);
        });
        
        return dayElement;
    }

    function getActivitiesForDate(date) {
        let filteredActivities = activities.filter(activity => {
            const activityDate = parseLocalDate(activity.dueDate);
            return isSameDay(activityDate, date);
        });
        
        if (currentFilter !== 'todas') {
            filteredActivities = filteredActivities.filter(activity => 
                activity.status === currentFilter
            );
        }
        
        return filteredActivities;
    }

    function renderDayActivities(date) {
        const formattedDate = `${date.getDate()} de ${getMonthName(date.getMonth())} de ${date.getFullYear()}`;
        selectedDateTitle.textContent = `Atividades - ${formattedDate}`;
        
        const dayActivities = getActivitiesForDate(date);
        
        if (dayActivities.length === 0) {
            dayActivitiesList.innerHTML = '<p class="no-activities">Nenhuma atividade para este dia.</p>';
            return;
        }
        
        dayActivitiesList.innerHTML = '';
        dayActivities.forEach(activity => {
            const card = createActivityCard(activity);
            dayActivitiesList.appendChild(card);
        });
    }

    function createActivityCard(activity) {
        const card = document.createElement('div');
        card.className = `day-activity-card ${activity.status}`;
        
        card.innerHTML = `
            <div class="day-activity-header">
                <div>
                    <div class="day-activity-title">${activity.title}</div>
                    <div class="day-activity-subject">${activity.subject}</div>
                </div>
                <div class="day-activity-status ${activity.status}">
                    ${getStatusText(activity.status)}
                </div>
            </div>
            <div class="day-activity-description">${activity.description}</div>
            <div class="day-activity-time">
                <span class="material-symbols-outlined">schedule</span>
                ${activity.dueTime}
            </div>
            ${activity.grade ? `<div class="day-activity-grade">Nota: ${activity.grade}</div>` : ''}
        `;
        
        card.addEventListener('click', () => showActivityDetails(activity));
        return card;
    }

    function renderNotifications() {
        const upcomingActivities = activities.filter(activity => {
            if (activity.status !== 'pendente') return false;
            
            const dueDate = parseLocalDate(activity.dueDate);
            const diffTime = dueDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays >= 0 && diffDays <= 3;
        });
        
        notificationsList.innerHTML = '';
        
        upcomingActivities.forEach(activity => {
            const dueDate = parseLocalDate(activity.dueDate);
            const diffTime = dueDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let notificationType = 'info';
            let message = '';
            
            if (diffDays === 0) {
                notificationType = 'urgent';
                message = 'Vence hoje!';
            } else if (diffDays === 1) {
                notificationType = 'warning';
                message = 'Vence amanhã';
            } else {
                notificationType = 'info';
                message = `Vence em ${diffDays} dias`;
            }
            
            const notification = document.createElement('div');
            notification.className = `notification-card ${notificationType}`;
            notification.innerHTML = `
                <span class="material-symbols-outlined notification-icon">
                    ${notificationType === 'urgent' ? 'notification_important' : 'notifications'}
                </span>
                <div class="notification-content">
                    <div class="notification-title">${activity.title}</div>
                    <div class="notification-description">${activity.subject} - ${message}</div>
                </div>
                <button class="btn-view" onclick="window.location.href='atividade-status.html?id=${activity.id}'">
                    Ver atividade
                </button>
            `;
            
            notificationsList.appendChild(notification);
        });
        
        if (upcomingActivities.length === 0) {
            notificationsList.innerHTML = '<p>Nenhuma atividade com prazo próximo.</p>';
        }
    }

    function showActivityDetails(activity) {
        const formattedDate = formatDate(activity.dueDate);
        
        activityDetailContent.innerHTML = `
            <div class="activity-detail">
                <div class="activity-detail-header">
                    <h3>${activity.title}</h3>
                    <span class="activity-status ${activity.status}">${getStatusText(activity.status)}</span>
                </div>
                <div class="activity-detail-info">
                    <p><strong>Matéria:</strong> <span>${activity.subject}</span></p>
                    <p><strong>Prazo:</strong> <span>${formattedDate} às ${activity.dueTime}</span></p>
                    <p><strong>Descrição:</strong> <span>${activity.description}</span></p>
                    ${activity.grade ? `<p><strong>Nota:</strong> <span>${activity.grade}</span></p>` : ''}
                </div>
                <div class="activity-detail-actions">
                    <button class="btn-primary" onclick="window.location.href='atividade-status.html?id=${activity.id}'">
                        <span class="material-symbols-outlined">visibility</span>
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
        activityDetailPopup.style.display = 'flex';
    }

    // Funções auxiliares
    function getMonthName(month) {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return months[month];
    }

    function isToday(date) {
        return isSameDay(date, today);
    }

    function isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    function getStatusText(status) {
        const statusTexts = {
            'pendente': 'Pendente',
            'concluida': 'Concluída',
            'avaliada': 'Avaliada'
        };
        return statusTexts[status] || status;
    }

    function formatDate(dateString) {
        const date = parseLocalDate(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
});