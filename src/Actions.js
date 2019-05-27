import Event from './Data/Event';
import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';
import Compress from 'compress.js';
/**
 * action types
 */

export const ERROR = {
  IMAGE_SIZE: 'ERROR_IMAGE_SIZE',
  ACKNOWLEDGED: 'ERROR_ACKNOWLEDGED',
}

export const THEME = {
  TOGGLE: 'TOGGLE_THEME',
}

export const EVENTS = {
  GET_FEATURED: {
    LOADING: 'LOADING_GET_FEATURED_EVENTS',
    SUCCESS: 'SUCCESS_GET_FEATURED_EVENTS',
    FAILURE: 'FAILURE_GET_FEATURED_EVENTS',
  },
  GET_ALL: {
    LOADING: 'LOADING_GET_ALL_EVENTS',
    SUCCESS: 'SUCCESS_GET_ALL_EVENTS',
    FAILURE: 'FAILURE_GET_ALL_EVENTS',
  },
  ADD_SUBMIT: {
    LOADING: 'LOADING_SUBMIT_EVENT',
    SUCCESS: 'SUCCESS_SUBMIT_EVENT',
    FAILURE: 'FAILURE_SUBMIT_EVENT',
  },
  ADD_UPDATE_LOCATION: {
    SUCCESS: 'SUCCESS_UPDATE_LOCATION_EVENT'
  },
  ADD_UPDATE_LOCAL_IMG_SRC: {
    LOADING: 'LOADING_UPDATE_LOCAL_IMG_SRC',
    SUCCESS: 'SUCCESS_UPDATE_LOCAL_IMG_SRC'
  },
  ADD_CROPPED_IMG_SRC: {
    SUCCESS: 'SUCCESS_ADD_CROPPED_IMG_SRC'
  },
  COMPRESS_IMG: {
    LOADING: 'LOADING_COMPRESS_IMG',
    SUCCESS: 'SUCCESS_COMPRESS_IMG',
    FAILURE: 'FAILURE_COMPRESS_IMG',
  },
  UPDATE_NAME: {
    SUCCESS: 'SUCCESS_UPDATE_NAME_EVENTS'
  },
  UPDATE_WEBSITE: {
    SUCCESS: 'SUCCESS_UPDATE_WEBSITE_EVENTS'
  },
  UPDATE_DATETIME: {
    SUCCESS: 'SUCCESS_UPDATE_DATETIME'
  },
  UPDATE_DESCRIPTION: {
    SUCCESS: 'SUCCESS_UPDATE_DESCRIPTION_EVENT'
  },
  SUBMIT_FORM: {
    LOADING: 'LOADING_SUBMIT_FORM_EVENT',
    SUCCESS: 'SUCCESS_SUBMIT_FORM_EVENT',
    FAILURE: 'FAILURE_SUBMIT_FORM_EVENT'
  }
  //TODO: SORTED, etc
};

export const MAPS = {
  LOAD_MAP: {
    SUCCESS: 'SUCCESS_LOAD_MAP',
    FAILURE: 'FAILURE_LOAD_MAP',
  }
};

export const NAVIGATION = {
  GET: 'GET_NAVIGATION',
  SET: 'SET_SELECTED_NAVIGATION',
  UNSET: 'UNSET_SELECTED_NAVIGATION'
};

export function errorImageSize() {
  return {
    type: ERROR.IMAGE_SIZE,
  }
}

export function errorAcknowledged() {
  return {
    type: ERROR.ACKNOWLEDGED,
  }
}

export function compressImage(file){
  return async function(dispatch) {
      dispatch(compressImageLoading(file));
        const compress = new Compress();
        try {
          const compressedImages = await compress.compress([file], {
              size: 2.0, // the max size in MB, defaults to 2MB
              quality: 1, // the quality of the image, max is 1,
              maxWidth: 1920, // the max width of the output image, defaults to 1920px
              // maxHeight: 800, // the max height of the output image, defaults to 1920px
              resize: true // defaults to true, set false if you do not want to resize the image width and height
          });
          const compressedImage = compressedImages[0];
          console.log('compressedImage', compressedImage);

          //convert compressedImage back to file, then to url for editor
         const base64String = compressedImage.prefix + compressedImage.data;
         const mime = compressedImage.ext;
         const fileName = compressedImage.alt;
         const compressedFile = await urltoFile(base64String, fileName, mime);
         const imageUrlForEditor = URL.createObjectURL(compressedFile);

          dispatch(compressImageSuccess(imageUrlForEditor));
        } catch(err) {
          console.log('err',err);
           dispatch(compressImageFailure(err));
        }
  }
}

async function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
}


export function compressImageLoading() {
  return {
    type: EVENTS.COMPRESS_IMG.LOADING,
  }
}

export function compressImageSuccess(imageUrlForEditor){
  return {
    type: EVENTS.COMPRESS_IMG.SUCCESS,
    imageUrlForEditor,
  }
}

export function compressImageFailure(err){
  return {
    type: EVENTS.COMPRESS_IMG.FAILURE,
    err,
  }
}


