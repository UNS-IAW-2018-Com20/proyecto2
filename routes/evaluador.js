const express = require('express');
const router = express.Router();
const evaluadorController = require('../controllers/evaluadorController');

//Página principal del evaluador
router.get('/',evaluadorController.mostrarVista);

router.get('/obtenerEvaluaciones',evaluadorController.mostrarEvaluaciones);

module.exports = router;
