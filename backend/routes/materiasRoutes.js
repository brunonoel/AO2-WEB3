const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materiasController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, materiasController.getAllMaterias);
router.get('/:id', authMiddleware, materiasController.getMateriaById);
router.post('/', authMiddleware, materiasController.createMateria);
router.put('/:id', authMiddleware, materiasController.updateMateria);
router.delete('/:id', authMiddleware, materiasController.deleteMateria);

module.exports = router;
