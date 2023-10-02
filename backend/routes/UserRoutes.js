const express = require("express");
const router = express.Router();

/*essa classe define as rotas para o gerenciamento de usuários em uma aplicação Express.js.
 Ela utiliza diversos middlewares para realizar validações, 
 autenticação e controle de acesso. */


// Controller
const {
      register,
      login,
      getCurrentUser,
      update,
      getUserById,
} = require("../controllers/UserController"); //obj foi exportado e desestruturado aqui

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation,userUpdateValidation } = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//ROUTES
router.post("/register", userCreateValidation(), validate, register);
router.get("/profiles", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
      "/",
      authGuard,
      userUpdateValidation(),
      validate,
      imageUpload.single("profileImage"),
      update
    );
    router.get("/:id",getUserById)

module.exports = router; 