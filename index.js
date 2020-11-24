// Lee las variables del archivo .env
require('dotenv').config();

const express = require('express'); // Express es una infraestuctura de  métodos de programa de utilidad HTTP y middleware a su disposición.
const app = express(); // Creando el servidor express
const cors = require('cors');  // Conf cors

app.use(cors())

// Coneccion a base de datos
const { dbConnection } = require('./DataBase/config');
dbConnection();


//Rutas 
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msj: 'Hola Mundo!'
    })
})


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 3000');
})

