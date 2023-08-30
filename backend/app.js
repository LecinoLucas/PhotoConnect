require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();


// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//solve CORS trabalhar com as reqquisições
app.use(cors({ credentials: true, origin : "http://localhost:3000"}));

//Uplould diretorio 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//banco de dados
require("./config/db.js")

//rotas
const router = require("./routes/Router")

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);

});