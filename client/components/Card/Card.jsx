import React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getDecks } from '../../utils/requests.js';

const Card = () => {
  const params = useParams();

  // get current card array from the global store
  const currentDeck = useSelector((state) =>
    state.decks.decks.find((deck) => deck._id === params.deckId)
  );

  // piece of state: get the boolean
  const [isFront, setIsFront] = useState(true);
  // piece of state: get the index (of the current card) (starts at zero)
  const [index, setIndex] = useState(0);

  if (!currentDeck) return null;

  const cards = currentDeck.cards;
  // get current deck ID
  const currentDeckID = currentDeck._id;

  const hasCards = cards.length > 0;

  // Get current card using index
  let cardContent;
  if (hasCards) {
    const card = cards[index];
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

  const handleDelete = async (e) => {
    const body = JSON.stringify({ deletedCardID: cards[index]._id }); // not sure if _id is the key for the id value (in the card object)

    await fetch(`http://localhost:3000/deck/${currentDeckID}/card`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (index === cards.length - 1) setIndex(Math.max(index - 1, 0));

    await getDecks();
  };

  return (
    <div>
      <Link className='addCardLink' to={`/deck/${currentDeckID}/addCard`}>
        Add card
      </Link>
      {hasCards ? (
        <button onClick={(e) => setIsFront(!isFront)}>
          {/* Front or back cardContent depending on state */}
          {cardContent}
        </button>
      ) : null}

      <button disabled={!hasCards} onClick={handleDelete}>
        Delete
      </button>

      <div>
        <button
          disabled={!hasCards || index === 0}
          onClick={(e) => setIndex(index - 1)}
        >
          Back
        </button>
        <button
          disabled={!hasCards || index === cards.length - 1}
          onClick={(e) => setIndex(index + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
