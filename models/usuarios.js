const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  twitterId: String,
  darkTheme: Boolean,
  tipo: String,
  id: Number

});

const alumnoSchema = new mongoose.Schema({
  _id: Number,
  apellido: String,
  nombre: String,
  lu: Number
})

/*Crea una tabla en la base de datos*/ /*Modelos*/
const usuarios = mongoose.model('usuarios',userSchema);
const alumnos = mongoose.model('alumnos',alumnoSchema);

module.exports.usuarios= usuarios;
module.exports.alumnos= alumnos;
