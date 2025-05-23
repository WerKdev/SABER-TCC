// =========== PERFIL.JS - Sistema de Gestão do Perfil do Aluno ===========

document.addEventListener('DOMContentLoaded', function() {
    initializeProfileSystem();
});

function initializeProfileSystem() {
    setupTabNavigation();
    setupProfileInteractions();
    setupDocumentActions();
    setupUploadSystem();
    setupNotifications();
}

// =========== NAVEGAÇÃO POR ABAS ===========
function setupTabNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// =========== INTERAÇÕES DO PERFIL ===========
function setupProfileInteractions() {
    // Avatar upload functionality
    const avatarContainer = document.querySelector('.avatar-container');
    const avatarUpload = document.querySelector('.avatar-upload');
    
    if (avatarContainer && avatarUpload) {
        avatarContainer.addEventListener('click', function() {
            createFileInput('image/*', handleAvatarUpload);
        });
    }

    // Edit profile button
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            toggleEditMode();
        });
    }

    // Info items editing (double-click to edit)
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('dblclick', function() {
            makeInfoItemEditable(this);
        });
    });
}

// =========== SISTEMA DE UPLOAD ===========
function setupUploadSystem() {
    const uploadPopup = document.getElementById('upload-popup');
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    
    if (uploadArea && fileInput) {
        // Click to select file
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--azul-padrao)';
            this.style.backgroundColor = 'rgba(12, 20, 43, 0.1)';
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'transparent';
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.backgroundColor = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });

        // File input change
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
    }

    // Upload popup controls
    if (uploadPopup) {
        const cancelBtn = uploadPopup.querySelector('.btn-cancel');
        const confirmBtn = uploadPopup.querySelector('.btn-confirm');
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                closeUploadPopup();
            });
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                processFileUpload();
            });
        }
    }
}

// =========== AÇÕES DE DOCUMENTOS ===========
function setupDocumentActions() {
    // Download buttons
    const downloadBtns = document.querySelectorAll('.btn-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const documentItem = this.closest('.document-item');
                const documentName = documentItem.querySelector('.document-name').textContent;
                handleDocumentDownload(documentName);
            }
        });
    });

    // Upload buttons
    const uploadBtns = document.querySelectorAll('.btn-upload');
    uploadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const documentItem = this.closest('.document-item');
            const documentName = documentItem.querySelector('.document-name').textContent;
            openUploadPopup(documentName);
        });
    });
}

// =========== NOTIFICAÇÕES ===========
function setupNotifications() {
    // Mark notifications as read when clicked
    const notificationCards = document.querySelectorAll('.notification-card');
    notificationCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// =========== UTILITY FUNCTIONS ===========

function createFileInput(accept, callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = function() {
        if (this.files.length > 0) {
            callback(this.files[0]);
        }
    };
    input.click();
}

function handleAvatarUpload(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarContainer = document.querySelector('.avatar-container');
            if (avatarContainer) {
                avatarContainer.style.backgroundImage = `url(${e.target.result})`;
                avatarContainer.style.backgroundSize = 'cover';
                avatarContainer.style.backgroundPosition = 'center';
                avatarContainer.innerHTML = '<div class="avatar-upload"><span class="material-symbols-outlined">camera_alt</span></div>';
            }
            showToast('Foto de perfil atualizada com sucesso!');
        };
        reader.readAsDataURL(file);
    } else {
        showToast('Por favor, selecione um arquivo de imagem válido.', 'error');
    }
}

function toggleEditMode() {
    const isEditing = document.body.classList.contains('editing-mode');
    
    if (isEditing) {
        // Save changes and exit edit mode
        saveProfileChanges();
        document.body.classList.remove('editing-mode');
        document.getElementById('edit-profile-btn').innerHTML = 
            '<span class="material-symbols-outlined">edit</span>Editar Perfil';
    } else {
        // Enter edit mode
        document.body.classList.add('editing-mode');
        document.getElementById('edit-profile-btn').innerHTML = 
            '<span class="material-symbols-outlined">save</span>Salvar Alterações';
        showToast('Modo de edição ativado. Clique duplo nos campos para editar.');
    }
}

