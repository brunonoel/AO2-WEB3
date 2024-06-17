const db = require('../config/db');

class Usuario {
  constructor(usuario) {
    this.idusuario = usuario.idusuario;
    this.apellido = usuario.apellido;
    this.nombres = usuario.nombres;
    this.email = usuario.email;
    this.clave = usuario.clave;
    this.perfil = usuario.perfil;
  }

  static getAll(callback) {
    db.query('SELECT * FROM usuarios', (err, res) => {
      if (err) {
        console.error('Error fetching usuarios:', err);
        callback(err, null);
        return;
      }
      callback(null, res);
    });
  }

  static getById(id, callback) {
    db.query('SELECT * FROM usuarios WHERE idusuario = ?', [id], (err, res) => {
      if (err) {
        console.error('Error fetching usuario:', err);
        callback(err, null);
        return;
      }
      if (res.length) {
        callback(null, res[0]);
        return;
      }
      callback({ message: 'Usuario not found' }, null);
    });
  }

  static getByEmail(email, callback) {
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, res) => {
      if (err) {
        console.error('Error fetching usuario by email:', err);
        callback(err, null);
        return;
      }
      if (res.length) {
        callback(null, res[0]);
        return;
      }
      callback({ message: 'Usuario not found' }, null);
    });
  }

  static create(newUsuario, callback) {
    db.query('INSERT INTO usuarios SET ?', newUsuario, (err, res) => {
      if (err) {
        console.error('Error creating usuario:', err);
        callback(err, null);
        return;
      }
      callback(null, { id: res.insertId, ...newUsuario });
    });
  }

  static update(id, usuario, callback) {
    db.query('UPDATE usuarios SET ? WHERE idusuario = ?', [usuario, id], (err, res) => {
      if (err) {
        console.error('Error updating usuario:', err);
        callback(err, null);
        return;
      }
      if (res.affectedRows) {
        callback(null, { id: id, ...usuario });
        return;
      }
      callback({ message: 'Usuario not found' }, null);
    });
  }

  static remove(id, callback) {
    db.query('DELETE FROM usuarios WHERE idusuario = ?', [id], (err, res) => {
      if (err) {
        console.error('Error deleting usuario:', err);
        callback(err, null);
        return;
      }
      if (res.affectedRows) {
        callback(null, { message: 'Usuario deleted successfully' });
        return;
      }
      callback({ message: 'Usuario not found' }, null);
    });
  }
}

module.exports = Usuario;
