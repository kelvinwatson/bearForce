import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import TabbedNavigation from '../Components/TabbedNavigation/TabbedNavigation';
// import { setNavigation, unsetNavigation } from '../Actions';

const mapStateToProps = (state) => {

  DebugLog('TabbedNavigationContainer.js: state', this, state);
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

const TabbedNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedNavigation)

export default TabbedNavigationContainer;
