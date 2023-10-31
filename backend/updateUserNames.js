const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const Photo = require("../model/Photo");
const User = require("../model/User");

async function updatePhotoUserNames() {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.sbyitcj.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Conectou ao banco de dados!");

    const photos = await Photo.find();

    for (const photo of photos) {
      const user = await User.findById(photo.userId);
      if (user) {
        photo.userName = user.name;
        await photo.save();
      }
    }

    console.log("Nomes de usuário atualizados com sucesso nas fotos.");
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar os nomes de usuário nas fotos:", error);
  } finally {
    mongoose.connection.close();
  }
}

updatePhotoUserNames();
