const { Router } = require('express');
const { check } = require('express-validator');
const ValidateJwt = require('../middlewares/validarJwt');
const validarCampos = require('../middlewares/validarCampos');
const { getTodo, getByCollection } = require('../controllers/busquedas.controller');

const router = Router();

router.get('/:busqueda',
    ValidateJwt,
    getTodo
);
router.get('/coleccion/:tabla/:busqueda',
    ValidateJwt,
    getByCollection
);

module.exports = router;