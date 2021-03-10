const { response } = require("express");
const medicosModel = require('../models/medicos.model');

const getMedicos = async (req, resp = response) => {

    const medicos = await medicosModel.find()
        .populate('user', 'name email img')
        .populate('hospitales', 'name');
    try {
        resp.json({
            ok: 'true',
            medicos
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: 'false',
            error: 'Contacte con el administrador!'
        });
    }
    if (medicos.length <= 0) {
        resp.json({
            ok: false,
            msj: 'No hay medicos registrados'
        });
    }
};

const createMedicos = async (req, resp = response) => {
    const uid = req.uid;
    medico = new medicosModel({
        user: uid,
        ...req.body
    });
    try {
        const { name } = req.body;
        const medicoExist = await medicosModel.findOne({ name });
        if (medicoExist) {
            resp.json({
                ok: false,
                msj: 'Ya hay un medico registrado con ese nombre.'
            });
            return;
        }
        const medicoDB = await medico.save();
        resp.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msj: 'Error, hable con el administrador'
        });
    }
};

const deleteMedicos = (req, resp = response) => {
    resp.json({
        ok: 'true',
        msj: 'Estas eliminando un Medicos!'
    });
}


const updateMedicos = (req, resp = response) => {
    resp.json({
        ok: 'true',
        msj: 'Estas actualizando un Medicos!'
    });
};


module.exports = {
    getMedicos,
    createMedicos,
    deleteMedicos,
    updateMedicos
};