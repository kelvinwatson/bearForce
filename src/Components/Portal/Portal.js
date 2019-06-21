import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseUtil from '../../Utils/InitializeFirebase';

export default class Portal extends React.Component {

  constructor(props){
    super(props);

    //props
    this.administrator = this.props.administrator;
    this.pendingEvents = this.props.pendingEvents;
    this.pendingEventsLoading = this.props.pendingEventsLoading;

    //internal
    this.administratorSignOut = this.administratorSignOut.bind(this);
    this.firebase = FirebaseUtil.getFirebase();
  }

  componentDidMount() {
    this.unregisterAuthObserver = this.firebase.auth().onAuthStateChanged((administrator)=> {
      if (administrator) {
        this.administratorOnSignedIn(administrator);
        this.administratorFetchPendingEvents();
      }
      else
        this.administratorPromptSignIn();
    })
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  componentWillReceiveProps(newProps) {
    DebugLog('componentWillReceiveProps', newProps);
    //listen for changed props and trigger rerender with new props
    this.administrator = newProps.administrator;
    this.pendingEvents = newProps.pendingEvents;
    this.pendingEventsLoading = newProps.pendingEventsLoading;
  }

  administratorOnSignedIn(administrator){
    //TODO configure authentication/firestore to only allow reads if uid== adminUid
    this.props.administratorOnSignedIn(administrator);
  }

  administratorPromptSignIn() {
    this.props.administratorPromptSignIn();
  }

  administratorSignOut(e) {
    e.preventDefault();

    this.firebase.auth().signOut();

    this.props.administratorSignOut();
  }

  administratorFetchPendingEvents() {
    this.props.administratorFetchPendingEvents();
  }

  render(){
    const firebase = this.firebase;
    const administrator = this.administrator;
    const pendingEvents = this.pendingEvents;
    DebugLog('pendingEvents', pendingEvents);

    // Configure FirebaseUI.
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    };
    const displayName = administrator && administrator.displayName;

    if (firebase.auth().currentUser)
    {
        return (
          <div>
            <section className="Portal__SignedOut">
              hello {firebase.auth().currentUser.displayName} <button onClick={(e)=>this.administratorSignOut(e)}>Sign Out</button>
            </section>

            <div>
              {pendingEvents && pendingEvents.map( (e) => {
                  return(
                    <ul key={e.id}>Name: {e.eventName}
                      <li>Date/Time: {e.eventDateTime}</li>
                      <li>Desc: {e.eventDescription}</li>
                      <li>Img Url: {e.eventImageUrl}</li>
                      <li>Place: {e.eventPlace && e.eventPlace.formatted_address}</li>
                      <li>Url ID: {e.eventUrlId}</li>
                      <li>Website {e.eventWebsiteUrl}</li>
                      <li>Timestamp {e.timestamp}</li>
                    </ul>
              )})}
            </div>
          </div>
        )
    }


    return (
      <section className="Portal__SignedIn">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </section>


    )
  }
}
