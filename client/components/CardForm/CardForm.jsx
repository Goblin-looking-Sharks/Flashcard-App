import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDeck,
  loadCards,
  addCard,
  deleteCard,
} from '../../redux/currentDeckSlice';

const CardForm = () => {
  const currentDeckID = useSelector((state) => state.currentDeck.id);
  // Create handler function for onSubmit (will need to make a fetch request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = JSON.stringify(currentDeckID);

    await fetch(`http://localhost:3000/deck/${currentDeckID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: currentDeckID,
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
          required
        />
        Front of card
      </label>
      <label>
        <input
          type='text'
          name='cardBack'
          placeholder='Enter card back content'
          required
        />
        Back of card
      </label>

      <button type='submit'>Add Card</button>
    </form>
  );
};

export default CardForm;
