import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";


import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import { reducers } from './store/store';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/firestore';
import config from './firebase.config';

import './index.scss';
import reportWebVitals from './reportWebVitals';

//Set up redux dev tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//Set up store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

//Firebase Initialization
firebase.initializeApp(config);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();