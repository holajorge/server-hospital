const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/usuarioM');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) =>{
    const usuario = await User.find({},'nombre email');
    res.json({
        ok: true,
        user_id: req.user_id,
        usuarios:usuario,
    });
}
const crearUsuario = async (req, res = response) =>{
    const {nombre,password, email} = req.body;    
    
    try{    
        const existeEmail = await User.findOne({email:email})
        if(existeEmail){
            return res.status(400).json({ok: false,msg: 'El correo ya esta registrado'});
        }

        const usuario = new User(req.body);
        const salt = bcrypt.genSaltSync(); //generado aleatoriamente
        usuario.password = bcrypt.hashSync(password, salt); //cambiando el req password  por el salt
        const NewUser = await usuario.save({new: true});
        const token = await generarJWT(NewUser._id)
        res.json({
            ok: true,
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inseperado...revisar logs'
        })
    }
    
    
}
const actualizarUser = async (req, res = response) => {
    const user_id = req.params.id;
    
    try{
        const usuarioDB = await User.findById(user_id);
        console.log(usuarioDB);
        if(!usuarioDB){
            res.status(401).json({
                ok: true,
                msg: "No existe un usuario por ese Id"
            });
        }

        // actualizar
        const {password, google,  email, ...campos} = req.body;
        if(usuarioDB.email !== email){
           
            const existeEmail = await User.findOne({email}); 
            if(existeEmail){
                return res.status(400).json({
                    ok: false, msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        // delete campos.password; //para liminar algun elemento del objeto
        // delete campos.google;
        campos.email = email;
        const usuarioActualizado = await User.findByIdAndUpdate(user_id, campos, {new: true});
    
        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ok:false, msg: 'error inesperado'});
    }
}
const borrarUser = async (req, res = response) =>{
    const user_id = req.params.id;
    
    try{
        const usuario = await User.findById({_id:user_id});
        if(!usuario){
            res.status(200).json({
                ok: false,
                msg: "No existe usuario por ese id"
            });
        }
        await User.findByIdAndDelete(user_id);
        res.status(200).json({
            ok: true,
            msg: "Usuario Eliminado"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: "Error inesperado"
        });
    }
}
module.exports = {
    getUsuarios,crearUsuario, actualizarUser, borrarUser
}