const mongoose = require('mongoose');
//lets you reference items in .env
require('dotenv').config();

//connects to online DB
mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'Flashcards' })
  .then(console.log('connected to flashcards database'));
// .catch((err) => console.log(err))); **** fix this *****

//create a schema for our cards
const cardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
});

//create schema for our deck
const deckSchema = new mongoose.Schema({
  deckName: { type: String, required: true },
  cards: [cardSchema], // array of cards, each card is an obj
});

// const Deck = mongoose.model('Deck', deckSchema);
// // const Card = mongoose.model('Card', cardSchema, 'Deck');

// module.exports = {
//     Deck,
//     // Card,
// };

module.exports = mongoose.model('Deck', deckSchema, 'Deck');
