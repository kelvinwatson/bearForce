import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Add from '../Components/Add/Add';
import { updatePlace, updateLocalImgSrc, localImageLoading, croppedImageUpdate, updateEventName, eventWebsiteUpdate, updateEventDateTime, updateEventDescription, compressImage } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    imageUrlForEditor: state.compressImage.imageUrlForEditor,
    editorLoading: state.add.editorLoading,
    isDarkTheme: state.theme.isDarkTheme,
    place: state.add.place,
    placeValidated: state.add.placeValidated,
    isMapLoaded: state.maps.isLoaded,
    localImageSrc: state.add.localImgSrc,
    croppedImgSrc: state.add.croppedImgSrc,
    eventPosterValidated: state.add.eventPosterValidated,
    eventName: state.add.eventName,
    eventNameValidated: state.add.eventNameValidated,
    eventWebsiteUrl: state.add.eventWebsiteUrl,
    eventWebsiteUrlValidated: state.add.eventWebsiteUrlValidated,
    eventDateTime: state.add.eventDateTime,
    eventDateTimeValidated: state.add.eventDateTimeValidated,
    eventDescription: state.add.eventDescription,
    eventDescriptionValidated: state.add.eventDescriptionValidated
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
    onCompressImage: (file)=>{
      dispatch(compressImage(file));
    },
    onLocalImgSrcChanged: (localImgSrc) => {
      dispatch(updateLocalImgSrc(localImgSrc))
    },
    onCroppedImageSaved: (src) => {
      dispatch(croppedImageUpdate(src))
    },
    onWebsiteChanged: (url) => {
      dispatch(eventWebsiteUpdate(url))
    },
    updateEditorLoading: (value) => {
      dispatch(localImageLoading(value))
    },
    onNameChanged: (value) => {
      dispatch(updateEventName(value))
    },
    onDateTimeChanged: (dateTime) => {
      dispatch(updateEventDateTime(dateTime))
    },
    onDescriptionChanged: (description) => {
      dispatch(updateEventDescription(description))
    },
    submitNewEvent: (event) => {
      dispatch(compressImage(event))
    }
  }
}

const AddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

export default AddContainer;
