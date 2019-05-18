import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import GoogleMapLoader from '../Components/GoogleMapLoader/GoogleMapLoader';
import { mapLoaded } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMapLoaded: () => {
      DebugLog('mapLoaded');
      dispatch(mapLoaded());
    },
  }
}

const GoogleMapLoaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMapLoader)

export default GoogleMapLoaderContainer;
