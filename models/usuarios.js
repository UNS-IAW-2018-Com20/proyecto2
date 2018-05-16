const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  twitterId: String,
  darkTheme: Boolean,
  tipo: String,

});



/*Crea una tabla en la base de datos*/ /*Modelos*/
const usuarios = mongoose.model('usuarios',userSchema);

module.exports.usuarios= usuarios;
