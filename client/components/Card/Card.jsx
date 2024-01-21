import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDeck,
  loadCards,
  addCard,
  deleteCard,
} from '../../redux/currentDeckSlice';

const Card = () => {
  // get current card array from the global store
  const cards = useSelector((state) => state.currentDeck.cards);
  // get current deck ID
  const currentDeckID = useSelector((state) => state.currentDeck.id);

  // piece of state: get the boolean
  const [isFront, setIsFront] = useState(true);
  // piece of state: get the index (of the current card) (starts at zero)
  const [index, setIndex] = useState(0);

  // Get current card using index
  let hasCards = cards.length !== 0;

  if (hasCards) {
    let cardContent;
    let card = cards[index];
    if (isFront) {
      cardContent = card.front;
    } else {
      cardContent = card.back;
    }
  }

  // We need to set up 2 event handler functions for the addCard and deleteCard buttons
  // These functions will each contain fetch requests
  // Add card: GET request to form page
  // Delete card: DELETE request to backend endpoint

  const handleAdd = async (e) => {
    await fetch(`http://localhost:3000/deck/${currentDeckID}/addCard`); // should redirect to a new page?
  };

  const deletedCardID = JSON.stringify(cards[index]._id); // not sure if _id is the key for the id value (in the card object)

  const handleDelete = async (e) => {
    await fetch(`http://localhost:3000/deck/${currentDeckID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: deletedCardID,
    });
  };

  return (
    <div>
      <button onClick={handleAdd}>Add card</button>
      {!hasCards && (
        <button onClick={(e) => setIsFront(!isFront)}>
          {/* Front or back cardContent depending on state */}
          {cardContent}
        </button>
      )}

      <button disabled={!hasCards} onClick={handleDelete}>
        Delete
      </button>

      <div>
        <button
          disabled={!hasCards || index === 0}
          onClick={(e) => setIndex(index--)}
        >
          Back
        </button>
        <button
          disabled={!hasCards || index === cards.length - 1}
          onClick={(e) => setIndex(index++)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
