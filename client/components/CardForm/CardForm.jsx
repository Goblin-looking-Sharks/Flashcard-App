import React from 'react';

const CardForm = () => {
// create handler function for onSubmit (will need to make a fetch request)

  return (
    <form onSubmit={}>
        <label><input type="text" name="cardFront" placeholder="Enter card front content" required />Front of card</label>
      <label>
        <input type="text" name="cardBack" placeholder="Enter card back content" required />
        Back of card
      </label>

      
      <button type='submit'>Add Card</button>
    </form>
  );
};

export default CardForm;
