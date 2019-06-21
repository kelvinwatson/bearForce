import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Portal from '../Components/Portal/Portal';
import { onAdministratorSignedIn, promptSignIn, signOut } from '../Actions';

const mapStateToProps = (state) => {
  return {
    administrator: state.administrator.administrator,
    promptSignIn: state.administrator.promptSignIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdministratorSignedIn: (administrator) => {
      dispatch(onAdministratorSignedIn(administrator))
    },
    promptSignIn: () => {
      dispatch(promptSignIn())
    },
    signOut: () => {
      dispatch(signOut());
    }
  }
}

const PortalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portal)

export default PortalContainer;
