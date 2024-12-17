const router = require('express').Router();
const controller = require('../controllers/baseController.js');
const documentsRouter = require('./documents.js'); // Import the documents router

// GET routes -----------------------------------
router.get('/', controller.getHomepage);

router.use('/documents', (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        documentsRouter(req, res, next); // Pass the request to the documents router
    } else {
        res.status(401).render('./blockedPage.ejs'); // Render the blocked page for unauthenticated users
    }
});

// EXPORT -----------------------------------------
module.exports = router;
