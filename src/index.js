import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from 'easy-peasy';
import { store } from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
