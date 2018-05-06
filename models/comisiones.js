const mongoose = require('mongoose');

const comisiones_integrantesSchema = new mongoose.Schema({
  comision: Number,
  alumno: Number

});

const evaluaciones_comisionesSchema = new mongoose.Schema({
  comision: Number,
  evaluacion: Number,
  evaluador: Number,
  nota: String,
  observaciones: String,
  evaluacion_completa: Boolean
})

/*Crea una tabla en la base de datos*/ /*Modelos*/
const comisiones_integrantes = mongoose.model('comisiones_integrantes',comisiones_integrantesSchema);
const evaluaciones_comisiones = mongoose.model('evaluaciones_comisiones',evaluaciones_comisionesSchema);

module.exports.evaluaciones_comisiones= evaluaciones_comisiones;
module.exports.comisiones_integrantes= comisiones_integrantes;
