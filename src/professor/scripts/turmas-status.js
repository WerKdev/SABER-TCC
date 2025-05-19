document.addEventListener("DOMContentLoaded", function() {
            
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    const turnoParam = urlParams.get('turno');

    if (dataParam) {
        const dataSelecionada = new Date(dataParam);
        if (!isNaN(dataSelecionada.getTime())) {
            // Data válida
            currentDate = dataSelecionada;
            selectedDate = new Date(dataSelecionada);
        }
    }

    if (turnoParam && (turnoParam === 'manha' || turnoParam === 'todos')) {
        currentFilter = turnoParam;
        currentTurno = turnoParam === 'todos' ? 'manha' : turnoParam;
        
        // Atualizar o select de filtro
        if (turnoFilter) {
            turnoFilter.value = turnoParam;
        }
    }
});