export function submitNewEvent(event) {
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(submitNewEventLoading());

    const firebase = FirebaseUtil.getFirebase();
    const functions = firebase.functions();
    const storageRef = firebase.storage().ref().child(`pendingEventImages/${new Date().getTime()}`);
    storageRef.putString(event.croppedImgSrc, 'data_url').then((snapshot) => {
      var addEvent = functions.httpsCallable('addEvent');
      delete event.croppedImgSrc;
      console.log('SNAPSHOT: ', snapshot.ref.getDownloadURL());
      snapshot.ref.getDownloadURL().then((URL) => {
        console.log('URL: ', URL);
        event.imageUrl = URL;
        addEvent(event).then((result) => {
          DebugLog("Document written with ID: ", result.id);
          dispatch(submitNewEventSuccess(result.id));
        }).catch((err) => {
          DebugLog("Error adding document: ", err);
          dispatch(submitNewEventFailure(err));
        });
      });
    });
  }
}

export function submitNewEventLoading() {
  return {
    type: EVENTS.SUBMIT_FORM.LOADING
  }
}

export function submitNewEventFailure(error) {
  return {
    type: EVENTS.SUBMIT_FORM.FAILURE,
    error,
  }
}

export function submitNewEventSuccess(event) {
  return {
    type: EVENTS.SUBMIT_FORM.SUCCESS,
    event,
  }
}

export function updateEventDescription(description) {
  return {
    type: EVENTS.UPDATE_DESCRIPTION.SUCCESS,
    description
  }
}

export function updateEventDateTime(dateTime) {
  return {
    type: EVENTS.UPDATE_DATETIME.SUCCESS,
    dateTime
  }
}

export function eventWebsiteUpdate(url) {
  return {
    type: EVENTS.UPDATE_WEBSITE.SUCCESS,
    url
  }
}

export function updateEventName(value) {
  return {
    type: EVENTS.UPDATE_NAME.SUCCESS,
    value
  }
}

export function croppedImageUpdate(src) {
  return {
    type: EVENTS.ADD_CROPPED_IMG_SRC.SUCCESS,
    src
  }
}

export function localImageLoading(value) {
  return {
    type: EVENTS.ADD_UPDATE_LOCAL_IMG_SRC.LOADING,
    value
  }
}

export function mapLoaded(){
  return {
    type: MAPS.LOAD_MAP.SUCCESS,
    isLoaded: true,
  }
}

export function toggleTheme(){

  return {
    type: THEME.TOGGLE,
  }
}

export function submitSingleEvent(event) {
  console.log('EVENT: ', event);
}

export function updatePlace(place) {
  return {
    type: EVENTS.ADD_UPDATE_LOCATION.SUCCESS,
    place
  }
}

export function updateLocalImgSrc(localImgSrc) {
  return {
    type: EVENTS.ADD_UPDATE_LOCAL_IMG_SRC.SUCCESS,
    localImgSrc: localImgSrc
  }
}

export function fetchAllEvents(){
  //TODO: get title and featured events from db
  return {
    type: EVENTS.GET_ALL.SUCCESS,
    title: 'UPCOMING EVENTS',
    data: [
      new Event
      .Builder('best event 1', 'https://static1.squarespace.com/static/5a39574dd0e628092dd7964b/t/5ccf319b51e58c0001f17f77/1557082528449/?format=1500w', 'fakeAddress', 'fakeStartDate')
      .build()
      ,
      new Event
        .Builder('best event 2', 'http://bearracuda.com/wp-content/uploads/2014/07/DUMMY-LONGBEACH-GAYPRIDE2019BEARRACUDA.jpg', 'fakeAddress', 'fakeStartDate')
        .build()
      ,
      new Event
      .Builder('best event 3', 'https://iamguts.com/home/wp-content/uploads/2019/05/0517_Chunk.jpg', 'fakeAddress', 'fakeStartDate')
      .build()
      ,
      new Event
        .Builder('best event 4', 'http://www.bearguide.net/pix/pseudonympho.jpg', 'fakeAddress', 'fakeStartDate')
        .build()
    ],
  }
}

export function fetchFeaturedEvents(){
  //TODO: get title and featured events from db
  return {
    type: EVENTS.GET_FEATURED.SUCCESS,
    title: 'FEATURED EVENTS',
    data: [
      new Event
      .Builder('best event 1', 'http://bearracuda.com/wp-content/uploads/2011/12/800PX-SF13ANNIVERSARY-STRIPDOWN.jpg', 'fakeAddress', 'fakeStartDate')
      .build()
      ,
      new Event
        .Builder('best event 2', 'http://bearracuda.com/wp-content/uploads/2019/03/Cuda-Portland-June2019-Revised-1.jpg', 'fakeAddress', 'fakeStartDate')
        .build()
    ],
  }
}

export function getNavigation(){
  return {
    type: NAVIGATION.GET
  }
}

export function setNavigation(page){
  return {
    type: NAVIGATION.SET,
    page
  }
}

export function unsetNavigation() {
  return {
    type: NAVIGATION.UNSET
  }
}
