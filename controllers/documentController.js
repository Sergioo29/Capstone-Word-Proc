const { get } = require('mongoose');
const mongodb = require('../database/connect.js');
const { MongoClient, ObjectId } = require('mongodb');

//-----------------------------------------------------------------------

const getAllDocuments = async (req, res, next) => {
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


const addDocument = async (req, res) => {
  const document = {
    title: req.body.title,
    content: req.body.content
  };
  const response = await mongodb.getDb().db('WordProc').collection('documents').insertOne(document);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the document.');
  }};


// EXPORT ---------------------------------------------------------------
module.exports = {getAllDocuments, addDocument};