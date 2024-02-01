import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalContext from './GlobalStateContext/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContext >
      <App />
    </GlobalContext>
  </React.StrictMode>
);

reportWebVitals();
