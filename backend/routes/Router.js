const express = require("express")
const router = express()

router.use("/api/users", require("./UserRoutes"));

//testando as rotas
router.get("/", (req, res) => {
res.send("Api Working !");

});

module.exports = router;