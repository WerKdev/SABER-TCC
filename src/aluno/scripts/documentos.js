 
        document.addEventListener('DOMContentLoaded', function() {
            
            document.getElementById('btnBaixarBoletim').addEventListener('click', function() {
                alert('Iniciando download do boletim escolar...');
                setTimeout(function() {
                    alert('Download concluído com sucesso!');
                }, 1500);
            });
            
            
            document.getElementById('btnVerBoletimCompleto').addEventListener('click', function(e) {
                e.preventDefault();
                alert('Abrindo visualização do boletim completo...');
            });
            
            
            document.getElementById('btnBaixarComprovante').addEventListener('click', function() {
                alert('Iniciando download do comprovante de matrícula...');
                setTimeout(function() {
                    alert('Download concluído com sucesso!');
                }, 1500);
            });
        });
