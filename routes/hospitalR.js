/**
 * Ruta: /api/hospitales
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validaCompos} = require('../middlewares/validar-campos');
const {getHospitales, crearHospital, actualizarHospital, borrarHospital} = require('../controllers/hospitalCtrl');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const validados = [ //midelware
    validarJWT,   
];
router.get('/',[validarJWT],getHospitales);
router.post('/',[validarJWT, check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),validaCompos] ,crearHospital);
router.put('/:id',[], actualizarHospital );
router.delete('/:id',[],borrarHospital );

module.exports = router;