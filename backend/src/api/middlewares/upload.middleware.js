// backend/src/api/middlewares/upload.middleware.js

const multer = require('multer');
const path = require('path');

// Configuração de armazenamento
const storage = multer.diskStorage({
  // Define a pasta onde os arquivos serão salvos
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Certifique-se de que a pasta 'uploads' exista na raiz do backend
  },
  // Define o nome do arquivo para evitar conflitos de nomes iguais
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro para aceitar apenas certos tipos de arquivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Erro: O tipo de arquivo não é suportado!');
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limite de 10MB por arquivo
  fileFilter: fileFilter
});

module.exports = upload;