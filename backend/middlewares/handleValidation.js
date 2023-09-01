/*essa classe define um middleware de validação que é utilizado
 em rotas da sua aplicação Node.js.
 Ele trabalha em conjunto com a biblioteca express-validator 
 para verificar os dados enviados nas requisições. */

 const { validationResult } = require("express-validator");

 const validate = (req, res, next) => {
   const errors = validationResult(req);
 
   if (errors.isEmpty()) {
     return next();
   }
 
   const extractedErrors = [];
 
   errors.array().map((err) => extractedErrors.push(err.msg));
 
   return res.status(422).json({
     errors: extractedErrors,
   });
 };
 
 module.exports = validate;
 