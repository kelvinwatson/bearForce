import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Status from '../Components/Status/Status';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    isDarkTheme: state.theme.isDarkTheme,
    status: ownProps.status,
    statusMessage: ownProps.statusMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const StatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Status)

export default StatusContainer;
