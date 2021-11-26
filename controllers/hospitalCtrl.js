const {response} = require('express');
const Hospital = require('../models/hospitalM');


const getHospitales = async (req, res = response) =>{
    const hospitales = await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    });
}
const crearHospital = async (req, res = response) =>{

    const user_id = req.user_id;
    const hospital = new Hospital({
        usuario:user_id,
        ...req.body
    });
    
    try{
        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    }catch(error){
        console.log(error);
        res.json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
   
}

const actualizarHospital = async (req, res = response) =>{
    const hospitalID = req.params.id;
    const user_id = req.user_id;

    try{

        const hospital = await Hospital.findById(hospitalID);
        if(!hospital){
            res.json({
                ok: false,
                msg: "el ID del hospital no existe"
            });    
        }        

        const cambiosHospital = {
            nombre: req.body.nombre, //todos los datos
            usuario: user_id //guarar el id del ultimo usuario que hizo la modificacion 
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalID, cambiosHospital, {new:true});

        res.json({
            ok: true,
            msg: "actualizacion existosa",
            hospital: hospitalActualizado
        });

    }catch(error){
        res.json({
            ok: false,
            msg: "error no esperado"
        });
    }
   
}

const borrarHospital = async (req, res = response) =>{
  
    const hospitalID = req.params.id;

    try{

        const hospital = await Hospital.findById(hospitalID);
        if(!hospital){
            res.status(404).json({
                ok: false,
                msg: "el ID del hospital no existe"
            });    
        }

        await Hospital.findByIdAndDelete(hospitalID);

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
    getHospitales, crearHospital, actualizarHospital, borrarHospital
}