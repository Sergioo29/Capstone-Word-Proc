const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const mongodb = require('./database/connect');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Header = require('./react/Header');
const { auth } = require('express-openid-connect');
require('dotenv').config();

// OAuth configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.URL || 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
};

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());

// OAuth middleware
app.use(auth(config));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to render the React header
app.use((req, res, next) => {
  const reactHeader = ReactDOMServer.renderToString(React.createElement(Header));
  res.locals.reactHeader = reactHeader; // Makes it accessible in all EJS templates
  next();
});

// Routes
app.use('/', require('./routes'));

// Protected route example
app.get('/profile', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json(req.oidc.user);
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

// Node Express Initializer / Listener
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on http://localhost:${port}`);
  }
});
