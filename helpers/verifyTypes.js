const UsuarioModel = require('../models/usuario.model');
const HospitalModel = require('../models/hospitales.model');
const MedicoModel = require('../models/medicos.model');
const ValidacionTipo = (tipo) => {
    if (!tipo) {
        return false;
    }
}

const verifyType = async (id) => {
   
    switch (id) {
        case 'medicos':
            const Medico = await MedicoModel.findById(id);
            if(!Medico){
                return false;
            }
            break;
        case 'hospitales':
            const Hospital = await HospitalModel.findById(id);
            if(!Hospital){
                return false;
            }
            break;
        case 'usuario':
            Usuario = await UsuarioModel.findById(id);
            if(!Usuario){
                return false;
            }
            break;
    }
};

module.exports = { verifyType };