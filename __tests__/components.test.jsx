import React from 'react';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
// import regeneratorRuntime, { mark } from 'regenerator-runtime';

// import App from "../client/App.jsx";
// import Card from "../client/components/Card/Card.jsx";
// import CardForm from '../client/components/CardForm/CardForm.jsx';
// import Deck from '../client/components/Deck/Deck.jsx';
import DeckContainer from '../client/components/DeckContainer/DeckContainer.jsx'; 
// import NavBar from '../client/components/NavBar/NavBar.jsx';

{/* <div className='DeckContainer'>
      <div className='formDiv'>
        <div className='deckSquare'>
          <h2>Decks</h2> */}


describe('Unit testing React components', () => {
    describe('DeckContainer', () => {
      let text;
      const props = {
        className: 'deckSquare',
        text: 'Decks',
      };
  
      beforeAll(() => {
        text = render(<DeckContainer {...props} />);
      });
  
      test('Renders the passed in text as Decks', () => {
        // expect(text.getByText('deckSquare')).toHaveTextContent('Decks');
        // expect(text.getByText('Mega:')).toHaveStyle('font-weight: bold');
      });
    });
});