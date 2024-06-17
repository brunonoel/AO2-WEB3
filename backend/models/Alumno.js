const db = require('../config/db');

class Alumno {
  static getAll(callback) {
    const sql = 'SELECT * FROM alumnos';
    db.query(sql, callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM alumnos WHERE idalumno = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (results.length === 0) {
        callback({ message: 'Alumno not found' }, null);
        return;
      }
      callback(null, results[0]);
    });
  }

  static create(newAlumno, callback) {
    const { apellido, nombre, email, edad } = newAlumno;
    const sql = 'INSERT INTO alumnos (apellido, nombre, email, edad) VALUES (?, ?, ?, ?)';
    db.query(sql, [apellido, nombre, email, edad], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result.insertId);
    });
  }

  static update(id, updatedAlumno, callback) {
    const { apellido, nombre, email, edad } = updatedAlumno;
    const sql = 'UPDATE alumnos SET apellido = ?, nombre = ?, email = ?, edad = ? WHERE idalumno = ?';
    db.query(sql, [apellido, nombre, email, edad, id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.affectedRows === 0) {
        callback({ message: 'Alumno not found' }, null);
        return;
      }
      callback(null, { message: 'Alumno updated successfully' });
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM alumnos WHERE idalumno = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.affectedRows === 0) {
        callback({ message: 'Alumno not found' }, null);
        return;
      }
      callback(null, { message: 'Alumno deleted successfully' });
    });
  }
}

module.exports = Alumno;
