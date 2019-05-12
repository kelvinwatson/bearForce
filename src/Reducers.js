import { combineReducers } from 'redux';
import DebugLog from './Utils/DebugLog';

import {
  EVENTS,
  THEME,
  NAVIGATION,
} from './Actions';

/**
 * Theme-related actions
 */
export function theme(state = {
    isDarkTheme: false,
}, action) {
  DebugLog('setting theme', state.isDarkTheme);

  switch(action.type) {
    case THEME.TOGGLE:
      return Object.assign({}, state, {
        isDarkTheme: !state.isDarkTheme,
      });
    default:
      return state;
  }
}

/**
 * Event-related actions
 */
export function featuredEvents(state = {
  title: 'FEATURED EVENTS',
  data: [],
}, action){
  switch(action.type){
    case EVENTS.GET_FEATURED.SUCCESS:
      return Object.assign({}, state, {
          title: action.title,
          data: action.data,
      });
    default:
      return state;
  }
}

export function allEvents(state = {
  title: 'UPCOMING EVENTS',
  data: [],
}, action){
  switch(action.type){
    case EVENTS.GET_ALL.SUCCESS:
      return Object.assign({}, state, {
        title: action.title,
        data: action.data,
      });
    default:
      return state;
  }
}

/**
 * Navigation-related actions
 */
export function navigation(state = {
  page: undefined,
  underlinedItem: undefined,
  list: []
}, action){
  switch(action.type){
    case NAVIGATION.GET:
      return Object.assign({}, state, {
        page: undefined,
        list: ['Me', 'Music', 'Reach', 'Collaborate']
      });
    default:
      return state;
  }
}

/*
 * root reducer
 */
const RootReducer = combineReducers({

  theme,
  navigation,
  featuredEvents,
  allEvents,

});

export default RootReducer;
