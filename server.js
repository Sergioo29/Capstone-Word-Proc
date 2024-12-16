const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const mongodb = require('./database/connect');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { auth } = require('express-openid-connect')
require('dotenv').config();

// OAuth configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.URL || 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER
};

// Node Express uses and routes --------------------

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(cors());

app.use(express.json());

app.use(auth(config)); // Add OAuth middleware

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static('public')); // For CSS files to work

app.use('/', require('./routes'))

// Protected route example
app.get('/profile', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json(req.oidc.user);
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

// Node Express Initializer / Listener ---------------
mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on http://localhost:${port}`);
    }
  });