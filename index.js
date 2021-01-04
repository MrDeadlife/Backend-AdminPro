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
//Rutas 
app.use('/api/usuarios', require('./routes/usuarios.routes'));
//Ruta de login
app.use('/api/login', require('./routes/auth.routes'));
// Puerto de coneccion
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 3000');
})

