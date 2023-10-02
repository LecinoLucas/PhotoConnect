const multer = require("multer"); // Biblioteca para lidar com imagens
const path = require("path");

// Configuração de armazenamento de imagens
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `uploads/${folder}/`); // Configura o destino da imagem
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Configura o nome da foto para evitar conflitos
  },
});

// Middleware para upload de imagem com validação de tipo de arquivo
const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Aceita apenas formatos PNG e JPG
      const error = new Error("Por favor, envie apenas imagens PNG ou JPG!");
      error.code = "FILE_TYPE_ERROR"; // Código personalizado para identificar o tipo de erro
      return cb(error, false);
    }
    cb(null, true);
  },
});

module.exports = { imageUpload };
