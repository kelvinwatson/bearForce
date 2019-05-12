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
  }
  //TODO: SORTED, etc
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

/**
 * action creators
 */

// export function fetchMusic() {
//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.
//
//     dispatch(getMusicLoading());
//
//     let arr = [];
//
//     let firebase = FirebaseUtil.getFirebase();
//     let storage = firebase.storage();
//     let ref = storage.ref();
//
//     return FirebaseUtil.getFirebase().storage().ref().child('Music/MindlessGraffiti.mp3').getDownloadURL().then(function(url){
//       arr.push(url);
//       dispatch(getMusicSuccess(arr));
//     }).catch(function(err) {
//       dispatch(getMusicFailure(err));
//     });
//   }
// }

export function toggleTheme(){

  return {
    type: THEME.TOGGLE,
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
