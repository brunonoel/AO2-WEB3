const express = require('express');
const router = express.Router();
const calificacionController = require('../controllers/calificacionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', calificacionController.getAllCalificaciones);
router.post('/', authMiddleware, calificacionController.createCalificacion);
router.put('/:id', authMiddleware, calificacionController.updateCalificacion);
router.delete('/:id', authMiddleware, calificacionController.deleteCalificacion);

module.exports = router;
