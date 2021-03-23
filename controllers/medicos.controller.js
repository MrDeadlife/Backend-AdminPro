const { response } = require("express");
const { findOneAndDelete, findByIdAndDelete } = require("../models/medicos.model");
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

const deleteMedicos = async (req, resp = response) => {
    const id = req.params.id;

    try {
        const medico = await medicosModel.findById(id);
        if (!medico) {
            return resp.json({
                ok: false,
                msj: 'id no registrado'
            });
        }
        await medicosModel.findByIdAndDelete(medico);
        resp.json({
            ok: true,
            msj: 'Medico eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msj: 'Comunicate con el administrador'
        });
    }
};


const updateMedicos = async (req, resp = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medico = await medicosModel.findById(id);
        console.log(medico.name);
        if (!medico) {
            resp.json({
                ok: false,
                msj: 'ID no registrado'
            });
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await medicosModel.findByIdAndUpdate(id, cambiosMedico, { new: true });

        resp.json({
            ok: true,
            msj: 'Medico actualizado correctamente',
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msj: 'Comunicate con el administrador'
        });
    }
};


module.exports = {
    getMedicos,
    createMedicos,
    deleteMedicos,
    updateMedicos
};