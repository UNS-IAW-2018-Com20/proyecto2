const mongoose = require('mongoose');

const evaluacionesSchema = new mongoose.Schema({
  _id: Number,
  nombre: String,
  fecha: String,
  escala_notas: Number,
  evaluacion_tipo: Number,
  descripcion: String,
  publicada: Boolean
});

/*Crea una tabla en la base de datos*/ /*Modelos*/
const evaluaciones = mongoose.model('evaluaciones',evaluacionesSchema);

module.exports.evaluaciones = evaluaciones;
