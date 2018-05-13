const alumnos = require('../models/esquema').alumnos;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;
const evaluaciones = require('../models/esquema').evaluaciones;
const evaluadores = require('../models/esquema').evaluadores;

exports.mostrarVista = function(req,res,next){
  res.render('evaluador',{nombre: req.user.nombre, dark:req.user.darkTheme});
}

exports.mostrarEvaluaciones = function(req, res, next){
  //req.user.id es la id que representa al evaluador
  //Con esa id es posible encontrar las comisiones_evaluaciones que le corresponden
  evaluadores.
    findOne({usuario_id: req.user._id}).
    populate('evaluaciones_comisiones').
    exec(function (err,resp){
      res.send(resp);
    });
};
