const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController.js');
const validate = require('../middleware/validate');

router.get('/', documentController.getAllDocuments);

router.post('/', validate.saveDocument, documentController.addDocument);

module.exports = router;
