const express = require("express");
const router = express.Router();

// Controller
const {register} = require("../controllers/UserController"); //obj foi exportado e desistriturado aqui

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation } = require("../middlewares/userValidation");


//ROUTES
router.post("/register", userCreateValidation(), validate, register);

module.exports = router; 