document.addEventListener("DOMContentLoaded", function() {

    const attachBtn = document.querySelector('.attach-file-btn');
    const markCompleteBtn = document.querySelector('.mark-complete-btn');
    const fileUpload = document.getElementById('file-upload');
    const statusText = document.querySelector('.status');
    const sendQuestionBtn = document.querySelector('.send-question-btn');
    const questionTextarea = document.querySelector('.teacher-help textarea');

    attachBtn.addEventListener('click', function() {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
            attachBtn.innerHTML = `<span class="material-symbols-outlined">attach_file</span> ${this.files[0].name}`;
            statusText.textContent = 'Pronto para enviar';
            statusText.style.color = '#16a34a';
        }
    });

    markCompleteBtn.addEventListener('click', function() {
        if (fileUpload.files.length > 0) {
            statusText.textContent = 'Concluído';
            statusText.style.color = '#0c142b';
            this.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Concluído';
            this.style.backgroundColor = '#16a34a';
        } else {
            alert('Por favor, anexe um arquivo antes de marcar como concluído.');
        }
    });

    sendQuestionBtn.addEventListener('click', function() {
        if (questionTextarea.value.trim() !== '') {
            alert('Dúvida enviada ao professor com sucesso!');
            questionTextarea.value = '';
        } else {
            alert('Por favor, escreva sua dúvida antes de enviar.');
        }
    });

    function handleResponsive() {
        if (window.innerWidth > 768) {
            
            sidebar.classList.remove("active");
        } else {
            
            sidebar.classList.remove("active");
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});