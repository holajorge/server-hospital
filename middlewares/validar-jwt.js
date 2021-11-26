const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req,res=response, next)=>{

    // LEER TOKEN
    const token = req.header('x-token'); 
    
    if(!token){
        return res.status(401).json({ok:false, msg: 'No  hay token en la peticion'})
    }

    try{
        console.log('primero pasa qui');
        // console.log(process.env.JWT_SECRET);
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            if(err){
                console.log('errogggr',err);
                return res.status(401).json({ok:false, msg: 'Token mal formado', err});

            }else{
                const {user_id} = decoded;
                console.log('ID user:',user_id);
                req.user_id = user_id;
                next();

            }
            
        });
        // console.json(user_id);

    }catch(error){
        return res.status(401).json({ok:false, msg: 'Token no valido'});
    }

}



module.exports = {
    validarJWT
}