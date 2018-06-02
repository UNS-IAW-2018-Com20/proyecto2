const alumnos = require('../models/esquema').alumnos;

exports.mostrarEvaluaciones = function(req, res, next){
  alumnos.findOne({usuario_id: req.user._id}).exec().then(alumno =>{
    let evaluaciones = alumno.evaluaciones_comisiones;
    req.session.evaluaciones = evaluaciones;
    res.render('alumno',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones});
  });
};

exports.mostrarEvaluacion = function(req, res, next) {
  let evaluacion = req.session.evaluaciones.find(elemento => elemento.evaluacion_id === req.query.evaluacionComision);
  res.render('mostrar_evaluacion',{dark:req.user.darkTheme, nombreEvaluacion:evaluacion.evaluacion_nombre, nombreComision: evaluacion.comision_nombre,
  fechaEvaluacion:evaluacion.fecha, descripcionEvaluacion:evaluacion.descripcion, criterios:evaluacion.criterios, notas_criterios:evaluacion.notas_criterios,
  notaEvaluacion:evaluacion.nota, observacionesEvaluacion:evaluacion.observacion});
};
