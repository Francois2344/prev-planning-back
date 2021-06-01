const router = require('express').Router();
const Site = require('../models/site.model');

/**
 * @swagger
 * components:
 *    schemas:
 *      site:
 *          type: object
 *          required:
 *              -siteName
 *          properties:
 *             siteName:
 *              type: string
 */

/**
 * @swagger
 * /sites:
 *   get:
 *      summary: Liste des actions terrains
 *      parameters:
 *      - in: path
 *        name: siteName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Site]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 */

// ROUTE GET
router.get('/', async (req, res) => {
  await Site.find()
    .then((site) => res.json(site))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /sites/add:
 *   post:
 *      summary: Ajouter une action terrain
 *      parameters:
 *      - in: path
 *        name: siteName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Site]
 *      responses:
 *        200:
 *          description: Ajout d'une action terrain OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 */

// ROUTE POST
router.post('/add', async (req, res) => {
  const { siteName } = req.body;

  const newSite = new Site({ siteName });

  await newSite
    .save()
    .then(() => res.json('Site added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /sites/{id}:
 *   delete:
 *      summary: Supprimer une action terrain
 *      parameters:
 *      - in: path
 *        name: siteName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Site]
 *      responses:
 *        200:
 *          description: Action terrain supprimé
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 */

// ROUTE DELETE
router.delete('/:id', async (req, res) => {
  await Site.findByIdAndDelete(req.params.id)
    .then(() => res.json('Site deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /sites/{id}:
 *   put:
 *      summary: Mise à jour d'une action terrain
 *      parameters:
 *      - in: path
 *        name: siteName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Site]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/site'
 */

// ROUTE PUT
router.put('/:id', async (req, res) => {
  await Site.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Site updated'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
