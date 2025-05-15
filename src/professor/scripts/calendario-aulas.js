document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM frequentemente usados
    const disciplinasInput = document.getElementById('disciplinas');
    
    // Mostrar data atual
    function mostrarDataAtual() {
        const spanHoje = document.getElementById('hoje');
        if (spanHoje) {
            const data = new Date();
            const dataFormatada = `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
            spanHoje.textContent = dataFormatada;
        }
    }
    mostrarDataAtual();
    
   
    // Verificar tamanho da janela
    function checkWindowSize() {
        if (window.innerWidth <= 768) {
            if (sidebar) sidebar.classList.remove("active");
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    
    // Função para normalizar texto (remover acentos)
    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    
    // Animação para eventos e links
    function animateElement(element, isVisible) {
        if (!element) return;
        
        // Limpar classes anteriores
        element.classList.remove('filtered-in', 'filtered-out');
        
        if (isVisible) {
            // Mostrar com animação de entrada
            element.style.display = 'block';
            element.classList.add('filtered-in');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        } else {
            // Esconder com animação de saída
            element.classList.add('filtered-out');
            element.style.opacity = '0';
            element.style.transform = 'translateY(5px)';
            
            // Ocultar após animação
            setTimeout(() => {
                if (element.classList.contains('filtered-out')) {
                    element.style.display = 'none';
                }
            }, 300);
        }
    }
    
    // Filtro de disciplinas com animação
    if (disciplinasInput) {
        disciplinasInput.addEventListener('input', function() {
            const filtro = normalizarTexto(this.value.trim());
            const eventos = document.querySelectorAll('.calendar-event');
            
            eventos.forEach(evento => {
                const textoEvento = normalizarTexto(evento.textContent);
                const verPlano = evento.nextElementSibling;
                const matchesFilter = filtro === '' || textoEvento.includes(filtro);
                
                // Aplicar animação ao evento e seu link de plano de aula
                animateElement(evento, matchesFilter);
                if (verPlano && verPlano.classList.contains('view-plan')) {
                    animateElement(verPlano, matchesFilter);
                }
            });
        });
        
        // Adicionar evento para quando o campo perde o foco e está vazio
        disciplinasInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                const eventos = document.querySelectorAll('.calendar-event');
                
                eventos.forEach(evento => {
                    const verPlano = evento.nextElementSibling;
                    
                    // Restaurar visibilidade com animação
                    animateElement(evento, true);
                    if (verPlano && verPlano.classList.contains('view-plan')) {
                        animateElement(verPlano, true);
                    }
                });
            }
        });
        
        // Adicionar evento para a tecla Escape e para quando o campo é limpo
        disciplinasInput.addEventListener('keyup', function(e) {
            if (e.key === 'Escape' || this.value.trim() === '') {
                this.value = '';  // Limpar campo ao pressionar Escape
                
                // Reexibir todos os eventos com animação
                const eventos = document.querySelectorAll('.calendar-event');
                eventos.forEach(evento => {
                    const verPlano = evento.nextElementSibling;
                    
                    // Restaurar visibilidade com animação
                    animateElement(evento, true);
                    if (verPlano && verPlano.classList.contains('view-plan')) {
                        animateElement(verPlano, true);
                    }
                });
            }
        });
    }
});