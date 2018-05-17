const express = require('express');
const router = express.Router();
const evaluadorController = require('../controllers/evaluadorController');

//Página principal del evaluador
router.get('/',evaluadorController.mostrarEvaluaciones);

router.get('/evaluar', evaluadorController.evaluar);

router.post('/evaluar', evaluadorController.evaluar_post);
module.exports = router;
