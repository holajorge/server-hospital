const {response} = require('express');
const User = require('../models/usuarioM');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) =>{

    const {email, password} = req.body;
    
    try{
        // buscar si hay considencias
        const usuario = await User.findOne({email});
        // console.log(usuario);
        if(!usuario){
            return res.status(404).json({ok:false, msg: 'Email no valido'})
        }
        // validar pass
        const validPass = bcrypt.compareSync(password, usuario.password);
        if(!validPass){
            return res.status(404).json({ok: false,msg:'error verifique las credenciales'});
        }
        //generar un token - jwt
        const token = await generarJWT(usuario._id);
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
const googleSignIn = async (req, res = response) =>{
    const googleToken = req.body.token;

    try{
        const {name, email, picture} = await googleVerify(googleToken);

        //validar que ya exista el email 
        const usuario = await User.findOne({email});
        let user;
        if(!usuario){
            user = new User({
                nombre: name,
                email, 
                password: '@@@', //se le quita la contraseña normal para que pueda entrar por google
                img: picture,
                google:true
            })
        }else{
            //existe user
            user = usuario;
            user.google = true;
            user.password = '@@@'; //se le quita la contraseña normal para que pueda entrar por google
        }
        await user.save();
        const token = await generarJWT(user._id);

        res.json({
            ok: true,
            msg:'Google Signin',
            token
        });
    }catch(error){
        res.status(404).json({
            ok: false,
            msg:'token no es correcto',
        });
    }
   
}
const renewToken = async (req, res = response) =>{
    const userid = req.user_id;
    const token = await generarJWT(userid);

    res.json({
        ok: true,
        userid,
        token
    })
}
module.exports = {
    login, googleSignIn, renewToken
}