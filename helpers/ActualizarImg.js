const UsuarioModel = require('../models/usuario.model');
const HospitalModel = require('../models/hospitales.model');
const MedicoModel = require('../models/medicos.model');
const fs = require('fs');
const medicosModel = require('../models/medicos.model');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
};

const actualizarImg = async (tipo, id, nombreImagen) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const Medico = await MedicoModel.findById(id);
            //console.log(Medico);
            if (!Medico) {
                return false;
            }
            //Verificando si existe imagen anterior
            pathViejo = `./uploads/medicos/${Medico.img}`;
            borrarImagen(pathViejo);
            Medico.img = nombreImagen;
            await Medico.save();
            return true;
            break;
        case 'hospitales':
            const Hospital = await HospitalModel.findById(id);
            //console.log(Hospital);
            if (!Hospital) {
                return false;
            }
            //Verificando si existe imagen anterior
            pathViejo = `./uploads/hospitales/${Hospital.img}`;
            borrarImagen(pathViejo);
            Hospital.img = nombreImagen;
            await Hospital.save();
            return true;
            break;
        case 'usuario':
            Usuario = await UsuarioModel.findById(id);
            //console.log(Usuario);
            if (!Usuario) {
                return false;
            }
            //Verificando si existe imagen anterior
            pathViejo = `./uploads/hospitales/${Usuario.img}`;
            borrarImagen(pathViejo);
            Usuario.img = nombreImagen;
            await Usuario.save();
            return true;
            break;
    }
};

module.exports = { actualizarImg };