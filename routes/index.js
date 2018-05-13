const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const alumnoController = require('../controllers/alumnoController');
const evaluadorController = require('../controllers/evaluadorController');
const datosController = require('../controllers/datosController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { success: req.session.success, error: req.session.error });
  req.session.success = true;
});

router.get('/register', userController.mostrarFormularioRegistro);

/*Si se realiza un post en Register*/
router.post('/register', userController.registrar);

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

//Login
router.post('/',  passport.authenticate('local', { successRedirect: '/usuario',
                                    failureRedirect: '/' }));

//Página principal del usuario
router.get('/usuario', userController.redireccionarPaginaUsuario);

//Página principal del evaluador
router.get('/evaluador',evaluadorController.mostrarVista);

router.get('/evaluador/obtenerEvaluaciones',evaluadorController.mostrarEvaluaciones);

//Página principal del alumno
router.get('/alumno', alumnoController.mostrarEvaluaciones);

router.get('/alumno/obtenerEvaluaciones', alumnoController.mostrarEvaluaciones);

router.get('/datos/obtenerEvaluaciones/:id',datosController.mostrarEvaluacionEspecifica);

router.get('/datos/obtenerComisiones/:id',datosController.mostrarComisionEspecifica);

router.get('/datos/evaluar/:id',datosController.evaluarComision);

//Cambio de estilo
router.get('/cambioEstilo', userController.cambiarEstilo);
//Logout
router.get('/logout', userController.logout);

module.exports = router;
