//polyfill
import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Root from './Components/Root/Root'
import registerServiceWorker from './registerServiceWorker';

/**
 * REDUX
 */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './Reducers';
import { getNavigation, fetchAllEvents, fetchFeaturedEvents, } from './Actions';

import FirebaseUtil from './Utils/InitializeFirebase';

let store;
if (process.env.NODE_ENV === 'production'){
  store = createStore(
    RootReducer,
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    )
  );
} else {
  store = createStore(
    RootReducer,
    applyMiddleware(
      thunkMiddleware,
      createLogger() //middleware that logs actions
    )
  );
}


FirebaseUtil.init();

store.dispatch(getNavigation());
store.dispatch(fetchAllEvents());
store.dispatch(fetchFeaturedEvents());

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'));
registerServiceWorker();
