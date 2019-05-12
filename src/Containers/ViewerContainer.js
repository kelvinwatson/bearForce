import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Viewer from '../Components/Viewer/Viewer';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ViewerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)

export default ViewerContainer;
