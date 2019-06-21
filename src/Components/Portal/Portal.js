import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseUtil from '../../Utils/InitializeFirebase';

export default class Portal extends React.Component {

  constructor(props){
    super(props);

    this.administratorSignOut = this.administratorSignOut.bind(this);
    this.firebase = FirebaseUtil.getFirebase();
    this.administrator = this.props.administrator;
  }

  componentDidMount() {
    this.unregisterAuthObserver = this.firebase.auth().onAuthStateChanged((administrator)=> {
      if (administrator)
        this.administratorOnSignedIn(administrator);
      else
        this.administratorPromptSignIn();
    })
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
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

  render(){
    const firebase = this.firebase;
    const administrator = this.administrator;

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
          <section className="Portal__SignedOut">
            Heyo <button onClick={(e)=>this.administratorSignOut(e)}>Sign Out</button>
          </section>
        )
    }


    return (
      <section className="Portal__SignedIn">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </section>


    )
  }
}
