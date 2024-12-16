const router = require('express').Router();
const controller = require('../controllers/baseController.js');
const documentsRouter = require('./documents.js'); // Assuming documents.js contains your document routes

// GET routes -----------------------------------
router.get('/', controller.getHomepage);

// Route for /documents
router.use('/documents', (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        // If authenticated, proceed to the documents route handler
        return next(); // Pass control to the documents router
    } else {
        // If not authenticated, render blocked page
        return res.status(401).render('./blockedPage.ejs');
    }
}, documentsRouter);  // Use the documentsRouter here

// EXPORT -----------------------------------------
module.exports = router;
