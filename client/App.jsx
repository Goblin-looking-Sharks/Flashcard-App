import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import './styles.css';
import DeckContainer from './components/DeckContainer/DeckContainer';

const App = () => {
  return (
    // Need to install React Router, import it, and add it with the switch statements to this component

    <div id='AppContainer'>
      <NavBar />

      <Routes>
        <Route path='/' element={<DeckContainer />}>
          <Route index element={<DeckContainer />} />
          <Route path='deck' element={<Card />} />
          <Route index element={<Card />} />
          <Route path=':deckId/addCard' element={<CardForm />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path='*' element={<DeckContainer />} />
        </Route>
      </Routes>

      {/* <DeckContainer /> */}
    </div>
  );
};

export default App;
