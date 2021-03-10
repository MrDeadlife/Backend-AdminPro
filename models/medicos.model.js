const { Schema, model } = require('mongoose');

const medicosSchema = Schema({
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
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'hospitalModel'
    }
}, { collection: 'medicos' });

medicosSchema.method('toJSON', function () {
    const { _v, ...object } = this.toObject();
    return object;
})

module.exports = model('medicosModel', medicosSchema);   