import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDeck,
  loadCards,
  addCard,
  deleteCard,
} from '../../redux/currentDeckSlice';

const CardForm = () => {
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  const currentDeckID = useSelector((state) => state.currentDeck.id);
  // Create handler function for onSubmit (will need to make a fetch request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = {
      front: cardFront,
      back: cardBack,
    };

    const newCardString = JSON.stringify(newCard);

    await fetch(`http://localhost:3000/deck/${currentDeckID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newCardString,
    });

    // redirect will need to occur from server (Automatically?)
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
