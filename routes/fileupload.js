const router = require('express').Router();
const { upload } = require('../helpers/filehelper');
const {
  singleFileUpload,
  getallSingleFiles,
} = require('../controllers/fileuploaderController');

router.post('/singleFile', upload.single('photo'), singleFileUpload);
router.get('/', getallSingleFiles);

module.exports = {
  routes: router,
};
