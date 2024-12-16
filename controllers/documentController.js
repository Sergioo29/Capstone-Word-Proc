const { get } = require('mongoose');
const mongodb = require('../database/connect.js');
const { MongoClient, ObjectId } = require('mongodb');

const controllers = {}


//-----------------------------------------------------------------------

controllers.getAllDocuments = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('WordProc').collection('documents').find();
    const documents = await result.toArray();

    // Check the Accept header to determine the response format
    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes('text/html')) {
      // Respond with HTML
      res.setHeader('Content-Type', 'text/html');
      res.status(200).render('./documents.ejs', { documents });
    } else {
      // Respond with JSON
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(documents);
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'An error occurred while fetching documents.' });
  }
};


controllers.addDocument = async (req, res) => {
  const document = {
    title: req.body.title,
    content: req.body.content
  };
  const response = await mongodb.getDb().db('WordProc').collection('documents').insertOne(document);
  if (response.acknowledged) {
    let message = "Success!"
    res.status(200).render('./successPage.ejs', {message} );

  } else {
    let message = "Error! " + response.error
    res.status(500).render('./successPage.ejs', {message} );
  }};


controllers.editDocument = async (req, res, next) => {
    try {
      const id = new ObjectId(req.params.id);
      const Newdoc = {
        title: req.body.title,
        content: req.body.content
      };
  
      const response = await mongodb.getDb().db('WordProc').collection('documents').replaceOne({ _id: id }, Newdoc);
  
      if (response.modifiedCount > 0) {
        let message = "Success!";
        res.status(200).render('./successPage.ejs', {message} );
      } else {
        let message = "Error! Nothing happened.";
        res.status(500).render('./successPage.ejs', {message} );
      }
    } catch (error) {
      let message = "Error! " + error;
      res.status(500).render('./successPage.ejs', {message} );
    }
  };

  controllers.deleteDocument = async (req, res, next) =>{
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('WordProc').collection('documents').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      console.log(`${response}, got removed.`);
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error deleting.');
    }
  };

// EXPORT ---------------------------------------------------------------
module.exports = controllers