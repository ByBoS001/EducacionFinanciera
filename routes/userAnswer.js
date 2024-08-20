// routes/userAnswer.js
const express = require('express');
const router = express.Router();
const { submitAnswers } = require('../controllers/userAnswer'); // Asegúrate de la ruta correcta

// Ruta para enviar respuestas
router.post('/submit-answers', submitAnswers);

module.exports = router;
