const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("image").custom((value, { req }) => { //recurso para ver se o arquivo e uma imagem
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
  return [
    body("comment")
      .not()
      .isEmpty()
      .withMessage("O comentário não pode estar vazio")
      .isString()
      .withMessage("O comentário é obrigatório e deve ser uma string"),
  ];
};


module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
