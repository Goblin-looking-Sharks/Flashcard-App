const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = 'http://localhost:3000';
const Deck = require('../../server/model');

describe('CardController Routes', () => {
  //declare variable to store ID outside tests for accessibility
  let deckId;
  //create a mock deck to work with and assign the id to the deckId variable
  beforeAll(async () => {
    const newDeck = await Deck.create({deckName: 'Test', cards: []});
    const { _id } = newDeck;
    deckId = _id;
  })
  //delete created mock deck once the tests are run
  afterAll(async () => {
    await Deck.findByIdAndDelete(deckId);
  })
  //post test suite
  describe('POST', () => {
    it('creates a new card in the deck', async () => {
      //create a mock card
      const mockCard = { front: 'Front Text', back: 'Back Text' };
      // Send a POST request to create a new card
      const response = await request(server)
        .post(`/deck/${deckId}/card`)
        .send(mockCard);
      // Check if the response is successful
      expect(response.status).toBe(302);
      // Check if the response body is an object
      expect(response.body).toBeInstanceOf(Object);
    });

    it('adds a card to pre-existing deck', async () => {
      //create mock cards for test
      const firstCard = { front: 'Front Text', back: 'Back Text' };
      const secondCard = { front: 'Not back', back: 'Not front' };
      // Send a POST request to create a new card
      await request(server).post(`/deck/${deckId}/card`).send(firstCard);
      // send a post request to send a second card
      await request(server).post(`/deck/${deckId}/card`).send(secondCard);
      //retrieve deck as a whole
      const testDeck = await Deck.findById(deckId)
      //expect the array to grow
      expect(testDeck.cards.length).toBeGreaterThan(1)
    });

    it('adds the card values correctly', async () => {
      //create mock card for test
      const mockCard = { front: 'True', back: 'False' };
      // Send a POST request to create a new card
      await request(server).post(`/deck/${deckId}/card`).send(mockCard);
      //retrieve deck as a whole
      const testDeck = await Deck.findById(deckId)
      //assign last card to variable for readability
      const lastCard = testDeck.cards[testDeck.cards.length - 1]
      //expect the correct values in their corresponding places
      expect(lastCard.front).toBe('True');
      expect(lastCard.back).toBe('False')
    });

    it('responds with 400 with an invalid deck ID', async () => {
      //create a mock card
      const mockCard = { front: 'mock', back: 'values' };
      // Send a POST request to create a new card
      const response = await request(server)
        .post(`/deck/65aed800858c12f9e251test/card`)
        .send(mockCard);
      // Check if the response is successful
      expect(response.status).toBe(400); 
    });
  });

  describe('DELETE', () => {
    it ('reduces the array of the deck by one', async () => {
      //retrieve deck as a whole
      const testDeck = await Deck.findById(deckId)
      //retrieve length before deletion
      const before = testDeck.cards.length;
      //retrieve the id of the first card
      const targetCard = testDeck.cards[0]._id;
      //delete the card
      await request(server).delete(`/deck/${deckId}/card`).send({deletedCardID: targetCard});
      //retrieve deck as a whole
      const testDeckAfter = await Deck.findById(deckId)
      //retrieve length after deletion
      const after = testDeckAfter.cards.length;
      //check if the length is different
      expect(before).not.toBe(after);
    })

    it('responds with 400 with an invalid deck ID', async () => {
      ///retrieve deck as a whole
      const testDeck = await Deck.findById(deckId)
      //retrieve the id of the first card
      const targetCard = testDeck.cards[0]._id;
      //delete the card
      const response = await request(server).delete(`/deck/g!bb3r!5h/card`).send({deletedCardID: targetCard});
      // Check if the response is successful
      expect(response.status).toBe(400); 
    });

    it('responds with 400 with an invalid card ID', async () => {
      ///retrieve deck as a whole
      const testDeck = await Deck.findById(deckId)
      //try deletion of fake card
      const response = await request(server).delete(`/deck/${deckId}/card`).send({deletedCardID: 'alexa, play despacito'});
      // Check if the response is successful
      expect(response.status).toBe(400); 
    });
  });
});
