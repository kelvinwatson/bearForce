import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Stream from '../Components/Stream/Stream';
// import { setNavigation, unsetNavigation } from '../Actions';

const mapStateToProps = (state) => {

  DebugLog('Stream.js: state', this, state);
  return {
    page: state.navigation.page,
    list: state.navigation.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigationClicked: (target) => {
      // dispatch(setNavigation(target));
      DebugLog('nav clicked', target);
    }
  }
}

const StreamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream)

export default StreamContainer;
