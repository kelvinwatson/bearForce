import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Portal from '../Components/Portal/Portal';
import { administratorOnSignedIn, administratorPromptSignIn, administratorSignOut } from '../Actions';

const mapStateToProps = (state) => {
  return {
    administrator: state.administrator.administrator,
    administratorPromptSignIn: state.administrator.administratorPromptSignIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    administratorOnSignedIn: (administrator) => {
      dispatch(administratorOnSignedIn(administrator))
    },
    administratorPromptSignIn: () => {
      dispatch(administratorPromptSignIn())
    },
    administratorSignOut: () => {
      dispatch(administratorSignOut());
    }
  }
}

const PortalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portal)

export default PortalContainer;
