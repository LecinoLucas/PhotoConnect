const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    timestamps: true, //dois campos serao criados no meu model para data e hora
  }
);

User = mongoose.model("User", userSchema);

module.exports = User;