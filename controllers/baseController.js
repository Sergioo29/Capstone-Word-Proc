const { get } = require('mongoose');
const mongodb = require('../database/connect.js');
const { MongoClient, ObjectId } = require('mongodb');

//-----------------------------------------------------------------------

const getHomepage = async (req, res, next) => {
    let message = "Please Log in";
    if (req.oidc.isAuthenticated()) {
        message = "Welcome back! You are authenticated!";
    } 
    res.status(200).render('./homepage.ejs', {message} );
  };
  
  // EXPORT ---------------------------------------------------------------
  module.exports = {getHomepage};