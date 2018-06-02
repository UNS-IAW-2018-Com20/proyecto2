const mongoose = require('mongoose');
const usuarios = require('../models/esquema');
const FormatDate = mongoose.Schema.Types.FormateDate = require('../node_modules/mongoose-schema-formatdate/formatdate');

const alumnoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario_id: String,
  apellido: String,
  nombres: String,
  lu: String,
  evaluaciones_comisiones: [{
    comision_id: String,
    comision_nombre: String,
    evaluacion_id: String,
    evaluacion_nombre: String,
    fecha: {type: FormatDate, format: 'DD-MM-YYYY', default: Date.now},
    escala_notas: {
      descripcion: String,
      notas: [{
        nota: String,
        observacion: String,
      }],
    },
    evaluacion_tipo: String,
    descripcion: String,
    publicada: Boolean,
    nota: String,
    observacion: String,
    criterios: [String],
    notas_criterios: [{
      nota: String,
      observacion: String
    }]
  }]
});

const evaluadorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usuario_id: String,
  apellido: String,
  nombres: String,
  evaluaciones_comisiones: [{
    comision_id: String,
    comision_nombre: String,
    evaluacion_id: String,
    evaluacion_nombre: String,
    fecha: {type: FormatDate, format: 'DD-MM-YYYY', default: Date.now},
    escala_notas: {
      descripcion: String,
      notas: [{
        nota: String,
        observacion: String,
      }],
    },
    evaluacion_tipo: String,
    descripcion: String,
    publicada: Boolean,
    nota: String,
    observacion: String,
    criterios: [String],
    notas_criterios: [{
      nota: String,
      observacion: String
    }]
  }]
});

/*Crea una tabla en la base de datos*/ /*Modelos*/
const alumnos = mongoose.model('alumnos',alumnoSchema);
const evaluadores = mongoose.model('evaluadores',evaluadorSchema);


module.exports.alumnos= alumnos;
module.exports.evaluadores = evaluadores;
