const router = require('express').Router();
controller = require('../controllers/baseController.js');

// GET routes -----------------------------------
router.get('/', controller.getHomepage); 
router.use('/documents', require('./documents.js'));

// EXPORT -----------------------------------------
module.exports = router;