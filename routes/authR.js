/**
 * Ruta: /api/login
*/
const {Router} = require('express');
const router = Router();
const {login, googleSignIn} = require('../controllers/authCtrl');
const {check} = require('express-validator');
const {validaCompos} = require('../middlewares/validar-campos');

const validados = [ //midelware
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    validaCompos
];
router.post('/', validados,login);
router.post('/google', 
    [check('token', 'El token es obligatorio').not().isEmpty(),validaCompos
    ],googleSignIn
);




module.exports = router;