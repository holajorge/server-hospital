/**
 * Ruta: /api/usuarios
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validaCompos} = require('../middlewares/validar-campos');
const {getUsuarios, crearUsuario, actualizarUser, borrarUser} = require('../controllers/usuariosCtrl');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const validados = [ //midelware
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    validaCompos
];
router.get('/',validarJWT ,getUsuarios);
router.post('/',validados, crearUsuario);
router.put('/:id', validados ,actualizarUser );
router.delete('/:id',validarJWT,borrarUser );

module.exports = router;