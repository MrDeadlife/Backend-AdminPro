const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    img: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    }

}, { collection: 'usuarios' });

usuarioSchema.method('toJSON', function () {
    const { _v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('usuarioModel', usuarioSchema);   