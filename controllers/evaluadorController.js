const alumnos = require('../models/esquema').alumnos;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;
const evaluaciones = require('../models/esquema').evaluaciones;
const evaluadores = require('../models/esquema').evaluadores;
const criteriosEvaluables = require('../models/esquema').criterios_evaluables;


exports.mostrarEvaluaciones = function(req, res, next){

  evaluadores.findOne({usuario_id: req.user._id}).exec().then(evaluador =>{
    let promesas = evaluador.evaluaciones_comisiones.map((evaluacionComision) => {
        return new Promise((resolve,reject) =>{
          resolve(evaluacionesComisiones.findOne({_id: evaluacionComision}).populate('evaluacion comision').exec());
        });
    });

    Promise.all(promesas).then(values => {
      res.render('evaluador',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones:values});
    });
  });

};


exports.evaluar = function(req, res, next){
  evaluacionesComisiones.findOne({_id: req.query.evaluacionComision}).populate('evaluacion comision').exec().then(comision_eval => {
    let promesas = comision_eval.evaluacion.criterios_evaluables.map((criterio_eval) => {
      return new Promise((resolve,reject) => {
        resolve(criteriosEvaluables.findOne({_id:criterio_eval}).exec());
      });
    });
    Promise.all(promesas).then(values => {
      let criterios_EvalNecesarios = values.map((value) => {
        return {nombre: value.descripcion};
      });

      res.render('evaluar',{dark:req.user.darkTheme, nombreComision:comision_eval.comision.nombre, nombreEvaluacion:comision_eval.evaluacion.nombre,
      fechaEvaluacion:comision_eval.evaluacion.fecha, descripcionEvaluacion:comision_eval.evaluacion.descripcion,
      criterios: criterios_EvalNecesarios});
    });
  });
};

exports.evaluar_post = function(req,res,next){
  console.log(req);
  res.redirect('/evaluador');
};
