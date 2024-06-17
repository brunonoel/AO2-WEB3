const db = require('../config/db');

class Materia {
  static getAll(callback) {
    const sql = 'SELECT * FROM materias';
    db.query(sql, callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM materias WHERE idmateria = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (results.length === 0) {
        callback({ message: 'Materia not found' }, null);
        return;
      }
      callback(null, results[0]);
    });
  }

  static create(newMateria, callback) {
    const { nombre, año, semestre } = newMateria;
    const sql = 'INSERT INTO materias (nombre, año, semestre) VALUES (?, ?, ?)';
    db.query(sql, [nombre, año, semestre], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result.insertId);
    });
  }

  static update(id, updatedMateria, callback) {
    const { nombre, año, semestre } = updatedMateria;
    const sql = 'UPDATE materias SET nombre = ?, año = ?, semestre = ? WHERE idmateria = ?';
    db.query(sql, [nombre, año, semestre, id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.affectedRows === 0) {
        callback({ message: 'Materia not found' }, null);
        return;
      }
      callback(null, { message: 'Materia updated successfully' });
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM materias WHERE idmateria = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.affectedRows === 0) {
        callback({ message: 'Materia not found' }, null);
        return;
      }
      callback(null, { message: 'Materia deleted successfully' });
    });
  }
}

module.exports = Materia;
