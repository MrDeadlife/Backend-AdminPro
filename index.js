// Lee las variables del archivo .env
require('dotenv').config();

const express = require('express'); // Express es una infraestuctura de  métodos de programa de utilidad HTTP y middleware a su disposición.
const app = express(); // Creando el servidor express
const cors = require('cors');
const { dbConnection } = require('./DataBase/config');

// Configuracion de cors
app.use(cors());
// Lectura y parseo de body
app.use(express.json());
// Coneccion a base de datos
dbConnection();
//Directorio publico
app.use(express.static('public'));
//Rutas
app.use('/api/login', require('./routes/auth.routes')); //Ruta de login
app.use('/api/usuarios', require('./routes/usuarios.routes')); //Ruta de usuarios
app.use('/api/hospitales', require('./routes/hospitales.routes'));//Ruta de hospitales
app.use('/api/medicos', require('./routes/medicos.routes'));//Ruta de medicos
app.use('/api/todo', require('./routes/busquedas.routes'));//Ruta de busqueda
app.use('/api/todo', require('./routes/busquedas.routes'));//Ruta de busqueda por coleccion
app.use('/api/uploads', require('./routes/upload.routes'));//Ruta de subir imagen


// Puerto de coneccion
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});

