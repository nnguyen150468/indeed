import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

let initialState = {
  user: {
    email: '',
    password: '',
    authenticated: false
  }
}

function indeedReducer (state=initialState, action){
  switch(action.type){
    case 'LOGIN':
      return {...state,
        user : action.payload};
    case 'LOGOUT':
      return {...state,
        user: action.payload};
    default:
      return state
  }
}

const store = createStore(indeedReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
