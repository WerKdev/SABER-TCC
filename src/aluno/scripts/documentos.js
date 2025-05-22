document.addEventListener('DOMContentLoaded', function() {
    // Função para baixar boletim em PDF     )
    document.getElementById('btnBaixarBoletim').addEventListener('click', function () {
        const loadingDiv = document.getElementById('loadingDiv');
        loadingDiv.style.display = 'block';

        setTimeout(function () {
            const boletim = document.getElementById('boletimNotas'); // CAPTURA O BOLETIM VISÍVEL

            html2canvas(boletim, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = pageWidth;
                const imgHeight = canvas.height * imgWidth / canvas.width;

                let position = 0;

                if (imgHeight <= pageHeight) {
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                } else {
                    let remainingHeight = imgHeight;
                    while (remainingHeight > 0) {
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        remainingHeight -= pageHeight;
                        position -= pageHeight;

                        if (remainingHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }

                pdf.save('Boletim-Escolar.pdf');
                loadingDiv.style.display = 'none';
            });
        }, 1000);
    });

    // Função para ver boletim completo
    document.getElementById('btnVerBoletimCompleto').addEventListener('click', function(e) {
        e.preventDefault();
        const modal = document.getElementById('modalBoletimCompleto');
        modal.style.display = 'block';
    });

    // Fechar modal
    document.getElementById('closeModal').addEventListener('click', function() {
        const modal = document.getElementById('modalBoletimCompleto');
        modal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modalBoletimCompleto');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
