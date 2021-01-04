const { Router } = require('express');
const { check } = require('express-validator'); // validaciones para el req 
const { getUser, createUser, updeteUser, deleteUser } = require('../controllers/usuarios.controller');
const validarCampos = require('../middlewares/validarCampos'); //validador de campos
const ValidateJwt = require('../middlewares/validarJwt');
const router = Router();

router.get('/', ValidateJwt, getUser);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    check('email').isEmail(),
    validarCampos,
], createUser); // Ruta, middleware , controlador, funcion
//los middlewares se ejecutan despues de los check( validarCampos es un middleware)
router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email').isEmail(),
    check('role', 'El role es obligatorio')
], updeteUser);
router.delete('/:id', deleteUser);

module.exports = router;