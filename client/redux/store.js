import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./decksSlice";
import currentDeckReducer from "./currentDeckSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    currentDeck: currentDeckReducer,
  },
});
