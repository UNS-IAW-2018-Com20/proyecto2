const alumnos = require('../models/esquema').alumnos;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;
const evaluaciones = require('../models/esquema').evaluaciones;

exports.mostrarEvaluaciones = function(req, res, next){
  //req.user.id es la id que representa al alumno
  //Con esa id es posible encontrar las evaluaciones_comisiones que le corresponden
  alumnos.
    findOne({usuario_id: req.user._id}).
    populate('evaluaciones_comisiones').
    exec(function (err,resp){
      res.send(resp);
    });
};
