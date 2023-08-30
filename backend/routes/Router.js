const express = require("express")
const router = express()


//testando as rotas
router.get("/", (req, res) => {
res.send("Api Working !");

});

module.exports = router;