const db = require('../config/db');

class Calificacion {
  static getAll(callback) {
    const sql = 'SELECT * FROM calificaciones';
    db.query(sql, callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM calificaciones WHERE idcalificacion = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (results.length === 0) {
        callback({ message: 'Calificacion not found' }, null);
        return;
      }
      callback(null, results[0]);
    });
  }

  static create(newCalificacion, callback) {
    const { nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario } = newCalificacion;
    const sql = 'INSERT INTO calificaciones (nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result.insertId);
    });
  }

  static update(id, updatedCalificacion, callback) {
    const { nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario } = updatedCalificacion;
    const sql = 'UPDATE calificaciones SET nota1 = ?, nota2 = ?, nota3 = ?, nota4 = ?, promedio = ?, condicion = ?, idalumno = ?, idmateria = ?, idusuario = ? WHERE idcalificacion = ?';
    db.query(sql, [nota1, nota2, nota3, nota4, promedio, condicion, idalumno, idmateria, idusuario, id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.affectedRows === 0) {
        callback({ message: 'Calificacion not found' }, null);
        return;
      }
      callback(null, { message: 'Calificacion updated successfully' });
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM calificaciones WHERE idcalificacion = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.affectedRows === 0) {
        callback({ message: 'Calificacion not found' }, null);
        return;
      }
      callback(null, { message: 'Calificacion deleted successfully' });
    });
  }
}

module.exports = Calificacion;
