const evaluadores = require('../models/esquema').evaluadores;
const alumnos = require('../models/esquema').alumnos;

exports.mostrarEvaluaciones = function(req, res, next){
  //Muestras las evaluaciones_comisiones que tiene asignadas el evaluador
  evaluadores.findOne({usuario_id: req.user._id}).exec().then(evaluador =>{
    let evaluaciones = evaluador.evaluaciones_comisiones;
    req.session.evaluaciones = evaluaciones;
    res.render('evaluador',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones});
  });
};

exports.evaluar = function(req, res, next){
  let evaluacion = req.session.evaluaciones.find(elemento => elemento.id_general === req.query.evaluacionComision);
  req.session.evaluar = req.query.evaluacionComision;

  res.render('evaluar',{dark:req.user.darkTheme, nombreComision:evaluacion.comision_nombre, nombreEvaluacion:evaluacion.evaluacion_nombre,
  fechaEvaluacion:evaluacion.fecha, descripcionEvaluacion:evaluacion.descripcion,
  criterios: evaluacion.criterios, escala_notas: evaluacion.escala_notas});

};

exports.evaluarPost = function(req,res,next){
  console.log(req.body);
  let arregloCriterios = req.body.arregloCriterios;
  let nuevoArregloCriterios = [];

  for (let i = 0; i < arregloCriterios.length; i+=2){
    nuevoArregloCriterios.push({nota: arregloCriterios[i], observacion: arregloCriterios[i+1]});
  };

  console.log(req.session.evaluar);

  alumnos.update({'evaluaciones_comisiones.id_general': req.session.evaluar}, {'$set': {
    'evaluaciones_comisiones.$.observacion': req.body.comentario_general,
    'evaluaciones_comisiones.$.nota':req.body.nota_General,
    'evaluaciones_comisiones.$.publicada': true,
    'evaluaciones_comisiones.$.notas_criterios': nuevoArregloCriterios
  }}, {"multi": true}, function (err){
    if (!err){
      evaluadores.update({'evaluaciones_comisiones.id_general': req.session.evaluar}, {'$set': {
        'evaluaciones_comisiones.$.observacion': req.body.comentario_general,
        'evaluaciones_comisiones.$.nota':req.body.nota_General,
        'evaluaciones_comisiones.$.publicada': true,
        'evaluaciones_comisiones.$.notas_criterios': nuevoArregloCriterios
      }}, function (err){
        res.redirect("/evaluador");
      });
    };
  });
};
