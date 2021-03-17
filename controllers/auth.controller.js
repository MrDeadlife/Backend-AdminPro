const { response } = require('express');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuario.model');
const generteJwt = require('../helpers/jwr');
const { googleverify } = require('../helpers/google-verify');

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
        console.log('error en el catch');
        res.status(400).json({
            ok: false,
            msj: 'Error inesperado...!'
        });
    }
};
const googleSingIn = async (req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { email, name, picture } = await googleverify(googleToken);
        //verificacion de email
        const usuarioDB = await usuarioModel.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new usuarioModel({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        // console.log(usuario);
        await usuario.save();

        const token = await generteJwt(usuario.id);
        // console.log(usuarioDB.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msj: ' Token no es correcto'
        });
    }
};
module.exports = {
    login,
    googleSingIn
};