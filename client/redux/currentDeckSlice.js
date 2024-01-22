import { createSlice } from '@reduxjs/toolkit';

export const currentDeckSlice = createSlice({
  name: 'currentDeck',
  initialState: {
    id: '',
    cards: [],
  },
  reducers: {
    selectDeck: (state, action) => {
      state.id = action.payload;
    },
    loadCards: (state, action) => {
      state.cards = action.payload;
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    deleteCard: (state, action) => {
      state.cards.filter((card, index) => {
        index !== action.payload;
      });
    },
  },
});

export const { selectDeck, loadCards, addCard, deleteCard } =
  currentDeckSlice.actions;

export default currentDeckSlice.reducer;
