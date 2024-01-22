import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Deck from '../Deck/Deck.jsx';

import { getDecks } from '../../utils/requests.js';

// create component body
const DeckContainer = () => {
  const [newDeck, setNewDeck] = useState('');

  // We need to set up 3 event handler functions for the Deck div, addDeck button and deleteDeck button
  // These functions will each contain fetch requests
  // Deck div: GET request to backend endpoint
  // Add deck: POST request to backend endpoint
  // Delete deck button: DELETE request to backend endpoint

  // retreive decks from store
  const decks = useSelector((state) => state.decks.decks);

  // create functionality to map through backendResponse and have new mapped
  const renderedDecks = decks.map((deck, index) => (
    <Deck key={deck._id} deck={deck} index={index} />
  ));

  // create function to handle new deck form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ deckName: newDeck, cards: [] });

    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (response.status === 200) {
      await getDecks();
      setNewDeck('');
    }
  };

  return (
    <div>
      {/* have an input field and an add deck button */}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter deck name'
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
        ></input>
        <button type='submit'>Add deck</button>
      </form>

      {/* have a container that displays decks*/}
      <section>{renderedDecks}</section>
    </div>
  );
};

export default DeckContainer;
