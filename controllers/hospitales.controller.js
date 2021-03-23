const { response } = require("express");
const hospitalesModel = require("../models/hospitales.model");
const hospitalModel = require('../models/hospitales.model');
const usuarioModel = require("../models/usuario.model");


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

const deleteHospitales = async (req, resp = response) => {
    const id = req.params.id;
    try {
        const hospital = await hospitalModel.findById(id);
        if (!hospital) {
            return resp.status(404).json({
                ok: false,
                msj: 'Hospital con id no registrado'
            });
        }
        await hospitalModel.findByIdAndDelete(id);

        resp.json({
            ok: true,
            msj: 'Hospital Eliminado correctamente!',
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msj: 'Cominicate con admin'
        });
    }
};

const updateHospitales = async (req, resp = response) => {
    const id = req.params.id;
    const uid = req.uid; //obtenemos el uid mediante el jwt (verificador de token)

    try {
        const hospital = await hospitalModel.findById(id);
        if (!hospital) {
            return resp.status(404).json({
                ok: false,
                msj: 'Hospital con id no registrado'
            });
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };
        //id de busqueda + datos por cambiar + regresar el ultimo dato actualizado en la peticion: true
        const hospitalActualizado = await hospitalModel.findByIdAndUpdate(id, cambiosHospital, { new: true });

        resp.json({
            ok: true,
            msj: 'Hospital actualizado correctamente!',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msj: 'Cominicate con admin '
        });
    }
};



module.exports = {
    getHospitales,
    createHospitales,
    deleteHospitales,
    updateHospitales
};