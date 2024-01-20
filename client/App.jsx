import React from 'react';
import './styles.css';
import DeckContainer from './components/DeckContainer/DeckContainer';

const App = () => {
  // get decks array from backend
  const decks = [];
  backendResponse.map((deck) => decks.push(<Deck />));

  return (
    // NavBar
    //
    <div id="AppContainer">
      <NavBar />
      <DeckContainer />
    </div>
  );
};

export default App;
