const { response } = require("express");
const hospitalesModel = require("../models/hospitales.model");
const medicosModel = require('../models/medicos.model');
const userModel = require('../models/usuario.model');


const getTodo = async (req, resp = response) => {
    const busqueda = req.params.busqueda;
    try {
        const regularEx = new RegExp(busqueda, 'i');

        const [hospital, medico, usuario] = await Promise.all([
            hospitalesModel.find({ name: regularEx }),
            medicosModel.find({ name: regularEx }),
            userModel.find({ name: regularEx })
        ]);

        resp.json({
            ok: true,
            usuario,
            medico,
            hospital
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msj: 'Contacte con el administrador'
        });
    }
};

const getByCollection = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regularEx = new RegExp(busqueda, 'i');
    let data = [];
    try {
        switch (tabla) {
            case 'medicos':
                data = await medicosModel.find({ name: regularEx })
                    .populate('user', 'name img')
                    .populate('hospital', 'name');
                break;
            case 'hospitales':
                data = await hospitalesModel.find({ name: regularEx })
                    .populate('user', 'name');
                break;
            case 'usuarios':
                data = await userModel.find({ name: regularEx });

                break;

            default:
                res.status(400).json({
                    ok: false,
                    msj: 'La tablas tienen que ser "usuarios, medicos, hospitales"'
                });
                break;
        }
        res.json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msj: 'Contacte con el administrador'
        });
    }
}

module.exports = {
    getTodo,
    getByCollection
};