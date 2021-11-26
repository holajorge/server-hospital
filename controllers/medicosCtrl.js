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

    const idMedico = req.params.id;
    const user_id = req.user_id;

    try{

        const medico = await Medico.findById(idMedico);
        if(!medico){
            res.status(404).json({
                ok: false,
                msg: "el ID del medico no existe"
            });    
        }
        const cambiosMedico = {
            ...req.body, //todos los datos
            usuario: user_id //guarar el id del ultimo usuario que hizo la modificacion 
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, cambiosMedico, {new:true});
        res.status(200).json({
            ok: true,
            msg: "actualizacion exitosa",
            medico:medicoActualizado
        });

    }catch(error){
        
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error inesperado, intente de nuevo"
        });
    }
  
 
}

const borrarMedicos = async (req, res = response) =>{
    const medicoID = req.params.id;

    try{

        const medico = await Medico.findById(medicoID);
        if(!medico){
            res.status(404).json({
                ok: false,
                msg: "el ID del medico no existe"
            });    
        }

        await Medico.findByIdAndDelete(medicoID);

        res.status(200).json({
            ok: true,
            msg: "Eliminado correctamente"
        });

    }catch(error){
        res.status(400).json({
            ok: false,
            msg: "error no esperado"
        });
    }
    
}
module.exports = {
    getMedicos, crearMedicos, actualizarMedicos, borrarMedicos
}