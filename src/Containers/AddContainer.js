import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Add from '../Components/Add/Add';
import { updatePlace } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    isDarkTheme: state.theme.isDarkTheme,
    place: state.add.place,
    isMapLoaded: state.maps.isLoaded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlaceChanged: (place) => {
      dispatch(updatePlace({
        formatted_address: place.formatted_address,
        place_id: place.place_id
      }));
    }
  }
}

const AddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

export default AddContainer;
