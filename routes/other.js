const router = require('express').Router();
const Other = require('../models/other.model');

/**
 * @swagger
 * components:
 *    schemas:
 *      other:
 *          type: object
 *          required:
 *              -otherName
 *          properties:
 *             otherName:
 *              type: string
 */

/**
 * @swagger
 * /others:
 *   get:
 *      summary: Liste autres evenements
 *      parameters:
 *      - in: path
 *        name: otherName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Other]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 */

// ROUTE GET
router.get('/', async (req, res) => {
  await Other.find()
    .then((other) => res.json(other))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /others/add:
 *   post:
 *      summary: Ajout d'un evenement autre
 *      parameters:
 *      - in: path
 *        name: otherName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Other]
 *      responses:
 *        200:
 *          description: autre evenement ajouté
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 */

// ROUTE POST
router.post('/add', async (req, res) => {
  const { otherName } = req.body;

  const newOther = new Other({ otherName });

  await newOther
    .save()
    .then(() => res.json('Other added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /others/{id}:
 *   delete:
 *      summary: Supression d'un evenement autre
 *      parameters:
 *      - in: path
 *        name: otherName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Other]
 *      responses:
 *        200:
 *          description: autre evenement supprimé
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 */

// ROUTE DELETE
router.delete('/:id', async (req, res) => {
  await Other.findByIdAndDelete(req.params.id)
    .then(() => res.json('Other deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /others/{id}:
 *   put:
 *      summary: Mise à jour d'un evenement autre
 *      parameters:
 *      - in: path
 *        name: otherName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Other]
 *      responses:
 *        200:
 *          description: autre evenement mise à jour
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/other'
 */

// ROUTE PUT
router.put('/:id', async (req, res) => {
  await Other.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Other updated'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
