const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    const isPDF = file.mimetype === 'application/pdf'; // Verifica o tipo PDF

    if (extname && mimetype && !isPDF) {
      return cb(null, true);
    } else {
      const error = new Error("Por favor, envie apenas imagens PNG, JPG ou JPEG!");
      error.code = "FILE_TYPE_ERROR";
      return cb(error, false);
    }
  },
});

module.exports = { imageUpload };
