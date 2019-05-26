const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'bearforceevents';
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});
const admin = require('firebase-admin');
admin.initializeApp();
module.exports = {
  addEvent: functions.https.onCall(async (event, context) => {
    const result = await firestore.collection('pendingEvents').add(event)
    return result;
    // const snapshot = await admin.database().ref('pendingEvents').push(event);
    // return { id: snapshot.ref.toString() }
  })
}
