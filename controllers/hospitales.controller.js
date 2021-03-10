const { response } = require("express");
const hospitalesModel = require("../models/hospitales.model");
const hospitalModel = require('../models/hospitales.model');


const getHospitales = async (req, resp = response) => {
    const hospitales = await hospitalesModel.find().populate('user', 'name email img');
    resp.json({
        ok: 'true',
        hospitales
    });
};

const createHospitales = async (req, resp = response) => {
    //el uid se obtiene despues de la validacion del token
    const uid = req.uid;
    console.log(uid);
    hospital = new hospitalModel({
        user: uid,
        ...req.body
    });

    const { name, user } = req.body;
    const hospitalExist = await hospitalModel.findOne({ name });
    if (hospitalExist) {
        console.log('entro');
        resp.json({
            ok: false,
            msj: 'Ya hay un hospital registrado con ese nombre.'
        });
        return;
    }

    try {
        const hospitalDB = await hospital.save();

        resp.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        //   console.log(error);
        resp.status(400).json({
            ok: false,
            error: 'Hubo un error en la creacion del hospital'
        });
    }
};

const deleteHospitales = (req, resp = response) => {
    resp.json({
        ok: 'true',
        msj: 'Estas eliminando un hospitale!'
    });
};

const updateHospitales = (req, resp = response) => {
    resp.json({
        ok: 'true',
        msj: 'Estas actualizando un hospitales!'
    });
};


module.exports = {
    getHospitales,
    createHospitales,
    deleteHospitales,
    updateHospitales
};