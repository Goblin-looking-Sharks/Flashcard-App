import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDecks } from '../../utils/requests';

const Deck = ({ deck, index }) => {
  const navigate = useNavigate();

  // create 2 handler functions for clicking into deck and deleting deck
  const handleDeckClick = () => {
    navigate(`/deck/${deck._id}`);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/deck/${deck._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // invoke getDecks
    if (response.status === 200) getDecks();
  };

  return (
    <div id={`deck${index}`}>
      <span onClick={handleDeckClick}>{deck.deckName}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Deck;
