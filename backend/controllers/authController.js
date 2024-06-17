const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.clave, (err, match) => {
        if (match) {
          const token = jwt.sign({ id: user.idusuario, perfil: user.perfil }, 'secretkey', { expiresIn: '1h' });
          res.json({ ...user, token });
        } else {
          res.status(401).send('Email or password incorrect.');
        }
      });
    } else {
      res.status(401).send('Email or password incorrect.');
    }
  });
};

exports.register = (req, res) => {
  const { apellido, nombres, email, clave, perfil } = req.body;
  bcrypt.hash(clave, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send(err);
    } else {
      db.query('INSERT INTO usuarios (apellido, nombres, email, clave, perfil) VALUES (?, ?, ?, ?, ?)',
        [apellido, nombres, email, hashedPassword, perfil], (err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send('User registered.');
          }
        });
    }
  });
};
