const router = require('express').Router();
const User = require('../models/preventer.model');
const authPrivate = require('../middleware/authPrivate');

/**
 * @swagger
 * components:
 *    schemas:
 *      users:
 *          type: object
 *          required:
 *              -firstname
 *              -lastname
 *          properties:
 *             firstname:
 *              type: string
 *             lastname:
 *              type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *      summary: Liste des Preventeurs
 *      parameters:
 *      - in: path
 *        name: firstname, lastname
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [User]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 */

// ROUTE GET
router.get('/', async (req, res) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *      summary: Liste des Preventeurs
 *      parameters:
 *      - in: path
 *        name: firstname, lastname
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [User]
 *      responses:
 *        200:
 *          description: Liste OK
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 */

router.get('/:id', async (req, res) => {
  await User.findById(req.params.id)
    .then(() => res.json())
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /users/add:
 *   post:
 *      summary: Ajout d'un Preventeur
 *      parameters:
 *      - in: path
 *        name: firstname, lastname
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [User]
 *      responses:
 *        200:
 *          description: Preventeur ajouté
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 */

// ROUTE POST
router.post('/add', authPrivate, async (req, res) => {
  const { firstname } = req.body;
  const { lastname } = req.body;

  const newUser = new User({ firstname, lastname });

  await newUser
    .save()
    .then(() => res.json('User added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *      summary: Supprimé un Préventeur
 *      parameters:
 *      - in: path
 *        name: firstname, lastname
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [User]
 *      responses:
 *        200:
 *          description: Preventeur supprimé
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 *        400:
 *          description: Erreur dans la requête
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/users'
 */

// ROUTE DELETE
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
