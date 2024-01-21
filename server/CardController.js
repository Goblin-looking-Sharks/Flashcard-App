const router = require('express').Router();
const Deck = require('./model');

//show card
router.get('/', async (req, res) => {
  try {
    const { deckId } = req.params;
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Could not find deck' });
    }
    console.log(`found deck ${deck.deckName}`);
    res.json(deck);
  } catch (error) {
    console.log('Error finding deck');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//create card
router.post('/', async (req, res) => {
  try {
    const { deckID, front } = req.body;
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Could not find deck' });
    }
    deck[front] = undefined;
    deck.save();
    console.log('created card');
    res.redirect('/');
  } catch (error) {
    console.log('Error creating card');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete card
router.delete('/', async (req, res) => {
  try {
    const { deckId } = req.body;
    const deck = await Deck.findByIdAndDelete(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Could not find deck' });
    }
    console.log('deleted card');
    res.redirect('/');
  } catch (error) {
    console.log('Error creating card');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
