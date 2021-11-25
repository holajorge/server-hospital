const {response} = require('express');
const User = require('../models/usuarioM');
const Medico = require('../models/medicosM');
const Hospital = require('../models/hospitalM');

const busqueda = async (req, res = response) =>{
    const parametro = req.params.params;
    const regex = new RegExp(parametro, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        User.find({nombre:regex}),
        Hospital.find({nombre:regex}),
        Medico.find({nombre:regex})
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos,
    })
}
const getDocumetoColeccion =  async (req, res = response) =>{

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch(tabla){
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre');            
            break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex}).populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await User.find({nombre: regex});
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser Usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok: true,
        resultado: data
    });
}

module.exports = {
    busqueda,getDocumetoColeccion
}