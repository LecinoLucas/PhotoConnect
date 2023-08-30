const mongoose = require("mongoose");
const { schema } = mongoose;

const photoSchema = new Schema(
  {  //aqui penso sempre na regra do negocio
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    username: String,
  },
  {
    timestamps: true,
  }
);

Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
