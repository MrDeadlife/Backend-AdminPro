const { Schema, model } = require('mongoose');

const hospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'usuarioModel'
    }
}, { collection: 'hospitales' });/* { collection:'hospitales'} cambiando de nombre en la creacion de coleccion */

/* 
 user:{
        type: Schema.Types.ObjectId, //hace referencia con
        ref: 'usuario' // modelo de referencia
    }
*/

hospitalSchema.method('toJSON', function () {
    const { _v, ...object } = this.toObject();
    return object;
})

module.exports = model('hospitalModel', hospitalSchema);   