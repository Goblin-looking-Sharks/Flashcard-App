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

  const colorsArray = [
    '#00A7ED',
    '#8361F4',
    '#E75552',
    '#EA9823',
    '#87CE45',
    '#93D5F3',
    '#29BDB6',
  ];
// disco mode is happening do to updating the state
  // try using prevent default to fix this


  //randomly select a color for the decks
  const styles = {
    backgroundColor:
      colorsArray[Math.floor(Math.random() * colorsArray.length + 1) - 1],
  };
// renders the existing decks to the page
  return (
    <div id={`deck${index}`} className='Deck'>
      {/* DISCO MODE potentially here as well */}
      <div className='deckColor' onClick={handleDeckClick} style={styles}>
        <h2>{deck.deckName}</h2>
      </div>
      {/* delete button under the populated decks */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Deck;
