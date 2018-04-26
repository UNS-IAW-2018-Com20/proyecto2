const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const db_uri = "mongodb://localhost:27017/node_proy";
const modeloUsuarios = require('../models/usuarios')

mongoose.connect(db_uri);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { success: req.session.success, errors: req.session.errors });
  req.session.success = true;
});

router.get('/register',function(req,res,next){
  res.render('register');
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
