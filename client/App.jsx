import React from 'react';
import './styles.css';
import DeckContainer from './components/DeckContainer/DeckContainer';

const App = () => {
  return (
    // Need to install React Router, import it, and add it with the switch statements to this component

    <div id='AppContainer'>
      <NavBar />
      <DeckContainer />
    </div>
  );
};

export default App;
