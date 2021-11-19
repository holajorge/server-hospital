const { Schema, model } = require('mongoose');
const { getUsuarios } = require('../controllers/usuariosCtrl');

const UserSchema = Schema({
    nombre: {type: String, required: true },
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    img: {type: String},
    role: {type: String, required: true, default: 'USER_ROLE'},
    google: {type: Boolean, default: false}
})

UserSchema.method('toJSON', function(){
    const {_v, _id, password,...object} = this.toObject();
    object.usuario_id = _id;
    return object;
});


module.exports = model('User', UserSchema);