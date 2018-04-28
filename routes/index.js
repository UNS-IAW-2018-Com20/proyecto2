const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
//const db_uri = "mongodb://localhost:27017";
const modeloUsuarios = require('../models/usuarios').Usuarios;


//mongoose.connect(db_uri);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { success: req.session.success, errors: req.session.errors });
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
      password:req.body.password
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
  passport.authenticate('twitter', { successRedirect: '/',
                                      failureRedirect: '/login' }));


router.post('/', function(req,res,next) {
  req.check('username','Nombre de Usuario Incorrecto').equals('juan');
  if (req.validationErrors()){
    req.session.errors = req.validationErrors();
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');

  /*
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("node_proy");
    dbo.collection("usuarios").findOne({},function(err,result){
      if (err) throw err;
      if (result.username == req.body.username){
        res.render('evaluador');
      } else res.render('login');
      db.close();
    });
  });*/
});

module.exports = router;
