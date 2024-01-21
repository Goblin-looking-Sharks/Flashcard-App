import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDeck, addDeck, deleteDeck } from '../../redux/decksSlice'
import { render } from 'react-dom';


// create component body
const DeckContainer = () => {
  const decks = useSelector((state) => state.decks.decks);

  // We need to set up 2 event handler functions for the Deck div and deleteDeck button
  // These functions will each contain fetch requests
  // Deck div: GET request to backend endpoint
  // Delete deck button: DELETE request to backend endpoint

  // create functionality to map through backendResponse and have new mapped
  const renderedDecks = decks.map(
    (deck, index) => (<div id={index} onClick={}>
        {deck.deckName}
        <button onClick={}>Delete</button>
    </div>)
  )

  return (
    <div>
      {/* have an input field and an add deck button */}
      <div>
        <input type="text" placeholder="Enter deck name"></input>
        <button>Add deck</button>
      </div>

      {/* have a container that displays decks*/}
      <section>{renderedDecks}</section>
    </div>
  );
};

export default DeckContainer;
