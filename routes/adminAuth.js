/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminAuth = require('../models/adminAuth.model');

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
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
