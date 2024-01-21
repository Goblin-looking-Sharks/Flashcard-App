const Deck = require('./model');
const router = require('express').Router();

//do we need this here? I think it is already in server.js (app.get)
//visiting home page??
// GET '/'

router.get('/', async (req, res, next) => {
  console.log('sucessful get');

  const getDecks = await Deck.find();
  return res.status(200).json(getDecks);
});

//create a new deck in the database
//POST '/api/deck'
//deck info will be sent in req body
//send created deck in routers in server.js
router.post('/', (req, res, next) => {
  const { deckName, cards } = req.body;
  console.log('deck:', deckName);
  console.log('cards', cards);
  console.log('is this working?');
  Deck.create(req.body) //
    .then((data) => {
      res.locals.newDeck = data;
      console.log('it worked');
      return res.status(200).json(res.locals.newDeck);
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.post',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

//delete a deck from the database
//DELETE '/api/deck'
//deck info will be in req param deckName?
//send success status code in router in server.js
router.delete('/deck/:deckId', async (req, res, next) => {
  // try {
  //     const data = await Deck.deleteOne({deckName: req.params.deckName});
  //     if (data.deletedCount === 0){
  //         return next({
  //             log: 'Express error handler caught in DeckController.delete',
  //             status: 400,
  //             message: {error: 'Deck not found'},
  //         });
  //     }
  //     res.locals.message = 'Deleted ' + data.deletedCount + ' deck';
  //     return res.status(200).json(res.locals.message);
  // } catch (error) {
  //     return next({
  //         log: 'Express error handler caught in DeckController.delete',
  //         status: 400,
  //         message: { error: `${error}` },
  //     });
  // }
  const deckId = req.params.deckId;
  await Deck.findByIdAndDelete(deckId)
    .then((data) => {
      //if desk doesn't exisit
      if (data.deletedCount === 0) {
        return next({
          log: 'Express error handler caught in DeckController.delete',
          status: 400,
          message: { error: 'Deck not found' },
        });
      }
      //if deck exists
      res.locals.message = 'Deleted deck';
      return res.status(200).json(res.locals.message);
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.delete',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

//get a deck from the database
//GET '/deck/:deckId/' then redirect to '/deck/:deckId/card' on CardController.js
//deck name will be in the req param deckName?
//send deck in routers in server.js
router.get('/deck/:deckId', async (req, res, next) => {
  const deckId = req.params.deckId;
  await Deck.findById(deckId)
    .then((data) => {
      //if deck doesn't exist
      if (!data) {
        return next({
          log: 'Express error handler caught in DeckController.getDeck',
          status: 400,
          message: { error: `${error}` },
        });
      }
      console.log('Found Deck');
      //if deck exists, redirect to '/deck/:deckId/card'
      res.redirect(200, '/deck/:deckId/card');
      // res.locals.getDeck = data;
      // return res.status(200).json(res.locals.getDeck);
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.getDeck',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

module.exports = router;
