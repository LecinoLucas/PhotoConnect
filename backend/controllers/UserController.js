const User = require("../model/User")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtScreet = process.env.JWT_SECRET;

//geração do jwt token

const generateToken = (id) => {
    return jwt.sign({id}, jwtScreet, {
      expiresIn: "7d",
    });
  };

//registrar user sign token
//poderia criar um monte de if para validar os registros mas vou usar o express
// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Generate password hash com a bliblioteca bcrypt
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // chega se new user e falso e cria o usuario e return um token
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

module.exports = {
    register,
}; 