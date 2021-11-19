const {response} = require('express');
const User = require('../models/usuarioM');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) =>{

    const {email, password} = req.body;
    
    try{
        // buscar si hay considencias
        const usuario = await User.findOne({email});
        console.log(usuario);
        if(!usuario){
            return res.status(404).json({ok:false, msg: 'Email no valido'})
        }
        // validar pass
        const validPass = bcrypt.compareSync(password, usuario.password);
        if(!validPass){
            return res.status(404).json({ok: false,msg:'error verifique las credenciales'});
        }
        //generar un token - jwt
        const token = await generarJWT(usuario._id)
        res.status(200).json({
            ok: true,
           token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'error inesperado'
        });
    }
    
}

module.exports = {
    login
}