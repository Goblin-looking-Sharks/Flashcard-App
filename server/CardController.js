const router = require('express').Router();
const Deck = require('./model');


//>>>>THE FOLLOWING CODE IS UNNECESSARY AS OF 1/23 11:11<<<<
//>>>>          VIEWER DISCRETION IS ADVISED            <<<<
// //show card
// router.get('/:deckId/card', async (req, res, next) => {
//   try {
//     //assign params.deckId to a variable for readability
//     const deckId = req.params.deckId;
//     //search the database for a stored deck based on the deckID
//     const deck = await Deck.findById(deckId);
//     //check if the findbyID returns null (no deck by given id)
//     if (!deck) {
//       //if null, return an error
//       return res.status(404).json({ error: 'Could not find deck' });
//     }
//     //return the deck as a json object
//     res.json(deck);
//   } catch (error) {
//     next({
//       log: `Caught error in CardController GET middleware: ${error}`,
//       status: 404,
//       message: {err: 'Trouble retrieving the card from this deck. Try again'}
//     });
//   }
// });

//create card
router.post('/:deckId/card', async (req, res, next) => {
  try {
    //assign params.deckId to a variable for readability
    const deckId = req.params.deckId;
    //retrieve deck and assign it to variable
    const deck = await Deck.findById(deckId);
    //check if no deck was found
    //>>>>the following code seems to never be read in case of an invalid deckID; not sure why<<<<
    // if (!deck) {
    //   return res.status(404).json({ error: 'Could not find deck' });
    // }
    //>>>>                           above code deprecated                                    <<<<
    //once deck is retrieved, destructure the request body into front and back
    const { front, back } = req.body;
    //push into retrieved deck's array a new object containing front and back entries from request body
    deck.cards.push({ front, back });
    //update the modified deck
    await deck.save();
    //redirect to GET in deckController
    res.redirect('/');
  } catch (error) {
    //if an error is caught, send to global error handler
    next({
      log: `Caught error in CardController POST middleware: ${error}`,
      status: 400,
      message: 'Trouble adding new card to this deck. Try again.',
    });
  }
});

//delete card
router.delete('/:deckId/card', async (req, res, next) => {
  try {
    //assign params.deckId to a variable for readability
    const deckId = req.params.deckId;
    //destructure the id of the card to be deleted from the request body
    const { deletedCardID } = req.body;
    //update the deck to have the requested card removed
    await Deck.updateOne(
      //find the card with a matching id
      { _id: deckId },
      //pull said card
      { $pull: { cards: { _id: deletedCardID } } }
    );
    //redirect to GET in deckController
    res.redirect('/');
  } catch (error) {
    //if an error is caught, send to global error handler
    next({
      log: `Caught error in CardController DELETE middleware: ${error}`,
      status: 400,
      message: 'Trouble adding new card to this deck. Try again.',
    });
  }
});

module.exports = router;
