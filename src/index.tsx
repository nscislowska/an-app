import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/main.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename='/'>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
