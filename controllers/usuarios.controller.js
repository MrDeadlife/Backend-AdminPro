const { response } = require('express');
const bcrypt = require('bcrypt'); //encriptador de contrasenas
const usuarioModel = require('../models/usuario.model');
const generteJwt = require('../helpers/jwr');

const getUser = async (req, res) => {
    //PAGINACION
    const desde = Number(req.query.desde) || 0;
    /*
     es una mala practica poner un await despues de otro por eso se usa el promise.all
     el cual ejecuta todo lo que esta dentro y devuelbe un arreglo de documentos
     el cual se puede extraer con una desestructuracion de arreglo
     // solo hara el filtro mostrando el nombre  email google
     const usuario = await usuarioModel
         .find({}, 'nombre email google')
         .skip(desde) //desde pagina #
         .limit(5); //limite de usuarios a mostrar
     const total = await usuarioModel.count(); 
     */
    const [usuarios, totalUsuarios] = await Promise.all([
        usuario = await usuarioModel
            .find({}, 'nombre email google img ')
            .skip(desde) //desde pagina #
            .limit(5),
        usuarioModel.countDocuments(),
    ]);
    try {
        if (usuario => 0) {
            return res.json({
                ok: true,
                usuarios,
                uid: req.uid,
                totalUsuarios
            });
            //req.uid viene del middleware validarjwt.js (usuario que hizo la peticion)
        } else if (usuario.length === 0) {
            return res.status(500).json({
                ok: false,
                msj: 'Sin usuarios registrados'
            });
        }
    } catch (err) {
        return res.status(400).json({
            ok: false,
            msj: 'Error inesperado...',
            err
        });
    }
};
const createUser = async (req, res = response) => {
    const { name, password, email } = req.body;
    try {
        const emailExist = await usuarioModel.findOne({ email });
        if (emailExist) {
            return res.status(500).json({
                ok: false,
                msj: 'El correo ya existe'
            });
        }
        const usuario = new usuarioModel(req.body);

        //encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save(); // esperar hasta que el usuario se guarde
        const token = await generteJwt(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'error inesperado'
        });
    }
};
const updeteUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = usuarioModel.findOneAndUpdate(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msj: 'El id no pertenece a ningun usuario almacenado'
            });
        }
        //extrayendo el pass, google, email del req.body
        const { password, google, email, ...camposUser } = req.body;
        if (usuarioDB.email !== email) {

            const existeEmail = await usuarioModel.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msj: 'Ya existe un usuario con ese email'
                });
            }
        }
        // Actualizaciones
        camposUser.email = email;
        const userUpdated = await usuarioModel.findByIdAndUpdate(id, camposUser, { new: true });
        //Regresando el nuevo usuario desde la primera vez { new: true } (**POSTMAN**)
        res.json({
            ok: true,
            msj: 'Actualizado con exito!',
            userUpdated
        });
        //error
    } catch (err) {
        console.log(err);
        res.status.json({
            ok: false,
            msj: 'Error inesperado',
            err: err
        });
    }
};

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;
    //console.log(uid);
    try {
        const usuarioDB = await usuarioModel.findById(uid);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msj: 'El usuario no existe...'
            });
        }
        await usuarioModel.findByIdAndRemove(uid);
        return res.json({
            ok: true,
            msj: `El usuario con el id ${uid} ha sido eliminado...`
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msj: 'Esta accion nececita permiso del admin-GOD',
        });
    }
};

module.exports = {
    getUser,
    createUser,
    updeteUser,
    deleteUser
};