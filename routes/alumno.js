const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

//Página principal del alumno
router.get('/', alumnoController.mostrarEvaluaciones);

router.get('/mostrarEvaluacion', alumnoController.mostrarEvaluacion);

module.exports = router;
