const mongoose = require('mongoose');

mongoose.connect("mongodb://admin:sudo@ds115350.mlab.com:15350/sistema-evaluaciones");

const usersSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  twitterId: String,
  tema: Number,
  tipo: String

});

/*Crea una tabla en la base de datos*/ /*Modelos*/
const Usuarios = mongoose.model('Usuarios',usersSchema);

module.exports.Usuarios= Usuarios;
