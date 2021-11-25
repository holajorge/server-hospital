const {response} = require('express');
const Medico = require('../models/medicosM');
const getMedicos = async (req, res = response) =>{
    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
}
const crearMedicos = async (req, res = response) =>{
    const user_id = req.user_id;
    const medico = new Medico({
        usuario:user_id, 
        ...req.body
    });

    try{
        const newMedico = await medico.save(); 

        res.status(200).json({
            ok: true,
            medico: newMedico
        });

    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error inesperado, revise los datos"
        });
    }
}

const actualizarMedicos = async (req, res = response) =>{
  
    res.json({
        ok: true,
        msg: "Actualizar Medicos"
    });
}

const borrarMedicos = async (req, res = response) =>{
  
    res.json({
        ok: true,
        msg: "Borrar Medicos"
    });
}
module.exports = {
    getMedicos, crearMedicos, actualizarMedicos, borrarMedicos
}