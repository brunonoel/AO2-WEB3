const db = require('../config/db');

exports.getAllAlumnos = (req, res) => {
  db.query('SELECT * FROM alumnos', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createAlumno = (req, res) => {
  const { apellido, nombre, email, edad } = req.body;
  db.query('INSERT INTO alumnos (apellido, nombre, email, edad) VALUES (?, ?, ?, ?)',
    [apellido, nombre, email, edad], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Alumno added.');
      }
    });
};

exports.updateAlumno = (req, res) => {
  const { id } = req.params;
  const { apellido, nombre, email, edad } = req.body;
  db.query('UPDATE alumnos SET apellido = ?, nombre = ?, email = ?, edad = ? WHERE idalumno = ?',
    [apellido, nombre, email, edad, id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('Alumno updated.');
      }
    });
};

exports.deleteAlumno = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM alumnos WHERE idalumno = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Alumno deleted.');
    }
  });
};
