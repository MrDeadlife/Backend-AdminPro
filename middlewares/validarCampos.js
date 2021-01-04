const { response } = require('express');
const { validationResult } = require('express-validator'); //validacion de resultados

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req); //arreglo de errores
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: errors.mapped()
        });
    }
    next(); //si no hay errores se ejecuta el next
}

module.exports = validarCampos;