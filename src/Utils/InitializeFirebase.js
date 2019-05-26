import * as firebase from 'firebase';
import DebugLog from './DebugLog';
// import mockData from '../Tests/MockData';
import firebaseCredentials from '../.firebase';

var FirebaseServer = require('firebase-server');

var FirebaseUtil = {
  init: function(){
    let config;
    config = firebaseCredentials;
    try {
      firebase.initializeApp(config); //synchronous
      DebugLog('firebase initialized');
    } catch (e) {
      DebugLog('error', e);
    }
  },

  getFirebase: function(){
    return firebase;
  },

  close: function() {
    if (process.env.NODE_ENV === 'test') {
      console.log('CLOSING FIREBASE');
      FirebaseServer.close();
    }
  },

  uploadFile: function(ref, fileName) {
    firebase.storage().ref(ref)
  }
};

export default FirebaseUtil;
