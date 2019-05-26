import { combineReducers } from 'redux';
import DebugLog from './Utils/DebugLog';

import { isValidURL } from './utils';

import {
  MAPS,
  EVENTS,
  THEME,
  NAVIGATION,
} from './Actions';

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

export function add(state = {
  place: undefined
}, action){
  switch(action.type){
    case EVENTS.ADD_UPDATE_LOCATION.SUCCESS:
      const placeValidated = action.place.formatted_address.length > 2 ? true : false
      return Object.assign({}, state, {
        place: action.place,
        placeValidated
      });
    case EVENTS.ADD_UPDATE_LOCAL_IMG_SRC.SUCCESS:
      DebugLog('ACTION.LOCALIMGSRC: ', action.localImgSrc)
      return Object.assign({}, state, {
        localImgSrc: action.localImgSrc,
        croppedImgSrc: undefined,
        eventPosterValidated: undefined
      })
    case EVENTS.ADD_UPDATE_LOCAL_IMG_SRC.LOADING:
      DebugLog('ACTION.LOCALIMGSRC.LOADING: ', action.value);
      return Object.assign({}, state, {
        editorLoading: action.value,
        eventPosterValidated: undefined
      })
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
      return state;
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
  maps,
  theme,
  navigation,
  featuredEvents,
  allEvents,
  add,
  compressImage,
});

export default RootReducer;
