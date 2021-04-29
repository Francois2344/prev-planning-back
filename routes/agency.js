const router = require('express').Router();
const Agency = require('../models/agency.model');

/**
 * @swagger
 * components:
 *    schemas:
 *      agency:
 *          type: object
 *          required:
 *              -agencyName
 *          properties:
 *             agencyName:
 *              type: string
 */

/**
 * @swagger
 * /agencies:
 *   get:
 *      summary: Liste des actions agences
 *      parameters:
 *      - in: path
 *        name: agencyName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Agency]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 */

// ROUTE GET
router.get('/', async (req, res) => {
  await Agency.find()
    .then((agency) => res.json(agency))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
/**
 * @swagger
 * /agencies/add:
 *   post:
 *      summary: Ajouter une nouvelle action agence
 *      parameters:
 *      - in: path
 *        name: agencyName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Agency]
 *      responses:
 *        200:
 *          description: Action Enregistrée
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 *        400:
 *          description: Erreur de la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 */

// ROUTE POST
router.post('/add', async (req, res) => {
  const { agencyName } = req.body;

  const newAgency = new Agency({ agencyName });

  await newAgency
    .save()
    .then(() => res.json('Agency added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /agencies:
 *   delete:
 *      summary: Supprimer une action agence
 *      parameters:
 *      - in: path
 *        name: agencyName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Agency]
 *      responses:
 *        200:
 *          description: Action supprimée
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 *        400:
 *          description: Erreur requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 */

// ROUTE DELETE
router.delete('/:id', async (req, res) => {
  await Agency.findByIdAndDelete(req.params.id)
    .then(() => res.json('Agency deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /agencies:
 *   put:
 *      summary: Mettre à jour une action agence
 *      parameters:
 *      - in: path
 *        name: agencyName
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Agency]
 *      responses:
 *        200:
 *          description: Action mise à jour
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 *        400:
 *          description: Erreur requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/agency'
 */

// ROUTE PUT
router.put('/:id', async (req, res) => {
  await Agency.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Agency updated'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
