import React from 'react';
import './styles.css';
import DeckContainer from './components/DeckContainer/DeckContainer';

const App = () => {
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
