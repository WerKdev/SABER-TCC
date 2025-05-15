document.addEventListener("DOMContentLoaded", function() {

    // Funcionalidade para filtros
    const filtroAno = document.getElementById('ano');
    const filtroTrimestre = document.getElementById('trimestre');

    if (filtroAno) {
        filtroAno.addEventListener('change', function() {
            atualizarDados();
        });
    }

    if (filtroTrimestre) {
        filtroTrimestre.addEventListener('change', function() {
            atualizarDados();
        });
    }

    // Função para atualizar dados com base nos filtros
    function atualizarDados() {
        // Aqui você implementaria a lógica para atualizar os dados com base nos filtros selecionados
        // Por exemplo, fazendo uma requisição AJAX para obter os dados do servidor
        console.log('Atualizando dados...');
        console.log('Ano: ' + (filtroAno ? filtroAno.value : 'N/A'));
        console.log('Trimestre: ' + (filtroTrimestre ? filtroTrimestre.value : 'N/A'));
        
        // Simulação de atualização visual
        const cardValues = document.querySelectorAll('.card-value');
        cardValues.forEach(value => {
            const currentValue = parseFloat(value.textContent);
            // Simula uma pequena variação nos valores
            value.textContent = (currentValue + (Math.random() * 0.2 - 0.1)).toFixed(1);
        });
    }

    // Verificar tamanho da janela para ajustes responsivos
    function checkWindowSize() {
        if (window.innerWidth > 768) {
            if (sidebar.classList.contains("active")) {
                document.querySelector('.main').style.marginLeft = '15vw';
            } else {
                document.querySelector('.main').style.marginLeft = '70px';
            }
        } else {
            document.querySelector('.main').style.marginLeft = '0';
        }
    }

    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();

    // Funcionalidade para botão de relatório
    const reportButton = document.querySelector('.report-button');
    if (reportButton) {
        reportButton.addEventListener('click', function() {
            alert('Gerando relatório PDF...');
            // Aqui você implementaria a lógica para gerar o PDF
        });
    }

    // Destacar item ativo no menu
    const menuItems = document.querySelectorAll('.navbar a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});