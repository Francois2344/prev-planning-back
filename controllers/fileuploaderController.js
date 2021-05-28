/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-template */
const SingleFile = require('../models/singlefile.model');

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
  );
};

// upload de l'image

const singleFileUpload = async (req, res) => {
  try {
    const file = new SingleFile({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    });
    await file.save();
    console.log(file);
    res.status(201).send('Fichier enregistré avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// affichage de l'image

const getallSingleFiles = async (req, res) => {
  try {
    const files = await SingleFile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  singleFileUpload,
  getallSingleFiles,
};
