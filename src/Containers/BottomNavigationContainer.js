import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import BottomNavigation from '../Components/BottomNavigation/BottomNavigation';
// import { setNavigation, unsetNavigation } from '../Actions';

const mapStateToProps = (state) => {

  DebugLog('BottomNavigation.js: state', this, state);
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

const BottomNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavigation)

export default BottomNavigationContainer;
