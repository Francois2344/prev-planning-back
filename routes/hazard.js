const router = require('express').Router();
const Hazard = require('../models/hazard.model');

/**
 * @swagger
 * components:
 *    schemas:
 *      hazard:
 *          type: object
 *          required:
 *              -hazardName
 *          properties:
 *             hazardName:
 *              type: string
 */

/**
 * @swagger
 * /hazards:
 *   get:
 *      summary: Liste des aléas
 *      parameters:
 *      - in: path
 *        name: hazardName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Hazard]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 */

// ROUTE GET
router.get('/', (req, res) => {
  Hazard.find()
    .then((hazard) => res.json(hazard))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /hazards/add:
 *   post:
 *      summary: Ajout d'un aléas
 *      parameters:
 *      - in: path
 *        name: hazardName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Hazard]
 *      responses:
 *        200:
 *          description: Aleas ajouté
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 */

// ROUTE POST
router.post('/add', async (req, res) => {
  const { hazardName } = req.body;

  const newHazard = new Hazard({ hazardName });

  await newHazard
    .save()
    .then(() => res.json('Hazard added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /hazards/{id}:
 *   delete:
 *      summary: Supprimer un aléas
 *      parameters:
 *      - in: path
 *        name: hazardName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Hazard]
 *      responses:
 *        200:
 *          description: Suppression OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 */
// ROUTE DELETE
router.delete('/:id', (req, res) => {
  Hazard.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hazard deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /hazards/{id}:
 *   put:
 *      summary: Mettre à jour un aléas
 *      parameters:
 *      - in: path
 *        name: hazardName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Hazard]
 *      responses:
 *        200:
 *          description: Mise à jour OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/hazard'
 */

// ROUTE PUT
router.put('/:id', (req, res) => {
  Hazard.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Hazard updated'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
