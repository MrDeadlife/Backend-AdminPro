/* 
    PATH: '/api/login' 
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth.controller');
const validarCampos = require('../middlewares/validarCampos');
const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio...').isEmail(),
    check('password', 'La contrasena es obligatoria...').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'Token de google es obligatorio...').not().isEmpty(),
    validarCampos
], googleSingIn);



module.exports = router;