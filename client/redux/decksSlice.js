import { createSlice } from '@reduxjs/toolkit';

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    decks: [
      {
        _id: '8217382173827',
        deckName: 'Frontend test',
        cards: [
          {
            front: 'front',
            back: 'back',
          },
        ],
      },
    ],
  },
  reducers: {
    loadDecks: (state, action) => {
      state.decks = action.payload;
    },
    addDeck: (state, action) => {
      state.decks.push(action.payload);
    },
    deleteDeck: (state, action) => {
      state.decks.filter((deck, index) => {
        index !== action.payload;
      });
    },
  },
});

export const { loadDecks, addDeck, deleteDeck } = decksSlice.actions;

export default decksSlice.reducer;
