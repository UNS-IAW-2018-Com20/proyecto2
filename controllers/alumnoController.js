const modeloComisiones = require('../models/comisiones').comisiones_integrantes;
const modeloEvaluacionesComisiones = require('../models/comisiones').evaluaciones_comisiones;

exports.mostrarEvaluaciones = function(req, res, next){
  //req.user.id es la id que representa al alumno
  //Con esa id es posible encontrar las comisiones que forma parte
  modeloComisiones.find({alumno: req.user.id},"comision",function(err,comisiones){
    //result es un arreglo con las comisiones. Ej: [ {_id:...,comision:...},{_id:....,comision:....},etc]
    //Por cada una de esas comisiones se deben mostrar las evaluaciones correspodientes
    comisiones.forEach(function (itemComision){
      modeloEvaluacionesComisiones.find({comision: itemComision.comision}, function(err,resultadoEvaluaciones){
        res.render('alumno',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones: resultadoEvaluaciones});
      });
    });
  });
};
