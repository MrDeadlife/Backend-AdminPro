const { response, json } = require("express");
const { verify } = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid'); //npm uuid Generar nombre de imagen
const { actualizarImg } = require('../helpers/ActualizarImg.js');
const UsuarioModel = require('../models/usuario.model');
const HospitalModel = require('../models/hospitales.model');
const MedicoModel = require('../models/medicos.model');
const path = require('path');
const fs = require('fs');

const verifyExist = async (id) => {
    switch (id) {
        case 'medicos':
            const Medico = await MedicoModel.findById(id);
            if (!Medico) {
                return false;
            }
            break;
        case 'hospitales':
            const Hospital = await HospitalModel.findById(id);
            if (!Hospital) {
                return false;
            }
            break;
        case 'usuario':
            Usuario = await UsuarioModel.findById(id);
            if (!Usuario) {
                return false;
            }
            break;
    }
}

const fileUploads = async (req, res = response) => {
    // console.log('entro a la funcion!');
    const tipo = req.params.tipo;
    const id = req.params.id;
    const img = req.body.img;
    //verifyType(id)
    //Validar tipo
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    //verifyExist(id);

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msj: 'Tipo no permitido'
        });
    }
    //Validacion de archivo (si existe)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msj: 'No hay imagen!'
        });
    }
    //Procesar img
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extencionImagen = nombreCortado[nombreCortado.length - 1];
    //console.log({ nombreCortado, extencionImagen });

    //Validar extencion
    const extencionesValidas = ['png', 'jpeg', 'jpg', 'gif'];
    if (!extencionesValidas.includes(extencionImagen)) {
        return res.status(400).json({
            ok: false,
            msj: 'No es una Extencion es valida'
        });
    }
    //Generar el uuid de la imagen => uuidv4(); ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    const nombreImagen = `${uuidv4()}.${extencionImagen}`;

    //PATH para guardar imagen
    const path = `./uploads/${tipo}/${nombreImagen}`;
    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msj: 'Error al mover la imagen',
                err
            });
        }
        //Actualizar imagen
        // console.log({ tipo, id, path, nombreImagen })
        actualizarImg(tipo, id, nombreImagen);
        res.json({
            ok: true,
            msj: 'File uploaded!',
            nombreImagen,
        });
    });
};
const retornarImg = (req, res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathXDefecto = path.join(__dirname, `../uploads/sin_imagen.png`);
        res.sendFile(pathXDefecto);
    }

};

module.exports = {
    fileUploads,
    retornarImg
};