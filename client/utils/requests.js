import { store } from '../redux/store';
import { loadDecks } from '../redux/decksSlice';

export const getDecks = async () => {
  const response = await fetch('http://localhost:3000');

  if (response.status === 200) {
    const body = await response.json();
    store.dispatch(loadDecks(body));
  }
};
