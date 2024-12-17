const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController.js');
const mongodb = require('../database/connect.js');
const { ObjectId } = require('mongodb');  // <-- Fix here
const validate = require('../middleware/validate');

router.get('/', documentController.getAllDocuments);

router.get('/new', (req, res) => { res.render('newDocument');});

router.post('/', documentController.addDocument);

router.get('/:id/edit', async (req, res) => {
  const documentId = req.params.id;
  const db = mongodb.getDb().db('WordProc');
  const document = await db.collection('documents').findOne({ _id: new ObjectId(documentId) });  // <-- Fix here

  if (document) {
    res.render('editDocument', { document });
  } else {
    res.status(404).send('Document not found');
  }
});  

router.put('/:id', documentController.editDocument);

router.delete('/:id', documentController.deleteDocument);

module.exports = router;