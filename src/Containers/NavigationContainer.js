import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Navigation from '../Components/Navigation/Navigation';
import { toggleTheme } from '../Actions';

const mapStateToProps = (state) => {

  return {
    isDarkTheme: state.theme.isDarkTheme,
    page: state.navigation.page,
    list: state.navigation.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigationClicked: (target) => {
      // dispatch(setNavigation(target));
      DebugLog('nav clicked', target);
    },
    onChangeTheme: () => {
      dispatch(toggleTheme());
    },
  }
}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default NavigationContainer;
