const express = require('express');
const path = require('path');

const app = express();
const port = 3003;

// Servir los archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, ''))); // Sirve todos los archivos en la carpeta actual

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'carrito.html')); // Sirve el HTML al hacer una petición al root
});

app.listen(port, () => {
    console.log(`Servidor de carrito escuchando en http://localhost:${port}`);
});
