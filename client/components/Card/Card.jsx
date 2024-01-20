import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Card = () => {
  // get current card array from the global store
  // const cards = useSelector()

  // piece of state: get the index (of the current card) (starts at zero)
  const [isFront, setIsFront] = useState(true);

  // piece of state: get the boolean
  let card = cards[currentIndex];
  if (isFront) {
    content = card.front;
  } else {
    content = card.back;
  }
  return (
    <div>
        <button>Add card</button>
      <button onClick={}>
        {/* Front or back content depending on state */}
        {content}
      </button>

      <button>Delete</button>

      <div>
        <button>Back</button>
        <button>Next</button>
      </div>

    </div>
  );
};

export default Card;
