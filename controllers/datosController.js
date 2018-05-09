const evaluaciones = require('../models/esquema').evaluaciones;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;

exports.mostrarEvaluacionEspecifica = function(req,res,next){
  evaluaciones.findById(req.params.id,function(err,result){
    res.send(result);
  });
};

exports.mostrarComisionEspecifica = function(req,res,next){
  comisiones.findById(req.params.id,function(err,result){
    res.send(result);
  });
};

exports.evaluarComision = function(req,res,next){
  evaluacionesComisiones
    .findById(req.params.id)
    .populate('comision')
    .populate('evaluacion')
    .exec(function(err,resp){
      res.render('evaluar', {comision:resp.comision.nombre, evaluacion:resp.evaluacion.nombre, dark:req.user.darkTheme});
    });
};
