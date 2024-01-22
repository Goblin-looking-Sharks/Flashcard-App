import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDecks, addDeck, deleteDeck } from '../../redux/decksSlice';
import Deck from '../Deck/Deck.jsx';
import { Link } from 'react-router-dom';

// create component body
const DeckContainer = () => {
  const [newDeck, setNewDeck] = useState('');
  const dispatch = useDispatch();

  // We need to set up 3 event handler functions for the Deck div, addDeck button and deleteDeck button
  // These functions will each contain fetch requests
  // Deck div: GET request to backend endpoint
  // Add deck: POST request to backend endpoint
  // Delete deck button: DELETE request to backend endpoint

  const getDecks = async () => {
    console.log('in get Decks');
    const response = await fetch('http://localhost:3000/');
    console.log('response body:', response.body);
    const body = await response.json();
    console.log('status', response.status);
    dispatch(loadDecks(body));
    // if (response.status === 200) {
    //   console.log('response is 200');

    //   console.log('body', body);
    //   // (I think we will receive back an array of deck object(s))

    // }
  };

  useEffect(() => {
    getDecks();
  }, []);

  // retreive decks from store
  const decks = useSelector((state) => state.decks.decks);
  console.log('decks', decks);

  // create functionality to map through backendResponse and have new mapped
  const renderedDecks = decks.map(
    // not sure if _id is the key for the id value (in the deck object)
    (deck, index) => (
      <div>
        <Deck key={deck._id} deck={deck} index={index} getDecks={getDecks} />
        {/* <Link to={`/deck/${deck._id}`}>Cards</Link> */}
      </div>
    )
    // (deck, index) => (<div id={`deck${index}`} onClick={}>
    //     {deck.deckName}
    //     <button onClick={}>Delete</button>
    // </div>)
  );

  // create function to handle new deck form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDeckString = JSON.stringify({ deckName: newDeck, cards: [] });
    //console.log(newDeckString);

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newDeckString,
    });

    console.log('response.status', response.status);

    if (response.status === 200) getDecks();

    // invoke our reducer (maybe loadDecks instead of addDeck?)
    // dispatch(loadDecks(body));
  };

  return (
    <div>
      {/* have an input field and an add deck button */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter deck name"
          onChange={(e) => setNewDeck(e.target.value)}
        ></input>
        <button type="submit">Add deck</button>
      </form>

      {/* have a container that displays decks*/}
      <section>{renderedDecks}</section>
    </div>
  );
};

export default DeckContainer;
