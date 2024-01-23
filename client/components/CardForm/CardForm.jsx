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
    //put a new card in the current deck
    navigate(`/deck/${currentDeckID}`);
  };
//this creates the front of a new flashcard
  return (
    <div className='CardForm'>
      <div className='formSection'>
        <form class='formContent' onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              name='cardFront'
              placeholder='Front of card'
              onChange={(e) => setCardFront(e.target.value)}
              required
            />
          </label>
          {/* this creates the back of the new flashcard that was just created */}
          <label>
            <input
              type='text'
              name='cardBack'
              placeholder='Back of card'
              onChange={(e) => setCardBack(e.target.value)}
              required
            />
          </label>
          {/* this button adds a card */}
          <button type='submit'>Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
