import { createSlice } from '@reduxjs/toolkit';

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    decks: [],
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
