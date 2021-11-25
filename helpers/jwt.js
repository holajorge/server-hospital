const jwt = require('jsonwebtoken');

const generarJWT = (user_id) => {
    
    return new Promise( (resolve, reject) => {
        const payload = {user_id}

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {expiresIn: '12h'},
            (err, token) =>{
                if(err){
                    console.log(err);
                    reject('no se puedo genera el token');
                }else{
                    resolve(token);
                }

            }
        )
    })    
}

module.exports = {
    generarJWT
}