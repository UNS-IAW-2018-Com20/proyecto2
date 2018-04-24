var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('evaluador', { title: 'Sistema de Gestión de Evaluaciones' });
});

module.exports = router;
