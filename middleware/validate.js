const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    ISBN: "required|string",
    title: "required|string|min:3",
    author: "required|string",
    genre: "required|string",
    publicationDate: "required|date",
    summary: "required|string|min:10",
    coverImageURL: "required|url",
  };
  
  

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
    const validationRule = {
      userID: "required|string",
      name: "required|string|min:3",
      email: "required|email",
      password: "required|string|min:8",
      role: "required|string|in:admin,user",
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  };

  const saveReview = (req, res, next) => {
    const validationRule = {
      reviewID: "required|string",
      userID: "required|string",
      rating: "required|integer|min:1|max:5",
      reviewText: "required|string|min:10",
      timestamp: "required|date",
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  };

  const saveMeeting = (req, res, next) => {
    const validationRule = {
      meetingID: "required|string",
      date: "required|date",
      time: "required|string",
      location: "required|string",
      attendees: "required|array|min:1",
      "attendees.*": "string",
      ISBN: "required|string",
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  };
  
module.exports = { saveBook, saveUser, saveReview, saveMeeting  };
