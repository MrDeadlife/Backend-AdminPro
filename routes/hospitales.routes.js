/* 
    Hospitales
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator'); // validaciones para el req 
const validarCampos = require('../middlewares/validarCampos'); //validador de campos
const ValidateJwt = require('../middlewares/validarJwt');
const router = Router();

const {
    getHospitales,
    createHospitales,
    deleteHospitales,
    updateHospitales
} = require('../controllers/hospitales.controller');


router.get('/', getHospitales);
router.post('/', [
    ValidateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], createHospitales); // Ruta, middleware , controlador, funcion
router.put('/:id', updateHospitales);
router.delete('/:id', deleteHospitales);

module.exports = router;