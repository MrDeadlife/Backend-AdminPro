const { Router } = require('express');
const { fileUploads, retornarImg } = require('../controllers/upload.controller');
const expressFileUpload = require('express-fileupload');
const router = Router();

router.use(expressFileUpload());
router.put('/:tipo/:id', fileUploads);
router.get('/:tipo/:foto', retornarImg);

module.exports = router;