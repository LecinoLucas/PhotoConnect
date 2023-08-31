/*esse código lida com o upload de imagens 
usando a biblioteca multer em uma aplicação Node.js.*/

const multer = require("multer"); //bliblioteca para lidar com imagens
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `uploads/${folder}/`); //aqui configura o destino da imagem
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //aqui config o nome da foto, para nao misturar
  },
});

const imageUpload = multer({ //validação da imagem
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
