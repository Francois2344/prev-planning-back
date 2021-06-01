const router = require('express').Router();
const { upload } = require('../helpers/filehelper');
const {
  singleFileUpload,
  getallSingleFiles,
} = require('../controllers/fileuploaderController');

/**
 * @swagger
 * components:
 *    schemas:
 *      fileUpload:
 *          type: object
 *          required:
 *              -fileName
 *              -filePath
 *              -fileType
 *              -FileSize
 *          properties:
 *             fileName:
 *              type: string
 *             filePath:
 *              type: string
 *             fileType:
 *              type: string
 *             fileSize:
 *              type: string
 */
/**
 * @swagger
 * /imagesUpload/singleFile:
 *   post:
 *      summary: upload photo
 *      parameters:
 *      - in: path
 *        name: fileName, filePath, fileType, fileSize
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Upload Photo]
 *      responses:
 *        201:
 *          description: Fichier enregistré avec succès
 *          content:
 *            form-data:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/fileupload'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            form-data:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/fileupload'
 */

/**
 * @swagger
 * /imagesUpload:
 *   get:
 *      summary: Affichage des photos
 *      parameters:
 *      - in: path
 *        name: fileName, filePath, fileType, fileSize
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Upload Photo]
 *      responses:
 *        200:
 *          description: Success
 *          content:
 *            form-data:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/fileupload'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            form-data:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/fileupload'
 */

router.post('/singleFile', upload.single('photo'), singleFileUpload);
router.get('/', getallSingleFiles);

module.exports = {
  routes: router,
};
