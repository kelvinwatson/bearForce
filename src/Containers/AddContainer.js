import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Add from '../Components/Add/Add';
import { updatePlace, updateLocalImgSrc, localImageLoading, croppedImageUpdate, updateEventName } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    editorLoading: state.add.editorLoading,
    isDarkTheme: state.theme.isDarkTheme,
    place: state.add.place,
    placeValidated: state.add.placeValidated,
    isMapLoaded: state.maps.isLoaded,
    localImageSrc: state.add.localImgSrc,
    croppedImgSrc: state.add.croppedImgSrc,
    eventPosterValidated: state.add.eventPosterValidated,
    eventName: state.add.eventName,
    eventNameValidated: state.add.eventNameValidated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPlaceChanged: (place) => {
      dispatch(updatePlace({
        formatted_address: place.formatted_address,
        place_id: place.place_id
      }));
    },
    onLocalImgSrcChanged: (localImgSrc) => {
      dispatch(updateLocalImgSrc(localImgSrc))
    },
    onCroppedImageSaved: (src) => {
      dispatch(croppedImageUpdate(src))
    },
    updateEditorLoading: (value) => {
      dispatch(localImageLoading(value))
    },
    onNameChanged: (value) => {
      dispatch(updateEventName(value))
    }
  }
}

const AddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

export default AddContainer;
