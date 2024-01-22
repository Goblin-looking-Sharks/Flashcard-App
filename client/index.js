import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
