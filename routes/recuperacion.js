const express = require('express');
const router = express.Router();
const { getLeccionesByModulo } = require('../controllers/recuperacion');

router.post('/get-lecciones/:moduloId', getLeccionesByModulo);

module.exports = router;
