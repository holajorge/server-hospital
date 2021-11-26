/**
 * Ruta: /api/hospitales
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validaCompos} = require('../middlewares/validar-campos');
const {getMedicos, crearMedicos, actualizarMedicos, borrarMedicos} = require('../controllers/medicosCtrl');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const validados = [ //midelware
    validarJWT,
];

router.get('/',[validarJWT],getMedicos);
router.post('/',
    [
        validarJWT, 
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validaCompos
    ] ,crearMedicos);
router.put('/:id',[
    validarJWT, 
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validaCompos
    ], actualizarMedicos 
);
router.delete('/:id',[validarJWT],borrarMedicos );

module.exports = router;