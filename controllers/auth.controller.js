const { response } = require('express');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuario.model');
const validarCampos = require('../middlewares/validarCampos');
const generteJwt = require('../helpers/jwr');

const login = async (req, res = response) => {
    //desestructure 
    const { email, password } = req.body;
    try {
        const usuarioDB = await usuarioModel.findOne({ email });
        //Verificar contrasena
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msj: 'Error de autentifiacion E'
            });
        }
        //Verificar contrasena y desemcriptandola
        const validPass = bcrypt.compareSync(password, usuarioDB.password);
        //console.log(validPass);
        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msj: 'Error de autentifiacion C'
            });
        }
        /* Gererar el token */
        const token = await generteJwt(usuarioDB.id);
        res.json({
            ok: true,
            token
        });


    } catch (err) {
       console.log('error en el catch')
        res.status(400).json({
            ok: false,
            msj: 'Error inesperado...!'
        });
    }
};

module.exports = {
    login
};