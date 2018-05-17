const mongoose = require('mongoose');
const usuarios = require('../models/esquema');

const alumnoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  apellido: String,
  nombre: String,
  lu: Number,
  evaluaciones_comisiones: [{type: mongoose.Schema.Types.ObjectId, ref: 'evaluaciones_comisiones'}],
  usuario_id: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'}
});

const evaluadorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  apellido: String,
  nombre: String,
  evaluaciones_comisiones: [{type: mongoose.Schema.Types.ObjectId, ref: 'evaluaciones_comisiones'}],
  usuario_id: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'}
})

const evaluacionesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  fecha: String,
  escala_notas: Number,
  evaluacion_tipo: Number,
  descripcion: String,
  publicada: Boolean,
  criterios_evaluables: [{type: mongoose.Schema.Types.ObjectId, ref: 'criterios_evaluables'}],
});

const comisionSchema = new mongoose.Schema({
 nombre: String,
 miembros: [{type: mongoose.Schema.Types.ObjectId, ref: 'alumnos'}],
});

const criterios_evaluablesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  descripcion: String
});

const criterios_notasSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  criterios_evaluables: {type: mongoose.Schema.Types.ObjectId, ref: 'criterios_evaluables'},
  nota: Number,
  observaciones: String
});

const evaluaciones_comisionesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  comision: {type: mongoose.Schema.Types.ObjectId, ref: 'comisiones'},
  evaluacion: {type: mongoose.Schema.Types.ObjectId, ref: 'evaluaciones'},
  evaluador: Number,
  nota: String,
  observaciones: String,
  evaluacion_completa: Boolean,
  criterios_notas: [{type: mongoose.Schema.Types.ObjectId, ref: 'criterios_notas'}]
});


/*Crea una tabla en la base de datos*/ /*Modelos*/
const comisiones = mongoose.model('comisiones',comisionSchema);
const evaluaciones_comisiones = mongoose.model('evaluaciones_comisiones',evaluaciones_comisionesSchema);
const alumnos = mongoose.model('alumnos',alumnoSchema);
const evaluaciones = mongoose.model('evaluaciones',evaluacionesSchema);
const evaluadores = mongoose.model('evaluadores',evaluadorSchema);
const criterios_evaluables = mongoose.model('criterios_evaluables',criterios_evaluablesSchema);
const criterios_notas = mongoose.model('criterios_notas',criterios_notasSchema);

module.exports.alumnos= alumnos;
module.exports.evaluaciones_comisiones= evaluaciones_comisiones;
module.exports.comisiones= comisiones;
module.exports.evaluaciones = evaluaciones;
module.exports.evaluadores = evaluadores;
module.exports.criterios_notas = criterios_notas;
module.exports.criterios_evaluables = criterios_evaluables;
