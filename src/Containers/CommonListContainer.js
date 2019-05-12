import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import CommonList from '../Components/CommonList/CommonList';
// import { setNavigation, unsetNavigation } from '../Actions';

const mapStateToProps = (state) => {

  DebugLog('CommonListContainer.js: state', this, state);
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

const CommonListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonList)

export default CommonListContainer;
