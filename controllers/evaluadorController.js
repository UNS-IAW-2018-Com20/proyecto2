const alumnos = require('../models/esquema').alumnos;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;
const evaluaciones = require('../models/esquema').evaluaciones;
const evaluadores = require('../models/esquema').evaluadores;
const criteriosEvaluables = require('../models/esquema').criterios_evaluables;
const criteriosNotas = require('../models/esquema').criterios_notas;


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
  evaluacionesComisiones.findOne({_id: req.params.id}).populate('evaluacion comision').exec().then(comision_eval => {

    let promesas = comision_eval.criterios_notas.map((criterio_nota) => {
      return new Promise((resolve,reject) => {
        resolve(criteriosNotas.findOne({_id:criterio_nota}).populate('criterios_evaluables').exec());
      });
    });
    Promise.all(promesas).then(values => {
      let criterios_EvalNecesarios = values.map((value) => {
        return {nombre: value.criterios_evaluables.descripcion, criterio_nota_id: value.criterios_evaluables._id};
      });

      res.render('evaluar',{dark:req.user.darkTheme, nombreComision:comision_eval.comision.nombre, nombreEvaluacion:comision_eval.evaluacion.nombre,
      fechaEvaluacion:comision_eval.evaluacion.fecha, descripcionEvaluacion:comision_eval.evaluacion.descripcion,
      criterios: criterios_EvalNecesarios});
    });
  });
};

exports.evaluarPost = function(req,res,next){

  let nota = 1;
  evaluacionesComisiones.findByIdAndUpdate("5aee2d00734d1d5358b8f342",{observaciones:req.body.comentario_general,nota:nota,evaluacion_completa:true} , function(err, evaluacioncomision) {
    if (err)
      res.render('error');
    else {
      let promesas = evaluacioncomision.criterios_notas.map((criterio) => {
          return new Promise((resolve,reject) =>{
            criteriosNotas.findByIdAndUpdate(criterio,{nota:req.body.scope[criterio][0],observaciones:req.body.scope[criterio][1]} , function(err, success) {
                    if (err)
                      res.render('error');
                    else
                      resolve(success);
            });
          });
      });
      Promise.all(promesas).then(values => {
        res.redirect("/evaluador");
      });
    }
  });
};
