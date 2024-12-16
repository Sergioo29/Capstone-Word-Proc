const router = require('express').Router();
controller = require('../controllers/baseController.js');

// GET routes -----------------------------------
router.get('/', controller.getHomepage); 
router.use('/books', require('./books'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));
router.use('/meetings', require('./meetings'));
router.get('/about', controller.getAboutPage)
// EXPORT -----------------------------------------
module.exports = router;