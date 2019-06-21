import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseUtil from '../../Utils/InitializeFirebase';

export default class Portal extends React.Component {

  constructor(props){
    super(props);

    this.signOut = this.signOut.bind(this);
    this.firebase = FirebaseUtil.getFirebase();
    this.administrator = this.props.administrator;
  }

  componentDidMount() {
    this.unregisterAuthObserver = this.firebase.auth().onAuthStateChanged((administrator)=> {
      if (administrator)
        this.onAdministratorSignedIn(administrator);
      else
        this.promptSignIn();
    })
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  onAdministratorSignedIn(administrator){
    //TODO configure authentication/firestore to only allow reads if uid== adminUid
    this.props.onAdministratorSignedIn(administrator);
  }

  promptSignIn() {
    this.props.promptSignIn();
  }

  signOut(e) {
    e.preventDefault();

    this.firebase.auth().signOut();

    this.props.signOut();
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
            Heyo <button onClick={(e)=>this.signOut(e)}></button>
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
