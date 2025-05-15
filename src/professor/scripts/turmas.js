document.addEventListener('DOMContentLoaded', function() {
    console.log('Script turmas.js carregado!');
    
    initFilterSystem();
    initWindowResizeHandler();  // Esta função é chamada mas não está definida no código
    initCardClickHandlers();    
});

function initCardClickHandlers() {
    console.log('Inicializando handlers de clique para cards');
    const salaCards = document.querySelectorAll('.sala-card');
    
    console.log('Número de cards encontrados:', salaCards.length);
    
    salaCards.forEach(function(card) {
        card.addEventListener('click', function() {
            console.log('Card clicado, redirecionando...');
            window.location.href = "turmas-status.html";
        });
    });
}

function initFilterSystem() {
    const searchInput = document.querySelector('#search-sala');
    const anoSelect = document.querySelector('#Série');
    const turmaSelect = document.querySelector('#Turma');
    const salaCards = document.querySelectorAll('.sala-card');
    
    if (!searchInput || !anoSelect || !turmaSelect || salaCards.length === 0) return;
    
    function filtrarSalas() {
        const searchTerm = searchInput.value.toLowerCase();
        const anoSelecionado = anoSelect.value;
        const turmaSelecionada = turmaSelect.value;
        
        salaCards.forEach(card => {
            const tituloSala = card.querySelector('.sala-header').textContent.toLowerCase();
            
            // Extração de informações da sala a partir do título
            // Exemplo de formato: "SALA XXX - 3º A - IFTP"
            const match = tituloSala.match(/(\d+)º\s+([a-z])/i);
            const anoCard = match ? match[1] : '';
            const turmaCard = match ? match[2].toUpperCase() : '';
            
            const passaPesquisa = searchTerm === '' || tituloSala.includes(searchTerm);
            const passaAno = anoSelecionado === '' || anoSelecionado === 'none' || anoSelecionado === anoCard;
            const passaTurma = turmaSelecionada === '' || turmaSelecionada === 'none' || turmaSelecionada === turmaCard;
            
            if (passaPesquisa && passaAno && passaTurma) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filtrarSalas);
    anoSelect.addEventListener('change', filtrarSalas);
    turmaSelect.addEventListener('change', filtrarSalas);
}

// Definição da função initWindowResizeHandler mencionada no início mas não implementada
function initWindowResizeHandler() {
    // Implementação básica para evitar erros
    window.addEventListener('resize', function() {
        console.log('Janela redimensionada');
        // Adicione aqui qualquer lógica necessária para redimensionamento
    });
}document.addEventListener('DOMContentLoaded', function() {
    console.log('Script turmas.js carregado!');
    
    initFilterSystem();
    initWindowResizeHandler();  // Esta função é chamada mas não está definida no código
    initCardClickHandlers();    
});

function initCardClickHandlers() {
    console.log('Inicializando handlers de clique para cards');
    const salaCards = document.querySelectorAll('.sala-card');
    
    console.log('Número de cards encontrados:', salaCards.length);
    
    salaCards.forEach(function(card) {
        card.addEventListener('click', function() {
            console.log('Card clicado, redirecionando...');
            window.location.href = "turmas-status.html";
        });
    });
}

function initFilterSystem() {
    const searchInput = document.querySelector('#search-sala');
    const anoSelect = document.querySelector('#Série');
    const turmaSelect = document.querySelector('#Turma');
    const salaCards = document.querySelectorAll('.sala-card');
    
    if (!searchInput || !anoSelect || !turmaSelect || salaCards.length === 0) return;
    
    function filtrarSalas() {
        const searchTerm = searchInput.value.toLowerCase();
        const anoSelecionado = anoSelect.value;
        const turmaSelecionada = turmaSelect.value;
        
        salaCards.forEach(card => {
            const tituloSala = card.querySelector('.sala-header').textContent.toLowerCase();
            
            // Extração de informações da sala a partir do título
            // Exemplo de formato: "SALA XXX - 3º A - IFTP"
            const match = tituloSala.match(/(\d+)º\s+([a-z])/i);
            const anoCard = match ? match[1] : '';
            const turmaCard = match ? match[2].toUpperCase() : '';
            
            const passaPesquisa = searchTerm === '' || tituloSala.includes(searchTerm);
            const passaAno = anoSelecionado === '' || anoSelecionado === 'none' || anoSelecionado === anoCard;
            const passaTurma = turmaSelecionada === '' || turmaSelecionada === 'none' || turmaSelecionada === turmaCard;
            
            if (passaPesquisa && passaAno && passaTurma) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filtrarSalas);
    anoSelect.addEventListener('change', filtrarSalas);
    turmaSelect.addEventListener('change', filtrarSalas);
}

// Definição da função initWindowResizeHandler mencionada no início mas não implementada
function initWindowResizeHandler() {
    // Implementação básica para evitar erros
    window.addEventListener('resize', function() {
        console.log('Janela redimensionada');
        // Adicione aqui qualquer lógica necessária para redimensionamento
    });
}