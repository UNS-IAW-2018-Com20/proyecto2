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
  evaluadores.findOne({usuario_id: req.user._id}).exec().then(evaluador =>{
    let promesas = evaluador.evaluaciones_comisiones.map((evaluacionComision) => {
        return new Promise((resolve,reject) =>{
          resolve(evaluacionesComisiones.findOne({_id: evaluacionComision}).populate('evaluacion').exec());
        });
    });
    Promise.all(promesas).then(values => {
      console.log(values);
      res.render('evaluador',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones:values});
    });
  });
};
