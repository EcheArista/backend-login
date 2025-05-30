const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta POST /login
router.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE usuario = ? AND contrasenia = ?',
      [usuario, contraseña]
    );

    if (rows.length > 0) {
      res.json({ mensaje: 'Acceso concedido', usuario: rows[0].usuario });
    } else {
      res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;
