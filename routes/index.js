const router = require('express').Router();
controller = require('../controllers/baseController.js');

// GET routes -----------------------------------
router.get('/', controller.getHomepage); 
router.use('/documents', (req, res) => { 
        if (req.oidc.isAuthenticated()) {
            require('./documents.js');
        } else {
            res.status(401).render('./blockedPage.ejs');
        }
    });

// EXPORT -----------------------------------------
module.exports = router;