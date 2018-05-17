const alumnos = require('../models/esquema').alumnos;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;
const evaluaciones = require('../models/esquema').evaluaciones;
const criterios_notas  = require('../models/esquema').criterios_notas;
const criterios_evaluables = require('../models/esquema').criterios_evaluables;

exports.mostrarEvaluaciones = function(req, res, next){
  alumnos.findOne({usuario_id: req.user._id}).exec().then(alumno =>{
    let promesas = alumno.evaluaciones_comisiones.map((evaluacionComision) => {
        return new Promise((resolve,reject) =>{
          resolve(evaluacionesComisiones.findOne({_id: evaluacionComision}).populate('evaluacion').exec());
        });
    });
    Promise.all(promesas).then(values => {
      res.render('alumno',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones:values});
    });
  });
};

exports.mostrarEvaluacion = function(req, res, next) {
  evaluacionesComisiones.findOne({_id: req.query.evaluacionComision}).populate('evaluacion comision').exec().then(comision_eval => {
    let promesas = comision_eval.criterios_notas.map((criterio_nota) => {
      return new Promise((resolve,reject) => {
        resolve(criterios_notas.findOne({_id:criterio_nota}).populate('criterios_evaluables').exec());
      });
    });
    Promise.all(promesas).then(values => {
      let criterios_valoresNecesarios = values.map((value) => {
        return {nombre: value.criterios_evaluables.descripcion, nota: value.nota, obs: value.observaciones};
      });

      res.render('mostrar_evaluacion',{dark:req.user.darkTheme, nombreComision:comision_eval.comision.nombre, nombreEvaluacion:comision_eval.evaluacion.nombre,
      fechaEvaluacion:comision_eval.evaluacion.fecha, descripcionEvaluacion:comision_eval.evaluacion.descripcion,
      notaEvaluacion:comision_eval.nota, observacionesEvaluacion:comision_eval.observaciones, criterios: criterios_valoresNecesarios});
    });
  });
};
