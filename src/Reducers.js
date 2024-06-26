import { combineReducers } from 'redux';
import DebugLog from './Utils/DebugLog';

import { isValidURL } from './utils';

import {
  ADMINISTRATOR,
  ERROR,
  MAPS,
  EVENTS,
  THEME,
  NAVIGATION,
} from './Actions';

export function administrator(state = {
  administrator: undefined,
  administratorPromptSignIn: false,
  pendingEventsLoading: false,
  pendingEvents: undefined,
}, action) {
  switch(action.type){
    case ADMINISTRATOR.SIGNED_IN:
      return Object.assign({},state,{
        administrator: action.administrator,
        administratorPromptSignIn: false,
      });
    case ADMINISTRATOR.PROMPT_SIGN_IN:
      return Object.assign({}, state, {
        administrator: undefined,
        administratorPromptSignIn: true,
      });
    case ADMINISTRATOR.SIGN_OUT:
      return Object.assign({}, state, {
        administrator: undefined,
        administratorPromptSignIn: false,
      });
    case ADMINISTRATOR.FETCH_PENDING_EVENTS.LOADING:
      return Object.assign({}, state, {
        pendingEventsLoading: true,
      });
    case ADMINISTRATOR.FETCH_PENDING_EVENTS.SUCCESS:
      return Object.assign({}, state, {
        pendingEventsLoading: false,
        pendingEvents: action.pendingEvents,
      });
    case ADMINISTRATOR.FETCH_PENDING_EVENTS.FAILURE:
      return Object.assign({}, state, {
        pendingEventsLoading: false,
      });
    default:
      return state;
  }
}

export function error(state = {
  message: undefined,
  timeout: undefined,
}, action) {
  switch (action.type){
    case ERROR.IMAGE_SIZE:
      return Object.assign({}, state, {
          message: 'Image size too large',
          timeout: 3000,
      });
    case ERROR.ACKNOWLEDGED: {
      return Object.assign({}, state, {
          message: undefined,
          timeout: undefined,
      });
    }
    default:
      return state;
  }
}

export function maps(state = {
  isLoaded: false,
}, action) {
  switch(action.type)
  {
    case MAPS.LOAD_MAP.SUCCESS:
      return Object.assign({}, state, {
        isLoaded: action.isLoaded
      });
    default:
      return state;
  }
}
/**
 * Theme-related actions
 */
export function theme(state = {
    isDarkTheme: false,
}, action) {
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

export function add(state = {
  place: undefined,
  submitFormLoading: false,
  submitFormSuccess: false,
  submitFormFailure: false,
}, action){
  switch(action.type){
    case EVENTS.ADD_UPDATE_LOCATION.SUCCESS:
      const placeValidated = action.place.formatted_address.length > 2 ? true : false
      return Object.assign({}, state, {
        place: action.place,
        placeValidated
      });
    case EVENTS.COMPRESS_IMG.SUCCESS:
      return Object.assign({}, state, {
        imageUrlForEditor: action.imageUrlForEditor,
        croppedImgSrc: undefined,
        eventPosterValidated: undefined
      });
    case EVENTS.ADD_CROPPED_IMG_SRC.SUCCESS:
      return Object.assign({}, state, {
        croppedImgSrc: action.src,
        localImgSrc: undefined,
        eventPosterValidated: true
      })
    case EVENTS.UPDATE_NAME.SUCCESS:
      const eventNameValidated = action.value.length > 2 ? true : false
      return Object.assign({}, state, {
        eventName: action.value,
        eventNameValidated
      })
    case EVENTS.UPDATE_WEBSITE.SUCCESS:
      const eventWebsiteUrlValidated = isValidURL(action.url);
      return Object.assign({}, state, {
        eventWebsiteUrl: action.url,
        eventWebsiteUrlValidated
      })
    case EVENTS.UPDATE_DATETIME.SUCCESS:
      const eventDateTimeValidated = action.dateTime.isAfter(new Date()) ? true : false;
      return Object.assign({}, state, {
        eventDateTime: action.dateTime.toISOString(),
        eventDateTimeValidated
      })
    case EVENTS.UPDATE_DESCRIPTION.SUCCESS:
      let eventDescription = action.description
      return Object.assign({}, state, {
        eventDescription,
        eventDescriptionValidated: true
      })
    case EVENTS.SUBMIT_FORM.LOADING:
      return Object.assign({}, state, {
        submitFormLoading: true,
        submitFormSuccess: false,
        submitFormFailure: false,
      });
    case EVENTS.SUBMIT_FORM.FAILURE:
      return Object.assign({}, state, {
        submitFormLoading: false,
        submitFormSuccess: false,
        submitFormFailure: true,
      });
    case EVENTS.SUBMIT_FORM.SUCCESS:
      return Object.assign({}, state, {
        submitFormLoading: false,
        submitFormSuccess: true,
        submitFormFailure: false,
      });
    default:
      return state;
  }
}

export function compressImage(state = {
  imageUrlForEditor: undefined,
}, action) {
  switch(action.type){
    case EVENTS.COMPRESS_IMG.SUCCESS:
      return Object.assign({}, state, {
        imageUrlForEditor: action.imageUrlForEditor,
      });
    default:
      return state;

  }
}

/*
 * root reducer
 */
const RootReducer = combineReducers({
  administrator,
  error,
  maps,
  theme,
  navigation,
  featuredEvents,
  allEvents,
  add,
  compressImage,
});

export default RootReducer;
