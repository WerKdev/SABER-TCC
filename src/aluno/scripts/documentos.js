document.addEventListener('DOMContentLoaded', function() {
    // Função para baixar boletim em PDF
    const btnBaixarBoletim = document.getElementById('btnBaixarBoletim');
    if (btnBaixarBoletim) {
        btnBaixarBoletim.addEventListener('click', function () {
            const loadingDiv = document.getElementById('loadingDiv');
            if (loadingDiv) {
                loadingDiv.style.display = 'block';

                setTimeout(function () {
                    const boletim = document.getElementById('boletimNotas'); // CAPTURA O BOLETIM VISÍVEL
                    
                    if (boletim && window.html2canvas && window.jspdf) {
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
                    } else {
                        loadingDiv.style.display = 'none';
                        alert('Função de PDF não disponível');
                    }
                }, 1000);
            }
        });
    }

    // Função para ver boletim completo
    const btnVerBoletimCompleto = document.getElementById('btnVerBoletimCompleto');
    if (btnVerBoletimCompleto) {
        btnVerBoletimCompleto.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('modalBoletimCompleto');
            if (modal) {
                modal.style.display = 'block';
            }
        });
    }

    // Fechar modal
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            const modal = document.getElementById('modalBoletimCompleto');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modalBoletimCompleto');
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ===== PRESERVAÇÃO DAS ANIMAÇÕES DO MENU =====
    // Função para preservar as animações do sidebar
    function preserveSidebarAnimations() {
        const sidebar = document.getElementById('sidebar');
        const main = document.querySelector('.main');
        
        if (sidebar && main) {
            // Garantir que as classes de transição não sejam removidas
            const preserveTransitions = () => {
                // Reforçar as transições se necessário
                const menuTexts = sidebar.querySelectorAll('.navbar p');
                const menuTitle = sidebar.querySelector('#menu-tittle');
                const menuLogo = sidebar.querySelector('#logomenu');
                
                // Garantir que os elementos do menu mantenham suas transições
                menuTexts.forEach(text => {
                    if (!text.style.transition || text.style.transition === 'none') {
                        text.style.transition = 'opacity 0.3s ease';
                    }
                });
                
                if (menuTitle && (!menuTitle.style.transition || menuTitle.style.transition === 'none')) {
                    menuTitle.style.transition = 'opacity 0.3s ease';
                }
                
                if (menuLogo && (!menuLogo.style.transition || menuLogo.style.transition === 'none')) {
                    menuLogo.style.transition = 'opacity 0.3s ease';
                }
            };
            
            // Observer para detectar mudanças na classe do sidebar SEM interferir
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        // Não interferir com as animações, apenas disparar resize se necessário
                        setTimeout(() => {
                            // Preservar as transições após mudanças
                            preserveTransitions();
                            // Disparar evento de resize para reajustar elementos responsivos
                            window.dispatchEvent(new Event('resize'));
                        }, 50); // Delay menor para não interferir
                    }
                });
            });

            // Observar mudanças na classe do sidebar
            observer.observe(sidebar, {
                attributes: true,
                attributeFilter: ['class']
            });
            
            // Aplicar preservação inicial
            preserveTransitions();
        }
    }

    // Inicializar a preservação das animações do menu
    preserveSidebarAnimations();

    // Função para otimizar a responsividade em dispositivos móveis
    function optimizeMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        const main = document.querySelector('.main');
        
        if (isMobile && main) {
            main.classList.add('mobile-layout');
        } else if (main) {
            main.classList.remove('mobile-layout');
        }
    }

    // Executar no carregamento e no redimensionamento
    optimizeMobileLayout();
    window.addEventListener('resize', optimizeMobileLayout);

    // Função para baixar comprovante (simulação)
    const btnBaixarComprovante = document.getElementById('btnBaixarComprovante');
    if (btnBaixarComprovante) {
        btnBaixarComprovante.addEventListener('click', function() {
            const loadingDiv = document.getElementById('loadingDiv');
            if (loadingDiv) {
                loadingDiv.style.display = 'block';
                
                setTimeout(() => {
                    loadingDiv.style.display = 'none';
                    alert('Comprovante de matrícula baixado com sucesso!');
                }, 2000);
            }
        });
    }

    // Melhorar a experiência de scroll em modais
    const modal = document.getElementById('modalBoletimCompleto');
    if (modal) {
        modal.addEventListener('scroll', function() {
            // Lazy loading ou outros otimizações podem ser adicionadas aqui
        });
    }

    // Função para melhorar a performance em telas pequenas
    function optimizeForSmallScreens() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            if (window.innerWidth <= 576) {
                // Adicionar scroll horizontal em tabelas para telas muito pequenas
                if (!table.parentElement.classList.contains('table-responsive')) {
                    const wrapper = document.createElement('div');
                    wrapper.style.overflowX = 'auto';
                    wrapper.style.marginBottom = '1rem';
                    wrapper.classList.add('table-responsive');
                    
                    table.parentElement.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            }
        });
    }

    // Executar otimizações
    optimizeForSmallScreens();
    window.addEventListener('resize', optimizeForSmallScreens);

    console.log('Documentos page loaded with responsive features and preserved menu animations');
});