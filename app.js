const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy =require('passport-local').Strategy;
const configAuth = require('./auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const modeloUsuarios = require('./models/usuarios').Usuarios;
const app = express();


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
      modeloUsuarios.findOne({
        email: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.clientID,
    consumerSecret: configAuth.twitterAuth.clientSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    modeloUsuarios.findOne({ 'twitterId': profile.id}, function(err, user) {
      if (err) { return done(err); }
      if (user){
        return done(null, user);
      } else {
        var newUser = new modeloUsuarios({
          nombre: profile.displayName,
          email: profile.email,
          twitterId: profile.id,
          tema: 1,
          tipo:'Alumno'
        });
        newUser.save(function(err){
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
/*passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
*/


//Configuracion
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
//tw
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


//Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

//IMPORTANTEEEEEEEEEEEEEEE Pasarlo al routeo
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
