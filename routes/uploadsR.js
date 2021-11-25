/**
 * api/todo/upload
 */
const {Router, response} = require('express'); 
const espressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const {fileUpload, getImagenFile} = require('../controllers/uploadsCtrl');
const router = Router();
// midellware que captura el archivo
router.use(espressFileUpload());
router.put('/:tipo/:id',[validarJWT],fileUpload);
router.get('/:tipo/:img',[],getImagenFile);
 

module.exports = router;