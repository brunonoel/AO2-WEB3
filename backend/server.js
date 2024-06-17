const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const calificacionRoutes = require('./routes/calificacionRoutes');
const materiasRoutes = require('./routes/materiasRoutes')

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/calificaciones', calificacionRoutes);
app.use('/api/materias', materiasRoutes);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
