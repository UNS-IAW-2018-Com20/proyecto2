const evaluadores = require('../models/esquema').evaluadores;

exports.mostrarEvaluaciones = function(req, res, next){
  evaluadores.findOne({usuario_id: req.user._id}).exec().then(evaluador =>{
    let evaluaciones = evaluador.evaluaciones_comisiones;
    req.session.evaluaciones = evaluaciones;
    res.render('evaluador',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones});
  });
};

exports.evaluar = function(req, res, next){
  let evaluacion = req.session.evaluaciones.find(elemento => elemento.evaluacion_id === req.query.evaluacionComision);

  res.render('evaluar',{dark:req.user.darkTheme, nombreComision:evaluacion.comision_nombre, nombreEvaluacion:evaluacion.evaluacion_nombre,
  fechaEvaluacion:evaluacion.fecha, descripcionEvaluacion:evaluacion.descripcion,
  criterios: evaluacion.criterios, escala_notas: evaluacion.escala_notas});

};

exports.evaluarPost = function(req,res,next){
  console.log(req.body);
  /*let nota = 1;
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
  });*/
};
