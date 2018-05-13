const alumnos = require('../models/esquema').alumnos;
const comisiones = require('../models/esquema').comisiones;
const evaluacionesComisiones = require('../models/esquema').evaluaciones_comisiones;
const evaluaciones = require('../models/esquema').evaluaciones;


/*exports.mostrarVista = function(req,res,next){
  res.render('alumno',{nombre:req.user.nombre, dark:req.user.darkTheme});
};*/

exports.mostrarEvaluaciones = function(req, res, next){
  //req.user.id es la id que representa al alumno
  //Con esa id es posible encontrar las evaluaciones_comisiones que le corresponden
  /*var promesa = alumnos.
                  findOne({usuario_id: req.user._id}).
                  populate('evaluaciones_comisiones').
                  exec(function (err,resp){
                    let listaDeEvaluaciones = [];
                    resp.evaluaciones_comisiones.forEach( evaluacionObtenida => {
                      evaluaciones.
                        findOne({_id: evaluacionObtenida.evaluacion}).
                        then(evaluacionAAgregar => {
                          listaDeEvaluaciones.push({nombre: evaluacionAAgregar.nombre});
                        });
                    });
                    return Promise.all(listaDeEvaluaciones);
                  });*/
  //let listaDeEvaluaciones = [];
  alumnos.findOne({usuario_id: req.user._id}).exec().then(alumno =>{
    let promesas = alumno.evaluaciones_comisiones.map((evaluacionComision) => {
        return new Promise((resolve,reject) =>{
          resolve(evaluacionesComisiones.findOne({_id: evaluacionComision}).populate('evaluacion').exec());
        });
    });
    Promise.all(promesas).then(values => {
      console.log(values);
      res.render('alumno',{nombre:req.user.nombre, dark:req.user.darkTheme, evaluaciones:values});
    });
  });
};
