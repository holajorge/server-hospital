/**
 * api/todo/params
 */
 const {Router} = require('express');
 const {check} = require('express-validator');
 const {validaCompos} = require('../middlewares/validar-campos');
 const { validarJWT } = require('../middlewares/validar-jwt');
 const {busqueda, getDocumetoColeccion} = require('../controllers/busquedaCtrl');

 const router = Router();
 router.get('/:params',[validarJWT],busqueda);
 router.get('/coleccion/:tabla/:busqueda',[validarJWT],getDocumetoColeccion);


 module.exports = router;