import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDeck, addDeck, deleteDeck } from '../../redux/decksSlice';

const Deck = ({ deck, index }) => {
  // create 2 handler functions for clicking into deck and deleting deck
  const handleDeckClick = async (e) => {
    await fetch(`http://localhost:3000/deck/${deck._id}`); // not sure if this is the name of the id
  };

  const handleDelete = async (e) => {
    const deletedCardID = JSON.stringify(deck._id);

    await fetch(`http://localhost:3000/deck/${deck._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: deletedCardID,
    });

    // invoke our reducer (maybe loadDeck instead of deleteDeck?)
    dispatch(loadDeck(body));
  };

  return (
    <div id={`deck${index}`} onClick={handleDeckClick}>
      {deck.deckName}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Deck;
