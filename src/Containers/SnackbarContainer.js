import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Snackbar from '../Components/Snackbar/Snackbar';
import { errorAcknowledged } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isDarkTheme: state.theme.isDarkTheme,
    message: state.error.message,
    timeout: state.error.timeout,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onErrorAcknowledged: () => {
      dispatch(errorAcknowledged());
    }
  }
}

const SnackbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar)

export default SnackbarContainer;
