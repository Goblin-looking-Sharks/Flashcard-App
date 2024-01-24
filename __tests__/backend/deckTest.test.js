const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = 'http://localhost:3000';
const DeckController = require('../../server/DeckController.js');
const Deck = require('../../server/model');

describe('DeckController routes', () => {
  describe('/', () => {
    let allDecks;
    let response;
    let addedDeck;
    beforeAll(async () => {
      allDecks = await Deck.find();
    });
    describe('GET', () => {
      beforeAll(async () => {
        response = await request(server).get('/');
      });
      it('responds with 200 status and application/json content type', () => {
        expect(response.headers['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.statusCode).toEqual(200);
      });
      it('responds with all decks in db', async () => {
        expect(response.body.length).toEqual(allDecks.length);
      });
    });
    describe('POST', () => {
      beforeAll(async () => {
        response = await request(server).post('/').send({
          cards: [],
          deckName: 'test98765',
        });
      });
      afterAll(async () => {
        await Deck.findOneAndDelete({ deckName: 'test98765' });
      });
      it('responds with 200 status and application/json content type', () => {
        expect(response.headers['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.statusCode).toEqual(200);
      });
      it('adds deck to db', async () => {
        const decks = await Deck.find({ deckName: 'test98765' });
        expect(decks).not.toBe(undefined);
      });
    });
    describe('DELETE', () => {
      beforeAll(async () => {
        addedDeck = await Deck.create({
          cards: [],
          deckName: 'deletetest123',
        });
        response = await request(server).delete(`/deck/${addedDeck._id}`);
      });
      it('responds with 200 status', () => {
        expect(response.statusCode).toEqual(200);
      });
      it('deletes deck from db', async () => {
        const deletedDeck = await Deck.findById(addedDeck._id);
        expect(deletedDeck).toEqual(null);
      });
    });
  });
});
