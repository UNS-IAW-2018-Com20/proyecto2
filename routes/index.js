const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const modeloUsuarios = require('../models/usuarios').Usuarios;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { success: req.session.success, error: req.session.error });
  req.session.success = true;
});

router.get('/register',function(req,res,next){
  res.render('register');
});

/*si se realiza un post en Register*/
router.post('/register',function(req,res,next){

  /*Acá formo un modelo del usuario para insertar en la base de datos*/
  var u1=new modeloUsuarios({

      nombre:req.body.nombre,
      apellido:req.body.apellido,
      email:req.body.email,
      password:req.body.password,
      tema:1,
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
});

// Redirect the user to Twitter for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/twitter/callback
router.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/usuario',
                                      failureRedirect: '/' }));


router.post('/',  passport.authenticate('local', { successRedirect: '/usuario',
                                    failureRedirect: '/' }));

router.get('/usuario', function(req,res,next){
  res.render(req.user.tipo);
});

router.get('/logout', function(req, res, next) {
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
});

//Función para autenticar al usuario
function authenticate(name, pass, fn) {
    modeloUsuarios.findOne({
        'email': name
    },
    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            if (user.password == pass) return fn(null,user);
            fn(new Error('invalid password'));
        } else {
            return fn(new Error('cannot find user'));
        }
    });
}

module.exports = router;
