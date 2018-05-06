const modeloUsuarios = require('../models/usuarios').usuarios;

exports.registrar = function (req,res,next){
  /*Acá formo un modelo del usuario para insertar en la base de datos*/
  var u1=new modeloUsuarios({

      nombre:req.body.nombre,
      apellido:req.body.apellido,
      email:req.body.email,
      password:req.body.password,
      darkTheme:false,
      tipo:'Alumno'
  })

  /*Esta consulta es para comprobar si hay un usuario con la misma dirección de Email*/
  modeloUsuarios.find({})
             .where('email').equals(req.body.email)
              .exec(obtenerUsuarios);
              function obtenerUsuarios(err,Us){

                    if(err)
                      console.log("Error: "+err);
                    else{
                          if(Us==""){
                           u1.save(); /*esto guarda los datos de "u1" en la base de datos "DATOS", en la tabla "usuarios"*/
                           res.send("Reibimos los datos ");
                         }
                          else{ /*Acá puede ir el codigo para mostrar en el REGISTER, que el mail ingresado ya fue utilizado
                                por ahora muestro un cartel*/
                                console.log("El mail ya fue utilizado");
                                res.render('register');
                          }
                    }
                };
};

exports.logout = function(req, res, next){
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return done(err);
      } else {
        return res.redirect('/');
      }
    });
  }
};

exports.mostrarFormularioRegistro = function(req,res,next){
  res.render('register');
};

exports.redireccionarPaginaUsuario = function(req,res,next){
  res.redirect('/'+req.user.tipo);
};