// import express on our project
const express = require('express');
const session = require('express-session');
const cors = require('cors');

// import our router api to get the information from our database
const routerApi = require('./routers/api.router');

const app = express();

// Since we will get json from our API, we use body-parser for json
app.use(express.json());

app.use(cors('*'));

app.use(session({
  secret: 'Guess it!',
  resave: true, //
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60), // time without activity tha you can be stay connected
  },
}));

app.use(routerApi);

module.exports = app;
