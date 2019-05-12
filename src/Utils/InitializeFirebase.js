import * as firebase from 'firebase';
import DebugLog from './DebugLog';
import mockData from '../Tests/MockData';
import firebaseCredentials from '../.firebase';

var FirebaseServer = require('firebase-server');

var FirebaseUtil = {
  init: function(){
    let config;
    if (process.env.NODE_ENV === 'test'){
      DebugLog('mock', mockData);
      FirebaseServer = new FirebaseServer(5000, 'localhost.firebaseio.test', mockData);
      const config = {
        apiKey: 'fake-api-key-for-testing-purposes-only',
        databaseURL: 'ws://localhost.firebaseio.test:5000'
      };
      firebase.initializeApp(config);
    } else {
      config = firebaseCredentials;
      try {
        firebase.initializeApp(config); //synchronous
        DebugLog('firebase initialized');
      } catch (e) {
        DebugLog('error', e);
      }

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
  }
};

export default FirebaseUtil;
