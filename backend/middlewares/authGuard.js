const User = require("../model/User");

/*/Essa classe é um middleware de autenticação para uma aplicação Node.js.
 Ela é responsável por proteger rotas específicas,
  garantindo que apenas usuários autenticados com tokens JWT válidos possam acessá-las. 
 está uma visão geral do que cada parte do código faz*/

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => { //validação to token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findById(verified.id).select("-password");

    next();
  } catch (err) {
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

module.exports = authGuard;
