const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware para manejar solicitudes JSON
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: '3paginas.database.windows.net',
    user: 'adminlu',
    password: 'Lucho12345',
    database: '3paginasdb'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta para registrar usuarios
app.post('/autenticacion/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Insertar usuario en la base de datos
    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).json({ message: 'Error al registrar el usuario.' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    });
});

// Ruta para iniciar sesión
app.post('/autenticacion/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    // Validar las credenciales
    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al verificar las credenciales:', err);
            return res.status(500).json({ message: 'Error de autenticación.' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso.' });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas.' });
        }
    });
});

// Ruta para obtener productos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM productos';  // Cambia según tu esquema de base de datos
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ message: 'Error al obtener los productos.' });
        }
        res.status(200).json(results);
    });
});

// Ruta para obtener productos del carrito
app.get('/carrito', (req, res) => {
    const query = 'SELECT * FROM carrito';  // Cambia según tu esquema de base de datos
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener el carrito:', err);
            return res.status(500).json({ message: 'Error al obtener el carrito.' });
        }
        res.status(200).json(results);
    });
});

// Ruta para eliminar un producto del carrito
app.delete('/carrito/remove/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM carrito WHERE id = ?';  // Cambia según tu esquema de base de datos
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto del carrito:', err);
            return res.status(500).json({ message: 'Error al eliminar el producto.' });
        }
        res.status(200).json({ message: 'Producto eliminado del carrito.' });
    });
});

// Ruta para actualizar la cantidad de un producto en el carrito
app.put('/carrito/update/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;  // Recibimos la nueva cantidad
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser mayor a 0.' });
    }

    const query = 'UPDATE carrito SET quantity = ? WHERE id = ?';  // Cambia según tu esquema de base de datos
    db.query(query, [quantity, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar la cantidad:', err);
            return res.status(500).json({ message: 'Error al actualizar la cantidad.' });
        }
        res.status(200).json({ message: 'Cantidad actualizada con éxito.' });
    });
});

// Ruta para realizar el checkout (vaciar el carrito)
app.post('/carrito/checkout', (req, res) => {
    const query = 'DELETE FROM carrito';  // Elimina todos los productos del carrito
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al procesar el checkout:', err);
            return res.status(500).json({ message: 'Error al procesar el checkout.' });
        }
        res.status(200).json({ message: 'Compra realizada con éxito, carrito vacío.' });
    });
});

// Configuración del puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
