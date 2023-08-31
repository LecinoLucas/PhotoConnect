const Photo = require("../model/Photo");
const User = require("../model/User");

const mongoose = require("mongoose");

//inserção de uma foto 
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;
  
    console.log(req.body);
  
    const reqUser = req.user;
  
    const user = await User.findById(reqUser._id); //BUSCANDO NA MINHA REQUISIÇÃO
  
    console.log(user.name);
  
    // Create photo
    const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
    });
  
    // VERIFICANDO SE A FOTO FOI CRIADO 
    if (!newPhoto) { //SE NAO TEVE NENHUM ERRO
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }
  
    res.status(201).json(newPhoto);
  };

  // Remove a photo from the DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

 try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }
  
    await Photo.findByIdAndDelete(photo._id);
  
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
    
 } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
 }
};

// Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
      .sort([["createdAt", -1]])  // sort by QUE ORDENA PELOS CRIADOS PARA OS MAIS NOVOS
      .exec(); //EXECUTAR ESSA "QUERY"
  
    return res.status(200).json(photos);
  };

  // Get user photos
const getUserPhotos = async (req, res) => {
    const { id } = req.params; /*/com isso pego id da url nao da requisicao,
     porque o meu usuario pode pesquisar foto de qualquer usuario*/
  
    const photos = await Photo.find({ userId: id })
      .sort([["createdAt", -1]])
      .exec();
  
    return res.status(200).json(photos);
  };
  
  // Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  res.status(200).json(photo);
};

// Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
};