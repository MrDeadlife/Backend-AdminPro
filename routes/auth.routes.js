/* 
    PATH: '/api/login' 
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const validarCampos = require('../middlewares/validarCampos');
const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio...').isEmail(),
    check('password', 'La contrasena es obligatoria...').not().isEmpty(),
    validarCampos
], login);



module.exports = router;