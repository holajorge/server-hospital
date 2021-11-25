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
  
    res.json({
        ok: true,
        msg: "Actualizar hospital"
    });
}

const borrarHospital = async (req, res = response) =>{
  
    res.json({
        ok: true,
        msg: "Borrar hospital"
    });
}
module.exports = {
    getHospitales, crearHospital, actualizarHospital, borrarHospital
}