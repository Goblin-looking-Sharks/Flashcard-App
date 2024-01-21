const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const Deck = require('./model')


//require controllers:
const deckController = require('./DeckController');
const cardController =  require('./CardController')

// Parse JSON incoming
app.use(express.json());

// Accept requests from any domain - to be updated
app.use(cors({ origin: '*' }));

// Serve static files and the index.html file
app.use('/', express.static(path.join(__dirname, '../client')));
//renders homepage:
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

//use controllers
console.log('this is right before deck controller');
app.use('/', deckController);
app.use('/deck/:deckId', cardController); //may not work with ':', double-check here

// Serve 404 error to all other unknown routes
app.use('*', (req, res) => res.status(404).send('Page not found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middlware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  // Use default err mashed with changes from passed in err
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

// Listen for port
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));