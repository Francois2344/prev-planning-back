/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminAuth = require('../models/adminAuth.model');

/**
 * @swagger
 * components:
 *    schemas:
 *      adminAuth:
 *          type: object
 *          required:
 *              -email
 *              -passwordHash
 *          properties:
 *             email:
 *              type: string
 *             passwordHash:
 *              type: string
 */

/**
 * @swagger
 * tags:
 *   name: Register
 */

/**
 * @swagger
 * /register:
 *   post:
 *      summary: Enregistrer un nouvel administrateur
 *      parameters:
 *      - in: path
 *        name: email, password, passwordVerify
 *        schema:
 *          type: string
 *        required: true
 *
 *      tags: [Register]
 *      responses:
 *        200:
 *          description: Admin enregistré
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/adminAuth'
 *        400:
 *          description: Erreur de champs, 6 caractères min, compte déja existant, mot de passe non similaire
 *          content:
 *            application/json:
 *              schema:
 *                  items:
 *                  $ref: '#/components/schemas/adminAuth'
 */

// register

router.post('/', async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation

    if (!email || !password || !passwordVerify)
      return res.status(400).json({
        errorMessage: 'Merci de remplir tous les champs obligatoires. ',
      });
    if (password.length < 6)
      return res.status(400).json({
        errorMessage:
          "Merci d'entrer un mot de passe d'un minimum de 6 caractères.",
      });
    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Merci d'entrer le meme mot de passe deux fois.",
      });
    const existingAdminAuth = await AdminAuth.findOne({ email });
    if (existingAdminAuth)
      return res.status(400).json({
        errorMessage: 'ce compte existe déjà.',
      });

    // cryptage du mot de passe

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // sauvegarder un nouvel utilisateur

    const newAdminAuth = new AdminAuth({
      email,
      passwordHash,
    });

    const saveAdminAuth = await newAdminAuth.save();

    // enregistrer le token

    const token = jwt.sign(
      {
        admin: saveAdminAuth._id,
      },
      process.env.JWT_SECRET
    );
    // envoi du token en HTTP seulemennt cookie
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// log in

/**
 * @swagger
 * /register/login:
 *   post:
 *     summary: Connexion administrateur
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/adminAuth'
 *     responses:
 *       400:
 *         description: champs requis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/adminAuth'
 *       401:
 *          description: champs invalide
 *       500:
 *         description: server error
 *         headers:
 *            Set-Cookie:
 *              schema:
 *                type: boolean
 *                example: token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly
 */

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        errorMessage: 'Merci de remplir tous les champs obligatoires. ',
      });
    const existingAdminAuth = await AdminAuth.findOne({ email });
    if (!existingAdminAuth)
      return res.status(401).json({
        errorMessage: 'Email ou mot de passe invalide',
      });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingAdminAuth.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({
        errorMessage: 'Email ou mot de passe invalide',
      });

    const token = jwt.sign(
      {
        admin: existingAdminAuth._id,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(200)
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/**
 * @swagger
 * /register/logout:
 *   get:
 *     tags: [Logout]
 *     security:
 *      - cookieAuth: []
 *     description: deconnexion admin
 *     responses:
 *       '200':
 *         description: OK
 *
 */

router.get('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});
/**
 * @swagger
 * /register/loggedIn:
 *   get:
 *     tags: [LoggedIn]
 *     description: verification connexion
 *     responses:
 *       '200':
 *          description: OK
 *          headers:
 *           schema:
 *            type: boolean
 */
router.get('/loggedIn', (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
