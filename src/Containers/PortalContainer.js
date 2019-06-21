import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Portal from '../Components/Portal/Portal';
import { administratorOnSignedIn, administratorPromptSignIn, administratorSignOut, administratorFetchPendingEvents } from '../Actions';

const mapStateToProps = (state) => {
  DebugLog('mapStateToProps',state);
  return {
    administrator: state.administrator.administrator,
    administratorPromptSignIn: state.administrator.administratorPromptSignIn,
    pendingEvents: state.administrator.pendingEvents || [],
    pendingEventsLoading: state.administrator.pendingEventsloading,
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
    },
    administratorFetchPendingEvents: () => {
      dispatch(administratorFetchPendingEvents());
    }
  }
}

const PortalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portal)

export default PortalContainer;
