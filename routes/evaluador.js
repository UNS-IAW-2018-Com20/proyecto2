const express = require('express');
const router = express.Router();
const evaluadorController = require('../controllers/evaluadorController');

//Página principal del evaluador
router.get('/',evaluadorController.mostrarEvaluaciones);

//router.post('/',evaluadorController.evaluar);

router.post('/enviar', evaluadorController.evaluarPost);

router.get('/evaluar/:id?', evaluadorController.evaluar);

module.exports = router;