function makeInfoItemEditable(infoItem) {
    if (!document.body.classList.contains('editing-mode')) {
        showToast('Ative o modo de edição primeiro.');
        return;
    }

    const valueSpan = infoItem.querySelector('span:last-child');
    if (!valueSpan || valueSpan.classList.contains('highlight')) return;

    const currentValue = valueSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.style.width = '100%';
    input.style.padding = '4px 8px';
    input.style.border = '1px solid var(--azul-padrao)';
    input.style.borderRadius = '4px';
    input.style.fontSize = 'inherit';
    input.style.fontFamily = 'inherit';

    input.addEventListener('blur', function() {
        valueSpan.textContent = this.value;
        valueSpan.style.display = 'inline';
        this.remove();
    });

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });

    valueSpan.style.display = 'none';
    infoItem.appendChild(input);
    input.focus();
    input.select();
}

function saveProfileChanges() {
    // Simulate saving changes
    showToast('Alterações salvas com sucesso!');
    
    // Here you would typically send the data to the server
    console.log('Saving profile changes...');
}

function handleDocumentDownload(documentName) {
    showToast(`Baixando ${documentName}...`);
    
    // Simulate download
    setTimeout(() => {
        showToast(`${documentName} baixado com sucesso!`);
    }, 1500);
}

function openUploadPopup(documentName) {
    const popup = document.getElementById('upload-popup');
    if (popup) {
        popup.style.display = 'flex';
        popup.querySelector('.popup-description').textContent = 
            `Fazer upload do documento: ${documentName}`;
    }
}

function closeUploadPopup() {
    const popup = document.getElementById('upload-popup');
    if (popup) {
        popup.style.display = 'none';
        // Reset file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    }
}

function handleFileUpload(file) {
    const uploadArea = document.querySelector('.upload-area p');
    if (uploadArea) {
        uploadArea.textContent = `Arquivo selecionado: ${file.name}`;
    }
}

function processFileUpload() {
    const fileInput = document.getElementById('file-upload');
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        showToast(`Enviando ${file.name}...`);
        
        // Simulate upload process
        setTimeout(() => {
            showToast('Documento enviado com sucesso!');
            closeUploadPopup();
            
            // Update document status
            updateDocumentStatus(file.name);
        }, 2000);
    } else {
        showToast('Por favor, selecione um arquivo primeiro.', 'error');
    }
}

function updateDocumentStatus(fileName) {
    // Find and update the document status
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        const statusElement = item.querySelector('.document-status.pending');
        if (statusElement) {
            statusElement.textContent = 'Verificado';
            statusElement.className = 'document-status verified';
            
            const uploadBtn = item.querySelector('.btn-upload');
            if (uploadBtn) {
                uploadBtn.className = 'btn-download';
                uploadBtn.innerHTML = '<span class="material-symbols-outlined">download</span>';
            }
        }
    });
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    if (type === 'error') {
        toast.style.backgroundColor = '#ef4444';
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#f59e0b';
    }

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// =========== CLOSE POPUP EVENTS ===========
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-popup')) {
        const popup = e.target.closest('.popup-overlay');
        if (popup) {
            popup.style.display = 'none';
        }
    }
    
    if (e.target.classList.contains('popup-overlay')) {
        e.target.style.display = 'none';
    }
});

// =========== KEYBOARD SHORTCUTS ===========
document.addEventListener('keydown', function(e) {
    // ESC to close popups
    if (e.key === 'Escape') {
        const openPopup = document.querySelector('.popup-overlay[style*="flex"]');
        if (openPopup) {
            openPopup.style.display = 'none';
        }
    }
    
    // Ctrl+E to toggle edit mode
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        toggleEditMode();
    }
});

// =========== LOADING ANIMATION ===========
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner">
            <span class="material-symbols-outlined spinning">refresh</span>
            <p>Carregando...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// =========== AUTO-SAVE FUNCTIONALITY ===========
let autoSaveTimeout;
function scheduleAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        if (document.body.classList.contains('editing-mode')) {
            saveProfileChanges();
        }
    }, 5000); // Auto-save after 5 seconds of inactivity
}

// Add auto-save to input events
document.addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT' && document.body.classList.contains('editing-mode')) {
        scheduleAutoSave();
    }
});

// =========== RESPONSIVE BEHAVIOR ===========
function handleResponsiveChanges() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Simplify tabs for mobile
        const tabItems = document.querySelectorAll('.tab-item');
        tabItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                link.textContent = link.textContent.split(' ')[0]; // Show only first word
            }
        });
    }
}

window.addEventListener('resize', handleResponsiveChanges);
handleResponsiveChanges(); // Call on load