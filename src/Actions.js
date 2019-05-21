import Event from './Data/Event';
import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';

/**
 * action types
 */
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

export const TASK = {
  GET: {
    LOADING: 'LOADING_GET_TASK',
    SUCCESS: 'SUCCESS_GET_TASK',
    FAILURE: 'FAILURE_GET_TASK',
  },
  CREATE: {
    LOADING: 'LOADING_CREATE_TASK',
    SUCCESS: 'SUCCESS_CREATE_TASK',
    FAILURE: 'FAILURE_CREATE_TASK',
  },
  UPDATE: {
    LOADING: 'LOADING_UPDATE_TASK',
    SUCCESS: 'SUCCESS_UPDATE_TASK',
    FAILURE: 'FAILURE_UPDATE_TASK',
  },
  DELETE: {
    LOADING: 'LOADING_DELETE_TASK',
    CONFIRM: 'CONFIRM_DELETE_TASK',
    SUCCESS: 'SUCCESS_DELETE_TASK',
    FAILURE: 'FAILURE_DELETE_TASK',
  },
};

export const TASKS = {
  GET: {
    LOADING: 'LOADING_GET_TASKS',
    SUCCESS: 'SUCCESS_GET_TASKS',
    FAILURE: 'FAILURE_GET_TASKS',
  },
};


export function submitNewEvent(event) {
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(submitNewEventLoading());

    const firebase = FirebaseUtil.getFirebase();
    const firestore = firebase.firestore();
    DebugLog('fs',firestore);
    return firestore.collection('pendingEvents').add(event)
    .then((docRef) => {
        DebugLog("Document written with ID: ", docRef.id);
        dispatch(submitNewEventSuccess(docRef));
    })
    .catch((error) => {
        DebugLog("Error adding document: ", error);
        dispatch(submitNewEventFailure(error));
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

export function getTasks(filter){
  //TODO: use filter

  return function (dispatch) {
    dispatch(getTasksLoading(filter));
    return FirebaseUtil.getFirebase().database().ref('tasks').once('value').then((snap)=>{
      console.log('snap',snap.val());
      dispatch(getTasksSuccess(snap && snap.val()));
    });
  }
}

export function getTasksLoading(filter){
  return {
    type: TASKS.GET.LOADING,
    status: 'Fetching tasks...',
    filter,
  }
}

export function getTasksSuccess(tasks){
  return {
    type: TASKS.GET.SUCCESS,
    status: 'Successfully retrieved tasks.',
    tasks,
  }
}

export function getTasksFailure(err){
  return {
    type: TASKS.GET.FAILURE,
    status: err
  }
}

export function createTask(task) {
  return function (dispatch) {
    dispatch(createTaskLoading());
    return FirebaseUtil.getFirebase().database().ref('tasks').push(task, function(err){
      err ? dispatch(createTaskFailure(task, err)) : dispatch(createTaskSuccess(task));
    });
  }
}

export function createTaskLoading(task){
  return {
    type: TASK.CREATE.LOADING,
    status: 'Creating task...',
    task,
  }
}

export function createTaskSuccess(task){
  return {
    type: TASK.CREATE.SUCCESS,
    status: 'Successfully created task.',
    task,
  }
}

export function createTaskFailure(task, err){
  return {
    type: TASK.CREATE.FAILURE,
    status: err,
    task,
  }
}
