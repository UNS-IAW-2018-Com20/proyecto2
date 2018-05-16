const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

//Página principal del alumno
router.get('/', alumnoController.mostrarEvaluaciones);

router.get('/obtenerEvaluaciones', alumnoController.mostrarEvaluaciones);

module.exports = router;
