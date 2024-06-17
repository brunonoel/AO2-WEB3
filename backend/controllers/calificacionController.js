const db = require('../config/db');

exports.getAllCalificaciones = (req, res) => {
  db.query('SELECT * FROM calificaciones', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createCalificacion = (req, res) => {
  const { nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario } = req.body;
  db.query('INSERT INTO calificaciones (nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Calificacion added.');
      }
    });
};

exports.updateCalificacion = (req, res) => {
  const { id } = req.params;
  const { nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario } = req.body;
  db.query('UPDATE calificaciones SET nota1 = ?, nota2 = ?, nota3 = ?, nota4 = ?, promedio = ?, condicion = ?, idalumno = ?, idmateria = ?, idusuario = ? WHERE idcalificacion = ?',
    [nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario, id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('Calificacion updated.');
      }
    });
};

exports.deleteCalificacion = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM calificaciones WHERE idcalificacion = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Calificacion deleted.');
    }
  });
};
