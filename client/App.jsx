import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from 'react-router-dom';
import './styles.css';
import DeckContainer from './components/DeckContainer/DeckContainer.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Card from './components/Card/Card.jsx';
import CardForm from './components/CardForm/CardForm.jsx';

{
  /* <Routes>
        <Route path='/' element={<DeckContainer />}>
          <Route index element={<DeckContainer />} />
          <Route path='deck' element={<Card />} />
          <Route index element={<Card />} />
          <Route path=':deckId/addCard' element={<CardForm />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */
}
//     <Route path='*' element={<DeckContainer />} />
//   </Route>

// </Routes> */}

{
  /* <div id="AppContainer">
          <NavBar />
          <DeckContainer />
  </div>*/
}

const App = () => {
  return (
    // Need to install React Router, import it, and add it with the switch statements to this component
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DeckContainer />} />
        <Route path="/deck/:deckId" element={<Card />} />
        <Route path="/deck/:deckId/addCard" element={<CardForm />} />
      </Routes>
    </>
  );
};

export default App;
