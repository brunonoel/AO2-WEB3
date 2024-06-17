const db = require('../config/db');

const getAllMaterias = (req, res) => {
  const sql = 'SELECT * FROM materias';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching materias:', err);
      return res.status(500).send('Error fetching materias');
    }
    res.json(results);
  });
};

const getMateriaById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM materias WHERE idmateria = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching materia:', err);
      return res.status(500).send('Error fetching materia');
    }
    if (results.length === 0) {
      return res.status(404).send('Materia not found');
    }
    res.json(results[0]);
  });
};

const createMateria = (req, res) => {
  const { nombre, año, semestre } = req.body;
  const sql = 'INSERT INTO materias (nombre, año, semestre) VALUES (?, ?, ?)';
  db.query(sql, [nombre, año, semestre], (err, result) => {
    if (err) {
      console.error('Error creating materia:', err);
      return res.status(500).send('Error creating materia');
    }
    res.status(201).send('Materia created successfully');
  });
};

const updateMateria = (req, res) => {
  const { id } = req.params;
  const { nombre, año, semestre } = req.body;
  const sql = 'UPDATE materias SET nombre = ?, año = ?, semestre = ? WHERE idmateria = ?';
  db.query(sql, [nombre, año, semestre, id], (err, result) => {
    if (err) {
      console.error('Error updating materia:', err);
      return res.status(500).send('Error updating materia');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Materia not found');
    }
    res.send('Materia updated successfully');
  });
};

const deleteMateria = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM materias WHERE idmateria = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting materia:', err);
      return res.status(500).send('Error deleting materia');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Materia not found');
    }
    res.send('Materia deleted successfully');
  });
};

module.exports = {
  getAllMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
};
