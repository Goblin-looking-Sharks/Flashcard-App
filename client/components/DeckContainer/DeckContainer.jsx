import React from 'react';

// create component body
const DeckContainer = () => {
  // create functionality to map through backendResponse and have new mapped

  const decks = [];
  return (
    <div>
      {/* have an input field and an add deck button */}
      <div>
        <input type="text" placeholder="Enter deck name"></input>
        <button>Add deck</button>
      </div>

      {/* have a container that displays decks*/}
      <section>{decks}</section>
    </div>
  );
};

export default DeckContainer;
