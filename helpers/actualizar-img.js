const fs = require('fs'); //validar si existe un directorio
/*
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));

*/ 
const User = require('../models/usuarioM');
const Medico = require('../models/medicosM');
const Hospital = require('../models/hospitalM');

const borrarImg = (path)=>{

    if(fs.existsSync(path)){ 
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}
const actualizarImg = async (tipo, id, nombreArchivo)=>{
    let pathViejo = "";
    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                //no hay medico encontrado
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImg(pathViejo);
            
            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                //no hay hospital encontrado
                return false;
            }
            pathViejo = `./uploads/hospital/${hospital.img}`;
            borrarImg(pathViejo);
            
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await User.findById(id);
            if(!usuario){
                //no hay usuario encontrado
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImg(pathViejo);
            
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'no existe el tipo'
            });
    }

    console.log('vamos bien');
}

module.exports = {
    actualizarImg
}