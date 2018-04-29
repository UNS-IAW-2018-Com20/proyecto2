const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/datos");

const usersSchema = new mongoose.Schema({
  

  nombre: String,
  apellido: String,
  email: String,
  password:String

});

/*Crea una tabla en la base de datos*/ /*Modelos*/
var Usuarios = mongoose.model('Usuarios',usersSchema);

module.exports.Usuarios= Usuarios; 