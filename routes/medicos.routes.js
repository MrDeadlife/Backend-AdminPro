const { Router } = require('express');
const ValidateJwt = require('../middlewares/validarJwt');
const {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos } = require('../controllers/medicos.controller');

const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');

const router = Router();

router.get('/', getMedicos);
router.post('/', [
    ValidateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El id no tiene un formato adecuado').isMongoId(),
    validarCampos,
], createMedicos); // Ruta, middleware , controlador, funcion
router.put('/:id', updateMedicos);
router.delete('/:id', deleteMedicos);

module.exports = router;