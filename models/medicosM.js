const { Schema, model } = require('mongoose');
const { getMedicos } = require('../controllers/medicosCtrl');

const MedicoSchema = Schema({
    nombre: {type: String, required: true },
    img: {type: String},
    usuario: {type: Schema.Types.ObjectId, ref: 'User',  required: true},
    hospital: {type: Schema.Types.ObjectId, ref: 'Hospital', required: true},

}, {collection:'medicos'});

MedicoSchema.method('toJSON', function(){
    const {_v, ...object} = this.toObject();
    return object;
});


module.exports = model('Medico', MedicoSchema);