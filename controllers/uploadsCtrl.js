const path = require('path');
const fs = require('fs'); //validar si existe un directorio
 
const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const {actualizarImg} = require('../helpers/actualizar-img');

const fileUpload = async (req,res = response)=>{
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tipoValidos = ['hospitales','medicos','usuarios']
    if(!tipoValidos.includes(tipo)){
        return res.status(400).json({
            ok: false, msg: 'No es un medido, usuario u hospital'
        });
    }
    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ok:false, msg:'no hay archivo'});
    }

    // Procesar la imagen
    const file = req.files.imagen; //obtener el archivo binario para luego moverlo
    const nombreCortado = file.name.split('.'); //separar la extencion del nombre
    const extencionArchivo = nombreCortado[nombreCortado.length-1]; //obtener la ultima posicion

    //validar extencion
    const extensionValida = ['png','jpg','jpeg','gif'];
    if(!extensionValida.includes(extencionArchivo)){
        return res.status(400).json({ok:false, msg:'no es una extencion valida'});
    }

    // generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    //ruta para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen a un directorio mv()    
    file.mv(path, function(err) {
        if (err){
            console.log(err);
            return res.status(500).json({ok:false,msg:'Error al mover la imagen'});
        }

        actualizarImg(tipo, id, nombreArchivo);

        res.status(200).json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    });
    
}   
const getImagenFile = async (req,res = response)=>{
    const img = req.params.img;
    const tipo = req.params.tipo;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    //imagenes por defecto 
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/pordefecto.png`);
        res.sendFile(pathImg);

    }


}
module.exports = {
    fileUpload, getImagenFile
}