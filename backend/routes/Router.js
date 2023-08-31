/*este código cria um roteador que lida com diferentes partes da aplicação.
 Ele inclui rotas específicas de usuário definidas em UserRoutes.js 
 e uma rota de teste que responde com uma mensagem indicando que a API está funcionando. 
 Esse roteador pode ser usado para estruturar as rotas da sua aplicação de forma modular 
 e organizada.*/

const express = require("express")
const router = express()

router.use("/api/users", require("./UserRoutes"));

//testando as rotas
router.get("/", (req, res) => {
res.send("Api Working !");

});

module.exports = router;