const {response} = require('express');
const {validationResult} = require('express-validator');

const validaCompos = (req, res = response, next)=>{

    const errores = validationResult(req); //para añadir todos los errores
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false, errors: errores.mapped()
        })
    }
    next();
}

module.exports = {
    validaCompos
}