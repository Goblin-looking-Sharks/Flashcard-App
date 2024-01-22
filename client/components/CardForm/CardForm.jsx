import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getDecks } from '../../utils/requests.js';

const CardForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  const currentDeckID = params.deckId;

  // Create handler function for onSubmit (will need to make a fetch request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = {
      front: cardFront,
      back: cardBack,
    };

    const newCardString = JSON.stringify(newCard);

    await fetch(`http://localhost:3000/deck/${currentDeckID}/card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newCardString,
    });

    // redirect will need to occur from server (Automatically?)

    await getDecks();

    navigate(`/deck/${currentDeckID}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type='text'
          name='cardFront'
          placeholder='Enter card front content'
          onChange={(e) => setCardFront(e.target.value)}
          required
        />
        Front of card
      </label>
      <label>
        <input
          type='text'
          name='cardBack'
          placeholder='Enter card back content'
          onChange={(e) => setCardBack(e.target.value)}
          required
        />
        Back of card
      </label>

      <button type='submit'>Add Card</button>
    </form>
  );
};

export default CardForm;
